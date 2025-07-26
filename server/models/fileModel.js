import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  s3Url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // links to User collection
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model('File', fileSchema);
export default File;
