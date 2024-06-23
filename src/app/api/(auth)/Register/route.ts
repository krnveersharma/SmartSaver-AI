import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
export const POST =async (request:Request)=>{
    try {
        const body = await request.json();

        const { username, email, phone, password,income } = body;
        
        try {
            const newSignup=await prisma.signup.create({
                data:{
                    username:username,
                    email:email,
                    phone:phone,
                    password:password,
                    Income:parseInt(income)
                }
            })
            return NextResponse.json({message:newSignup},{status:200});
        } catch (error) {
            console.log(error);
        }
        
        return NextResponse.json({message:'Success'},{status:200})
    } catch (error) {
        
    }
}

export const GET=async()=>{
    const answer=await prisma.signup.findMany();
    return NextResponse.json({data:answer,status:200});
}