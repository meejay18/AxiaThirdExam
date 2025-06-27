import kycModel from '../model/kyc.model.js';
import userModel from '../model/user.model.js';

export const createKyc = async (req, res) => {
 const data = req.body;
 const { id } = req.user;

 const checkKyc = await kycModel.findOne({ user: id });
 if (checkKyc) {
  return res.send('Kyc already exists');
 }

 try {
  // create kyc
  const newKyc = new kycModel({ user: id, ...data });
  const savedKyc = await newKyc.save();

  // update user
  await userModel.findByIdAndUpdate(id, { kyc: savedKyc.id }, { new: true });

  return res.status(201).json({
   message: 'Kyc created successfully',
   data: savedKyc,
  });
 } catch (error) {
  return res.status(500).json({
   message: 'Error creating kyc',
   error: error.message,
  });
 }
};

export const getOneKyc = async (req, res) => {
 const { kycId } = req.params;
 try {
  const kyc = await kycModel.findById(kycId).populate('user');
  return res.status(201).json({
   message: 'Kyc fetched successfully',
   data: kyc,
  });
 } catch (error) {
  return req.status(500).json({
   message: 'Error getting kyc',
   error: error.message,
  });
 }
};
