import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingCart extends Document {
  userId: string;
  name: string;
  items: {
    name: string;
    quantity: number;
  }[];
  sharedWith: {
    userId: string;
    permission: string;
  }[];
}

const ShoppingCartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  sharedWith: [
    {
      userId: { type: String, required: true },
      permission: { type: String, required: true }
    }
  ]
});

const ShoppingCart = mongoose.model<IShoppingCart>('ShoppingCart', ShoppingCartSchema);

export default ShoppingCart;
