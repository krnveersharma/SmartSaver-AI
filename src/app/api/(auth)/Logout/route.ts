import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const GET=async()=>{
    try {
        cookies().delete('token')
        return NextResponse.json({ message: "Logout successful", status: 200 })
    } catch (error) {
        return NextResponse.json({error:error,status:500})
    }
    
}