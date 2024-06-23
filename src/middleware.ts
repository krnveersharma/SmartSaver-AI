import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as jose from 'jose'
const secret="Hello guys"

export function middleware(request:Request){
    const token=cookies().get('_vercel_jwt');
    if (!token) {
        console.log("Token not found in cookies");
        return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
        const payload= jose.jwtVerify(token.value,new TextEncoder().encode(secret));

       if(payload){

                return NextResponse.next();
       }
       else {
        return NextResponse.redirect(new URL('/login', request.url))        }
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL('/login', request.url))    }

}
export const config = {
    matcher: ['/Pages/:path*']
};