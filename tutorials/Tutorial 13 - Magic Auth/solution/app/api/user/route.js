import { validate } from "@/app/api/utilities/validate";
import prisma from "@/app/api/utilities/prisma";

export async function GET(request) {
  try {
    const email = await validate();
    if (email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        return Response.json(user, { status: 200 });
      }
    }
  } catch (error) {
    console.error(error);
    return Response.json("401 Unauthorized.", { status: 401 });
  }
}
