import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  brand?: string;
  price?: number;
  stock: number;
  image?: string;
  featured: boolean;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    price: { type: Number, min: 0, default: 0 },
    stock: { type: Number, required: true, min: 0 },
    image: { type: String },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>('Product', ProductSchema);
