import mongoose from 'mongoose';
const kycSchema = new mongoose.Schema(
 {
  displayPic: {
   type: String,
   required: true,
  },
  NationalId: {
   type: String,
   required: true,
  },
  FrontPic: {
   type: String,
   required: true,
  },
  backPic: {
   type: String,
   required: true,
  },
  user: {
   type: mongoose.Types.ObjectId,
   ref: 'user',
   required: true,
   unique: true,
  },
 },
 { timestamps: true }
);

const kycModel = mongoose.model('kyc', kycSchema);
export default kycModel;
