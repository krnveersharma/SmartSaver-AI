import * as jose from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async (request: Request) => {
  try {
    const token = cookies().get("token");
    const claims = jose.decodeJwt(token.value);
    const signupWithexpenditure = await prisma.signup.findMany({
      where: {
        id: claims.id,
      },
      include: {
        expenditure: true,
      },
    });
    return NextResponse.json(signupWithexpenditure);
  } catch (error) {
    return NextResponse.json({ message: "error", status: 500 });
  }
};
