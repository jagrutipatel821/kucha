import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: Cached | undefined;
}

const globalAny = global as typeof globalThis & { _mongoose?: Cached };
const cached: Cached = globalAny._mongoose || { conn: null, promise: null };

/**
 * Connect to MongoDB with a short server selection timeout to fail fast in dev.
 * Throws on connection/configuration failure.
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error('lib/mongodb: MONGODB_URI is not set. Set it in .env.local');
  }
  if (process.env.NODE_ENV === 'production' && /localhost|127\.0\.0\.1/.test(MONGODB_URI)) {
    throw new Error(
      'lib/mongodb: MONGODB_URI points to localhost in production. Use a hosted MongoDB URI (for example, MongoDB Atlas).'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
      maxPoolSize: 10,
      minPoolSize: 1,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((m) => {
        console.log(`lib/mongodb: Connected to ${m.connection.db?.databaseName}`);
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        console.error('lib/mongodb: Connection error:', err?.message || err);
        throw err;
      });
  }

  const conn = await cached.promise;
  cached.conn = conn;
  globalAny._mongoose = cached;
  return conn;
}

export default connectDB;
