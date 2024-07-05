import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import * as bcrypt from 'bcrypt'
export const POST =async (request:Request)=>{
    try {
        const body = await request.json();
        const saltRounds=10;
        const { username, email, phone, password,income } = body;
        
        try {
            const hashedPassword=await bcrypt.hash(password,saltRounds);
            const newSignup=await prisma.signup.create({
                data:{
                    username:username,
                    email:email,
                    phone:phone,
                    password:hashedPassword,
                    Income:income
                }
            })
            return NextResponse.json({message:newSignup,status:200});
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