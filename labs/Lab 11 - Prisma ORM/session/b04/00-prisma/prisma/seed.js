const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

const seed = async () => {
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
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
