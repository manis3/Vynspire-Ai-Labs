import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const filePath = path.join(process.cwd(), "data", "blogs", "blogs.json");

export async function GET() {
  try {
    const blogsJson = await fs.readFile(filePath, "utf-8");
    const blogs = JSON.parse(blogsJson);
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to read blogs." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const newBlog = await request.json();
    if (!newBlog.title || !newBlog.content) {
      return NextResponse.json(
        { success: false, message: "Title and content required." },
        { status: 400 },
      );
    }
    const blogsJson = await fs.readFile(filePath, "utf-8");
    const blogs = JSON.parse(blogsJson);
    newBlog.id = Date.now();
    blogs.push(newBlog);
    await fs.writeFile(filePath, JSON.stringify(blogs, null, 2));
    return NextResponse.json(
      { success: true, message: "Blog Created successfully!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create blog." },
      { status: 500 },
    );
  }
}
