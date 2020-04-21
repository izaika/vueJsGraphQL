import { model, Schema } from 'mongoose';

export const User = model(
  'User',
  new Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'Post',
    },
  })
);
