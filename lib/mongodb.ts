import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * If the URI has no /database name, the Node driver uses "test", so users seeded
 * in kuchaenterprise (or Atlas without a path) never match — login returns 401.
 */
export function resolvedMongoUri(raw: string): string {
  const trimmed = raw.trim();
  const defaultDb = process.env.MONGODB_DB_NAME || 'kuchaenterprise';

  const qIndex = trimmed.indexOf('?');
  const base = qIndex >= 0 ? trimmed.slice(0, qIndex) : trimmed;
  const query = qIndex >= 0 ? trimmed.slice(qIndex) : '';

  const schemeMatch = base.match(/^mongodb(\+srv)?:\/\//i);
  if (!schemeMatch) return trimmed;

  const rest = base.slice(schemeMatch[0].length);
  const slashInRest = rest.indexOf('/');
  if (slashInRest === -1) {
    return `${base}/${defaultDb}${query}`;
  }

  const pathAndRest = rest.slice(slashInRest + 1);
  const dbCandidate = pathAndRest.split('/')[0]?.trim() ?? '';

  if (dbCandidate.length === 0) {
    const baseNoTrail = base.replace(/\/+$/, '');
    return `${baseNoTrail}/${defaultDb}${query}`;
  }

  return trimmed;
}

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
    const uri = resolvedMongoUri(MONGODB_URI);
    if (uri !== MONGODB_URI.trim()) {
      console.warn(
        `lib/mongodb: MONGODB_URI had no database name; connecting to "${process.env.MONGODB_DB_NAME || 'kuchaenterprise'}" (set MONGODB_DB_NAME to override).`
      );
    }

    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
      maxPoolSize: 10,
      minPoolSize: 1,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(uri, options)
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
