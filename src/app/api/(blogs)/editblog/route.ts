import { cookies } from "next/headers";
import * as jose from 'jose'
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
export const POST=async(request:Request)=>{
    try {
        const id = await request.json();
    const token=cookies().get('token');
        const claims = jose.decodeJwt(token.value);
    const blogData = await prisma.blog.findMany({
      where: {
        id: id,
      },
    });
    
    if(blogData[0].userId!=claims.id){
        return NextResponse.json({message:"you can't edit this blog",status:400});
    }
    return NextResponse.json({data:blogData,status:'200'});
    } catch (error) {
        return NextResponse.json({message:error,status:500});
    }
    
}

export const PATCH=async(request:Request)=>{
    try {
        const body=await request.json();
    const {id,title,Category,Description}=body;
    const updateBlog=await prisma.blog.update({
        where:{
            id:id
        },
        data:{
            title:title,
            Category:Category,
            Description:Description
        }
    })
    if(updateBlog){
        return NextResponse.json({message:"Success",status:200});
    }
    } catch (error) {
        return NextResponse.json({message:error,status:500})
    }

}