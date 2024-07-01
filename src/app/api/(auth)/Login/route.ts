import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { cookies } from "next/headers";
import * as jose from "jose";
export const POST = async (request: Request) => {
  const secret = "Hello guys";
  const token = cookies().get("token");
  if (token) {
    const payload = jose.jwtVerify(
      token.value,
      new TextEncoder().encode(secret)
    );
    return NextResponse.redirect(new URL("/pages/home", request.url));
  }
  const iat = Math.floor(Date.now() / 1000);
  const body = await request.json();
  const { username, password } = body;
  const user = await prisma.signup.findUnique({
    where: {
      username: username,
    },
  });
  if (user) {
    if (user.password === password) {
      const alg = "HS256";
      const jwt = await new jose.SignJWT(user)
        .setProtectedHeader({ alg, typ: "JWT" })
        .setIssuedAt(iat)
        .setExpirationTime("30d")
        .sign(new TextEncoder().encode(secret));
      cookies().set("token", jwt, { httpOnly: true });
      return NextResponse.json({ message: "Found", status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid password", status: 404 });
    }
  } else {
    return NextResponse.json({ message: "User not found", status: 404 });
  }
};
