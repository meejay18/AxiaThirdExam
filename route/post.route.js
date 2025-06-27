import express from 'express';
import {
 createPost,
 deletePost,
 getSinglePost,
 getUserPosts,
} from '../controller/post.controller.js';
const route = express.Router();
import { authentication } from '../middleware/auth.middleware.js';

route.post('/post/createpost', authentication, createPost);
route.delete('/post/deletepost/:postId', authentication, deletePost);
route.get('/post/updatepost/:postId/:userId', getUserPosts);
route.get('/post/getSinglepost/:postId', getSinglePost);

export default route;
