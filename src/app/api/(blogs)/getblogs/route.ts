import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export const POST = async (request: Request) => {
  try {
    const id = await request.json();
    const blogData = await prisma.blog.findMany({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ data:blogData, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 });
  }
};
