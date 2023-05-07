import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function readProjects() {
  const projects = await prisma.project.findMany({
    include: {
      tasks: true,
    },
  });
  // await disconnect();
  return projects;
}

async function disconnect() {
  try {
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}
