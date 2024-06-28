import { cookies } from "next/headers";
import * as jose from "jose";
import Groq from "groq-sdk";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: "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",
});

export const GET = async (request: Request) => {
  const formatExpenditureData = (data) => {
    let formattedData = `User ID: ${data.userId}\nExpenditures:\n`;
    data.map((item) => {
      formattedData += `- ${item.name}: $${item.expense}\n`;
    });
    return formattedData;
  };



  async function getGroqChatCompletion(prompt) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt + "All price is in INR.Give answer in points",
        },
      ],
      model: "llama3-8b-8192",
    });
  }


  
  try {
    const token = cookies().get("token");
    const claims = jose.decodeJwt(token.value);
    try {
      const sixDaysAgo = new Date();
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
      const userData = await prisma.expenditure.findMany({
        where: {
          userId: claims.id,
          date: {
            gte: sixDaysAgo,
          },
        },
      });
      try {
        const formattedData = formatExpenditureData(userData);
        const prompt = `Analyze the following expenditure data and provide money-saving recommendations:\n\n${formattedData}`;
        const chatCompletion = await getGroqChatCompletion(
          prompt + "All price is in INR.Give answer in points"
        );
        return NextResponse.json({
          message: chatCompletion.choices[0]?.message?.content,
          status: 200,
        });
      } catch (error) {
        NextResponse.json({
          error: "Error generating recommendations",
          status: 500,
        });
      }
      return NextResponse.json({ data: userData, status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error, status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: error, status: 500 });
  }
};
