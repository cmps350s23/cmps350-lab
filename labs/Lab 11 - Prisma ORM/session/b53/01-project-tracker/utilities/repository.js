import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function readProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
      },
    });
    return projects;
  } catch (e) {
    console.error(e);
  }
}

export async function createProject(project) {
  return await prisma.project.create({
    data: project,
  });

  try {
    if (!("title" in project)) {
      return { code: 1, message: "Title was not provided." };
    }
    if (!("completed" in project)) {
    }

    const p = await prisma.project.create({
      data: {
        title: project.title,
        completed: project.completed,
      },
    });
    return projects;
  } catch (e) {
    console.error(e);
  }
}

// export async function readProject() {}

export async function updateProject() {}

export async function deleteProject() {}

// export async function readTasks() {}

// export async function readTask() {}

export async function createTask() {}

export async function updateTask() {}

export async function deleteTask() {}
