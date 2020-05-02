import { model, Schema } from 'mongoose';
import md5 from 'md5';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
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
});

UserSchema.pre('save', function (next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.username)}?d=identicon`;
  next();
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

export const User = model('User', UserSchema);
