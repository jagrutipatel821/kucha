import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  bgColor?: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

const OfferSchema = new Schema<IOffer>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    image: { type: String },
    bgColor: { type: String, default: 'bg-black' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Offer ||
  mongoose.model<IOffer>('Offer', OfferSchema);
