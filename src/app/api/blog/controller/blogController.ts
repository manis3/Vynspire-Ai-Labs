import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "blogs", "blogs.json");

export async function getBlogs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const blogsJson = await fs.readFile(filePath, "utf-8");
    const blogs = JSON.parse(blogsJson);
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to read blogs." });
  }
}

export async function createBlog(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newBlog = req.body;
    if (!newBlog.title || !newBlog.content) {
      return res
        .status(400)
        .json({ success: false, message: "Title and content are required." });
    }
    const blogsJson = await fs.readFile(filePath, "utf-8");
    const blogs = JSON.parse(blogsJson);
    newBlog.id = Date.now();
    blogs.push(newBlog);
    await fs.writeFile(filePath, JSON.stringify(blogs, null, 2));
    res.status(201).json({
      success: true,
      data: newBlog,
      message: "Blog created successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create blog." });
  }
}

export async function updateBlog(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = Number(req.query.id);
    const updates = req.body;
    const blogsJson = await fs.readFile(filePath, "utf-8");
    const blogs = JSON.parse(blogsJson);
    const index = blogs.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }
    blogs[index] = { ...blogs[index], ...updates };
    await fs.writeFile(filePath, JSON.stringify(blogs, null, 2));
    res.status(200).json({
      success: true,
      data: blogs[index],
      message: "Blog updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update blog." });
  }
}

export async function deleteBlog(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = Number(req.query.id);
    const blogsJson = await fs.readFile(filePath, "utf-8");
    let blogs = JSON.parse(blogsJson);
    const exists = blogs.some((b: any) => b.id === id);
    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }
    blogs = blogs.filter((b: any) => b.id !== id);
    await fs.writeFile(filePath, JSON.stringify(blogs, null, 2));
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete blog." });
  }
}
