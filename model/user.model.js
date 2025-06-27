import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   required: true,
   unique: true,
  },
  isAdmin: {
   type: Boolean,
   default: false,
  },
  password: {
   type: String,
   required: true,
  },
  hobbies: {
   type: [String],
  },
  kyc: {
   type: mongoose.Types.ObjectId,
   ref: 'kyc',
  },
  posts: [{ type: mongoose.Types.ObjectId, ref: 'post' }],
 },
 { timestamps: true }
);

const userModel = mongoose.model('user', userSchema);
export default userModel;
