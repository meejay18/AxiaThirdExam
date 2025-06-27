import userModel from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
 const { name, email, password, ...others } = req.body;
 if (!email || !password) {
  return res.status(400).json({
   message: 'Invalid credentials',
  });
 }

 try {
  const isUser = await userModel.findOne({ email });
  if (isUser) {
   return res.status(404).json({
    message: 'User already exists. Create new account',
   });
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
   name,
   email,
   password: hashed,
   ...others,
  });

  return res.status(201).json({
   message: 'User Created Successfully',
   data: newUser,
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error creating user',
   error: error.message,
  });
 }
};

export const getAllUsers = async (req, res) => {
 try {
  const users = await userModel.find();
  return res.status(200).json({
   message: 'Users successfully gotten',
   data: users,
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error getting users',
   error: error.message,
  });
 }
};

export const updateUser = async (req, res) => {
 const { id } = req.params;
 const data = req.body;

 try {
  const updatedUser = await userModel.findByIdAndUpdate(id, data, {
   new: true,
  });
  return res.status(200).json({
   message: 'Users successfully updated',
   data: updatedUser,
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error getting users',
   error: error.message,
  });
 }
};

export const loginUser = async (req, res) => {
 const { email, password } = req.body;
 if (!email || !password) {
  return res.status(400).json({
   message: 'Invalid credentials',
  });
 }

 try {
  const user = await userModel.findOne({ email });
  if (!user) {
   return res.status(404).json({
    message: 'user does not exist, create a new account',
   });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
   return res.status(404).json({
    message: 'Password mismatch',
   });
  }

  const token = jwt.sign(
   { name: user.name, id: user.id },
   process.env.JWT_SECRET,
   { expiresIn: '1hr' }
  );
  // console.log(token);

  return res
   .cookie('token', token, {
    maxAge: 1000 * 60 * 60,
    secure: true,
    httpOnly: true,
   })
   .json({
    message: 'This was successfull',
   });
 } catch (error) {
  return res.status(404).json({
   message: 'Error logging in',
   error: error.message,
  });
 }
};

export const deleteUser = async (req, res) => {
 const { id } = req.params;
 try {
  const deletedUser = await userModel.findByIdAndDelete(id);
  return res.status(200).json({
   message: 'User userDeleted successfully',
   data: deletedUser,
  });
 } catch (error) {
  return res.status(404).json({
   message: 'Error deleting user',
   error: error.message,
  });
 }
};
