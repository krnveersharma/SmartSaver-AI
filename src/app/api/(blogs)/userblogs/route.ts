import { cookies } from "next/headers";
import * as jose from "jose";
import prisma from "../../../../../lib/prisma";
import redisClient from "../../../../lib/redisClient";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const token = cookies().get("token");
    if (!token) {
      return NextResponse.json({ message: "Token not found", status: 401 });
    }

    const claims = jose.decodeJwt(token.value);

    const userblogs = await prisma.blog.findMany({
      where: {
        userId: claims.id,
      },
    });

    return NextResponse.json({ userblogs, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 400 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const {id} = await request.json();
    const token = cookies().get("token");
    const claims = jose.decodeJwt(token.value);
    console.log("herer")
    const blog = await prisma.blog.findMany({
      where: {
        id: id,
      },
    });
 console.log("herer")
    if (claims.id != blog[0].userId) {
      return NextResponse.json({
        message: "You can't delete another person blogs",
        status: 400,
      });
    }
    console.log("here")
    await prisma.blog.delete({
      where: {
        id: id,
      },
    });
    console.log("here")
    const cachedBlogs = await redisClient.get('blogs');
    console.log("here")
    if (cachedBlogs) {
      let blogs = JSON.parse(cachedBlogs);

      blogs = blogs.filter((blog: { id: string }) => blog.id !== id);

      await redisClient.set('blogs', JSON.stringify(blogs), { EX: 86400 }); // Set TTL to 1 day
    }

    const newAllBlogs = await prisma.blog.findMany({
      where:{
        userId:claims.userId
      }
    });
    return NextResponse.json({ data: newAllBlogs, status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 400 });
  }
};
