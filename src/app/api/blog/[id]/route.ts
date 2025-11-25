import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const filePath = path.join(process.cwd(), "data", "blogs", "blogs.json");

async function readBlogs() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeBlogs(blogs: any[]) {
  await fs.writeFile(filePath, JSON.stringify(blogs, null, 2));
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");
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
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to update blog." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");
    if (!idParam) {
      return NextResponse.json(
        { success: false, message: "Blog id is required." },
        { status: 400 },
      );
    }
    const id = Number(idParam);

    let blogs = await readBlogs();
    const exists = blogs.some((b: any) => b.id === id);
    if (!exists) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 },
      );
    }
    blogs = blogs.filter((b: any) => b.id !== id);
    await writeBlogs(blogs);
    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete blog." },
      { status: 500 },
    );
  }
}
