import { cookies } from 'next/headers';
import * as jose from 'jose';
import prisma from '../../../../../lib/prisma';
import { NextResponse } from 'next/server';
import redisClient from '../../../../lib/redisClient';

export const POST = async (request: Request) => {
  try {
    const { id } = await request.json();
    const token = cookies().get('token');
    
    if (!token) {
      return NextResponse.json({ message: 'Token not found', status: 401 });
    }
    
    const claims = jose.decodeJwt(token.value);
    const blogData = await prisma.blog.findUnique({
      where: { id: id },
    });

    if (!blogData || blogData.userId !== claims.id) {
      return NextResponse.json({
        message: "You can't edit this blog",
        status: 400,
      });
    }

    return NextResponse.json({ data: blogData, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { id, title, Category, Description } = body;
    const token = cookies().get('token');
    
    if (!token) {
      return NextResponse.json({ message: 'Token not found', status: 401 });
    }
    
    const claims = jose.decodeJwt(token.value);
    const blogData = await prisma.blog.findUnique({
      where: { id: id },
    });

    if (!blogData || blogData.userId !== claims.id) {
      return NextResponse.json({
        message: "You can't edit this blog",
        status: 400,
      });
    }

    // Update the blog entry in the database
    const updatedBlog = await prisma.blog.update({
      where: { id: id },
      data: { title, Category, Description },
    });

    if (updatedBlog) {
      // Update the Redis cache with the new blog data
      // Assuming 'blogs' is the key where the blog list is stored
      const allBlogs = await prisma.blog.findMany();
      await redisClient.set('blogs', JSON.stringify(allBlogs), { EX: 3600 }); // Set TTL to 1 hour

      return NextResponse.json({ message: 'Success', status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
};
