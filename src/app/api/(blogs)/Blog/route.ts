import { cookies } from 'next/headers';
import * as jose from 'jose';
import prisma from '../../../../../lib/prisma';
import { NextResponse } from 'next/server';
import redisClient from '../../../../lib/redisClient';

export const POST = async (request: Request) => {
  const body = await request.json();
  const { title, category, description } = body;
  const token = cookies().get('token');

  if (!token) {
    return NextResponse.json({ message: 'Token not found', status: 401 });
  }

  const claims = jose.decodeJwt(token.value);

  if (!claims || typeof claims !== 'object' || !('id' in claims)) {
    return NextResponse.json({ message: 'Invalid token', status: 401 });
  }

  const data = {
    title: title,
    Category: category,
    Description: description,
    userId: claims.id,
  };

  try {
    console.log("Inside db")
    const created=await prisma.blog.create({ data:data });
    console.log("crearteion:" ,created)
    // Update the cache with the new list of blogs
    const allBlogs = await prisma.blog.findMany();
    await redisClient.set('blogs', JSON.stringify(allBlogs), { EX: 86400 }); // Set TTL to 1 DAY

    return NextResponse.json({ message: 'success', status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error.message, status: 400 });
  }
};

export const GET = async (request: Request) => {
  try {
    // Try to fetch blogs from Redis cache
    const cachedBlogs = await redisClient.get('blogs');
    if (cachedBlogs) {
      return NextResponse.json({ data: JSON.parse(cachedBlogs), status: 200 });
    }

    // If not in cache, fetch from database
    const data = await prisma.blog.findMany();

    // Store the fetched blogs in Redis cache
    await redisClient.set('blogs', JSON.stringify(data), { EX: 3600 }); // Set TTL to 1 hour

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
};
