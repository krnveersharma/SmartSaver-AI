import { cookies } from "next/headers";
import * as jose from "jose";
import Groq from "groq-sdk";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GET = async () => {
  try {
    const token = cookies().get("token");
    const claims = jose.decodeJwt(token.value);
    const data = await prisma.savemoney.findMany({
      where: {
        userId: claims.id,
      },
    });
    return NextResponse.json({ data: data[0], status: 200 });
  } catch (error) {
    return NextResponse.json({ data: "No data", status: 400 });
  }
};

export const POST = async (request: Request) => {
  const formatExpenditureData = (data) => {
    let formattedData = `User ID: ${data.userId}\nExpenditures:\n`;
    data.map((item) => {
      formattedData += `- ${item.name}: 'Rupees '$${item.expense}+${item.date}\n`;
    });
    return formattedData;
  };

  async function getGroqChatCompletion(prompt) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });
  }

  const body = await request.json();

  const token = cookies().get("token");
  const claims = jose.decodeJwt(token.value);
  let findRecommend = await prisma.recommendation.findMany({
    where: {
      userId: claims.id,
    },
  });
  const now = new Date();
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // The last day of the previous month

  const userData = await prisma.expenditure.findMany({
    where: {
      userId: claims.id,
      date: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });
  try {
    const formattedData = formatExpenditureData(userData);
    const prompt = `The data is \n\n${formattedData}.Thoroughly Analyze the everyday data of previous month. This is not whole month data. This data is of some days .AutoPredict everyday expense  of whole month according to data i have given of some days. Like take average cost of things of each day and scale it to whole month .And automatically categorize data such as milk is in grocerry.All price is in INR.\n\n Only Give me the monthly budget plan such that expense for this month is around rupees ${body}.Don't give anything else other than that.`;
    const chatCompletion = await getGroqChatCompletion(
      prompt +
        "Give answer only in json format as {Category:budget}[] and budget should be in rupees,write nothing else instead of this type of output.Don't insert newlines in answer .So, output will be {'category':budget}[] "
    );
    let cleanString = chatCompletion.choices[0]?.message?.content;
    let first = -1;
    let last = -1;
    for (let i = 0; i < cleanString.length; i++) {
      if (cleanString[i] == "[") {
        first = i;
      }
      if (cleanString[i] == "]") {
        last = i;
      }
    }
    cleanString = cleanString.substring(first, last + 1);
    if (cleanString.length != 0) {
      try {
        await prisma.savemoney.delete({
          where: {
            userId: claims.id,
          },
        });
        const response = await prisma.savemoney.create({
          data: {
            saving: parseInt(body),
            data: cleanString,
            userId: claims.id,
          },
        });
      } catch (error) {
        console.log(error);
      }

      return NextResponse.json({ data: cleanString, status: 200 });
    }
    return NextResponse.json({ data: "Already generated", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 });
  }
};
