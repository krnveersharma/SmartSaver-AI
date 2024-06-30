import { cookies } from "next/headers";
import * as jose from 'jose'
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
export const GET=async(request:Request)=>{
    try {
        const token=cookies().get('token');
        const claims = jose.decodeJwt(token.value)
        const userblogs =await prisma.blog.findMany({
            where:{
                userId:claims.id
            },
        });
        return NextResponse.json({userblogs,status:200});

    } catch (error) {
        return NextResponse.json({error,status:400})
    }
}
export const DELETE=async(request:Request)=>{
    try {
        const id=await request.json();
        const token=cookies().get('token');
        const claims = jose.decodeJwt(token.value);
        const blog=await prisma.blog.findMany({
            where:{
                id:id
            },
        });
        console.log(claims.id);
        console.log(blog[0].userId)
        if(claims.id!=blog[0].userId){
            return NextResponse.json({message:"You can't delete another person blogs",status:400});
        }
        await prisma.blog.delete({
            where:{
                id:id
            },
        });
        
        const newUserBlogs =await prisma.blog.findMany({
            where:{
                userId:claims.id
            },
        });
        return NextResponse.json({data:newUserBlogs,status:200});

    } catch (error) {
        return NextResponse.json({error,status:400})
    }
}
