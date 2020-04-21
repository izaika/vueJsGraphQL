const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  messages: [
    {
      messageBody: {
        type: String,
        required: true,
      },
      messageDate: {
        type: Date,
        default: Date.now,
      },
      messageUser: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  ],
});

module.exports = model('Post', PostSchema);
