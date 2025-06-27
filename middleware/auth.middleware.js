import jwt from 'jsonwebtoken';

export const authentication = (req, res, next) => {
 const { token } = req.cookies;

 if (!token) {
  console.log('Please login to your account');
 }

 jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
  if (err) {
   console.log('Error verifying token');
  }
  req.user = { id: payload.id, admin: payload.isAdmin };
 });
 next();
};
