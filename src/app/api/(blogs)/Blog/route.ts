import { cookies } from "next/headers";
import * as jose from "jose";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
  const body = await request.json();
  const { title, category, description } = body;
  const token = cookies().get("token");
  const claims = jose.decodeJwt(token.value);
  try {
    const data = {
      title: title,
      Category: category,
      Description: description,
      userId: claims.id,
    };
    try {
      const newblog = await prisma.blog.create({
        data: data,
      });
      const dt = await prisma.blog.findMany();
      return NextResponse.json({ message: "success", staus: 200 });
    } catch (error) {
      return NextResponse.json({ message: error, status: 400 });
    }
  } catch (error) {}
};

export const GET = async (request: Request) => {
  try {
    const data = await prisma.blog.findMany();
    return NextResponse.json({ data: data, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 });
  }
};
