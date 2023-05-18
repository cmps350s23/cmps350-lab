"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (data) => {
  return await prisma.user.create({
    data: data ?? {},
  });
};

export const readIdeas = async (userId) => {
  return await prisma.idea.findMany({
    where: {
      userId,
    },
  });
};

export const createIdea = async (data) => {
  return await prisma.idea.create({ data });
};

export const deleteIdea = async (id) => {
  return await prisma.idea.delete({ where: { id } });
};

export const createIdeaAction = async (formData) => {
  const title = formData.get("idea-title");
  const userId = formData.get("user-id");
  await createIdea({ title, userId });
  revalidatePath("/");
};

export const deleteIdeaAction = async (formData) => {
  const id = formData.get("idea-id");
  await deleteIdea(id);
  revalidatePath("/");
};

export const createUserAction = async (data) => {
  return await createUser();
};
