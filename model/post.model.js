import mongoose from 'mongoose';
const postSchema = new mongoose.Schema(
 {
  title: {
   type: String,
   required: true,
  },
  description: {
   type: String,
   required: true,
  },
  previewPic: {
   type: String,
   required: true,
  },
  detailedPix: {
   type: String,
   required: true,
  },
  creator: {
   type: mongoose.Types.ObjectId,
   ref: 'user',
   required: true,
  },
 },
 { timestamps: true }
);

const postModel = mongoose.model('post', postSchema);
export default postModel;
