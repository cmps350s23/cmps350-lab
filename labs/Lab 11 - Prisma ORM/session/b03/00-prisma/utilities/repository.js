import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function readUsers() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  // await disconnect();
  return users;
}
