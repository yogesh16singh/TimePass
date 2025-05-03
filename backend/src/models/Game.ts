import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  name: string;
  url: string;
  author: string;
  publishedDate: Date;
}

const GameSchema: Schema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: Date, required: true }
})

export default mongoose.model<IGame>('Game', GameSchema);