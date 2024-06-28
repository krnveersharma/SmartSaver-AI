import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as jose from 'jose'
import prisma from "../../../../lib/prisma";
export const POST=async(request:Request)=>{
    const body=await request.json();
    const expense=parseInt(body.expense);
    const name=body.name
    const token=cookies().get('token');
    const claims = jose.decodeJwt(token.value)
    const exp=await prisma.signup.findMany();
    const data={
        expense:expense,
        name:name,
        date:new Date(),
        userId:claims.id
    }
    try {
        const newSpend=await prisma.expenditure.create({
            data:data
            
        },(err)=>{
            return NextResponse.json({meesage:err,status:400})
        })
        return NextResponse.json({message:newSpend,status:200});
    } catch (error) {
        console.log(error);
    }
    

    
    return NextResponse.json({message:'Success',status:200})
}