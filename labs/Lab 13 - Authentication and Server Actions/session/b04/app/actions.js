"use server";

import { PrismaClient } from "@prisma/client";
// import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export const createUser = async (data) => {
  // "use server";
  return await prisma.user.create({
    data: data ?? {},
  });
};

export const readIdeas = async (userId) => {
  // "use server";
  return await prisma.idea.findMany({ where: { userId } });
};

export const createIdea = async (data) => {
  // "use server";
  // if (cookies().get("date")) {
  //   console.log(cookies().get("date"));
  // }
  // cookies().set("date", JSON.stringify(new Date()));
  return await prisma.idea.create({
    data: data ?? {},
  });
};

export const deleteIdea = async (id) => {
  // "use server";
  return await prisma.idea.delete({
    where: { id },
  });
};

export const createIdeaAction = async (formData) => {
  // "use server";
  const title = formData.get("idea-title");
  const userId = formData.get("user-id");
  await createIdea({ title, userId });
  revalidatePath("/");
};

export const deleteIdeaAction = async (formData) => {
  // "use server";
  const id = formData.get("idea-id");
  await deleteIdea(id);
  revalidatePath("/");
};
