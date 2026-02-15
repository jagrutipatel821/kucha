// models/Order.ts
import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema({
  userId: { type: String, required: true, index: true }, // store user id (string)
  orderNumber: { type: String, required: true },
  product: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['Completed','Processing','Pending','Cancelled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  // add any other fields you need (shipping address, items array, etc.)
});

const Order = models.Order || model('Order', OrderSchema);
export default Order;
