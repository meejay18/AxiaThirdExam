import express from 'express';
import {
 createPost,
 deletePost,
 getSinglePost,
 getUserPosts,
} from '../controller/post.controller.js';
const route = express.Router();

route.post('/post/createpost', createPost);
route.delete('/post/deletepost/:postId', deletePost);
route.get('/post/updatepost/:postId/:userId', getUserPosts);
route.get('/post/getSinglepost/:postId', getSinglePost);

export default route;
