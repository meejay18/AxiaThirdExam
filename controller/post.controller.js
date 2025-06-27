import postModel from '../model/post.model.js';
import jwt from 'jsonwebtoken';

export const createPost = async (req, res) => {
 const body = req.body;
 const { token } = req.cookies;

 try {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  console.log(payload);

  const newPost = new postModel({
   creator: '6853a415b9dc0b9ba7e6a2fd',
   ...body,
  });
  const savedPost = await newPost.save();

  return res.status(201).json({
   message: 'Post successfully created',
   data: savedPost,
  });
 } catch (error) {
  console.log(error.message);
  return res.send(error.message);
 }
};

// export const deletePost = async (req, res) => {
//  const { postId } = req.params;
//  const { userId } = req.body;

//  try {
//   const post = await postModel.findById(postId);
//   if (!post) {
//    return res.status(404).json({
//     message: 'Post unavailable',
//    });
//   }

//   if (userId != post.creator) {
//    return res.status(403).json({
//     message: 'Post does not belong to you',
//    });
//   }

//   const deletePost = await postModel.findByIdAndDelete(postId);
//   return res.status(200).json({
//    message: 'Post deleted Successfully',
//    data: deletePost,
//   });
//  } catch (error) {
//   return res.status(500).json({
//    message: 'Error deleting post',
//    error: error.message,
//   });
//  }
// };

export const deletePost = async (req, res) => {
 const { postId } = req.params;
 const { userId } = req.body;

 const post = await postModel.findById(postId);
 if (!post) {
  return res.status(404).json({
   message: 'post not found',
  });
 }
 console.log(userId);
 console.log(post.creator);

 // check if the user is the creator of the post
 if (userId != post.creator) {
  return res.status(403).json({
   message: 'Post does not belong to you',
  });
 }
 try {
  const deletedPost = await postModel.findByIdAndDelete(postId);
  return res.status(200).json({
   message: 'Post deleted Successfully',
   data: deletedPost,
  });
 } catch (error) {
  return res.status(500).json({
   message: 'Error deleting post',
   error: error.message,
  });
 }
};

export const updatePost = async (req, res) => {
 const { postId, userId } = req.params;
 const data = req.body;

 try {
  const post = await postModel.findById();
  if (!post) {
   return res.send('Post not found');
  }

  if (userId.toString() !== post.creator) {
   return res.send('This post does not belong to you');
  }

  const updatedPost = await postModel.findByIdAndUpdate(
   postId,
   { ...data },
   { new: true }
  );
  return res.status(200).json({
   message: 'Post successfully updated',
   data: updatedPost,
  });
 } catch (error) {
  return res.status(500).json({
   message: 'Error updating post',
   error: error.message,
  });
 }
};

export const getUserPosts = async (req, res) => {
 const userId = req.params;

 try {
  const posts = await postModel.find({ creator: userId });
  return res.status(200).json({
   message: 'Posts found',
   data: posts,
  });
 } catch (error) {
  return res.status(500).json({
   message: 'coldnt get posts',
   error: error.message,
  });
 }
};

export const getSinglePost = async (req, res) => {
 const postId = req.params;

 try {
  const post = await postModel.find(postId);
  return res.status(200).json({
   message: 'Post found',
   data: post,
  });
 } catch (error) {
  return res.status(500).json({
   message: 'couldnt get post',
   error: error.message,
  });
 }
};
