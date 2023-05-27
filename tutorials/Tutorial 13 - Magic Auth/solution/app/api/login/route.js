import { cookies } from "next/headers";
import prisma from "@/app/api/utilities/prisma";
import { validate } from "@/app/api/utilities/validate";

export async function POST(request) {
  try {
    const { token, data } = await request.json();
    const email = await validate(token);
    if (!email) {
      return;
    }

    let status = 200;
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data,
      });
      status = 201;
    }
    if (user) {
      cookies().set("token", token);
      return Response.json("Success.", { status });
    }
  } catch (error) {
    console.error(error);
    return Response.json("401 Unauthorized.", { status: 401 });
  }
}
