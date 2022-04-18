import { Request, Response } from "express";
import { Post } from "../models/post";
import mongoose from "mongoose";

const createPost = async (req: Request, res: Response) => {
  const content = req.body.content;
  if (!content) return res.status(400).json({ message: "Must send content" });
  const post = new Post({ content });
  await post.save();
  res.status(201).send(post);
};

const updatePost = async (req: Request, res: Response) => {
  const content = req.body.content;
  const postId = req.params.postId;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).send("Invalid post id");
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).send("The post is not found");
  }
  post.content = content || post.content;
  await post.save();

  return res.status(201).send(post);
};

export { createPost, updatePost };
