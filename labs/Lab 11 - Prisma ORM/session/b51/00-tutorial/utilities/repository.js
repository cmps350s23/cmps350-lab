import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function reset() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
}

export async function seed() {
  await reset();

  Array(Math.floor(Math.random() * 60))
    .fill()
    .forEach(
      async () =>
        await prisma.user.create({
          data: {
            email: faker.internet.email(),
            name: faker.name.fullName(),
            posts: {
              create: Array(Math.floor(Math.random() * 12))
                .fill()
                .map(() => ({
                  title: faker.commerce.productName(),
                  content: faker.lorem.text(),
                  published: Math.random() > 0.5,
                })),
            },
          },
        })
    );
  await disconnect();
}

async function disconnect() {
  // try {
  //   await prisma.$disconnect();
  // } catch (e) {
  //   console.error(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // }
}

export async function readUsers() {
  // try {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  // } catch (e) {}
  await disconnect();
  return users;
}
