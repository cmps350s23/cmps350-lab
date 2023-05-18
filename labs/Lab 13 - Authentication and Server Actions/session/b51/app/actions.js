"use server";

import prisma from "@/utilities/prisma-client";
import { revalidatePath } from "next/cache";

export async function createUser(data) {
  try {
    const user = await prisma.user.create({
      data: data ?? {},
    });
    revalidatePath("/");
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function readIdeas(userId) {
  try {
    const ideas = await prisma.idea.findMany({
      where: {
        userId,
      },
    });
    // revalidatePath("/");
    return ideas;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteIdea(id) {
  try {
    const ideas = await prisma.idea.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    return ideas;
  } catch (error) {
    console.error(error);
  }
}

export async function createIdea(data) {
  try {
    const idea = await prisma.idea.create({
      data,
    });
    revalidatePath("/");
    return idea;
  } catch (error) {
    console.error(error);
  }
}
