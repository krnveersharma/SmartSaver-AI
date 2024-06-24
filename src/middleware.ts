import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as jose from 'jose'
const secret="Hello guys"

export function middleware(request:Request){
    const token=cookies().get('token');//change to _vercel_jwt on deployment
    if (!token) {
        console.log("Token not found in cookies");
        return NextResponse.redirect(new URL('/', request.url));
    }
    try {
        const payload= jose.jwtVerify(token.value,new TextEncoder().encode(secret));

       if(payload){

                return NextResponse.next();
       }
       else {
        return NextResponse.redirect(new URL('/', request.url))        }
    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL('/', request.url))    }

}
export const config = {
    matcher: ['/pages/:path*']
};