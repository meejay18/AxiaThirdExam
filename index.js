import express from 'express';
const app = express();
import env from 'dotenv';
import userRoute from './route/user.route.js';
import postRoute from './route/post.route.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
env.config();
app.use(express.json());
app.use(cookieParser());

mongoose
 .connect(process.env.MONGO_URL)
 .then(() => {
  console.log('Database connected');
 })
 .catch(() => {
  console.log('error connecting with database');
 });

const port = 7000;

app.use(userRoute);
app.use(postRoute);
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
