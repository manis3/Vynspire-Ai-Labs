import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const filePath = path.resolve(process.cwd(), "data/blogs/blogs.json");

async function readBlogs() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeBlogs(blogs: any[]) {
  await fs.writeFile(filePath, JSON.stringify(blogs, null, 2));
}

export async function PUT(request: NextRequest) {
  try {
    const segments = request.nextUrl.pathname.split("/");
    const idParam = segments[segments.length - 1];
    if (!idParam) {
      return NextResponse.json(
        { success: false, message: "Blog id is required." },
        { status: 400 },
      );
    }

    const id = Number(idParam);
    const updates = await request.json();

    const blogs = await readBlogs();
    const index = blogs.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 },
      );
    }

    blogs[index] = { ...blogs[index], ...updates, id };
    await writeBlogs(blogs);
    return NextResponse.json({
      success: true,
      data: blogs[index],
      message: "Blog updated successfully.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to update blog." },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const blogId = Number(id);

    const blogs = await readBlogs();
    const blog = blogs.find((b: any) => b.id === blogId);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false, message: "Failed to read blog." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const blogId = Number(id);

    let blogs = await readBlogs();

    const exists = blogs.some((b: any) => b.id === blogId);

    if (!exists) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 },
      );
    }

    blogs = blogs.filter((b: any) => b.id !== blogId);
    await writeBlogs(blogs);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    console.error("Error during DELETE:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog." },
      { status: 500 },
    );
  }
}
