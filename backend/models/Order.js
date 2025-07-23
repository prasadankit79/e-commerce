import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  items: [
    {
      name: String,
      quantity: Number,
    },
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', orderSchema);
