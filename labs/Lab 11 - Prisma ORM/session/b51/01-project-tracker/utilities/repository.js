import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProject(project) {
  return await prisma.project.create({
    data: project,
  });
}

// export async function readProject(id) {}

export async function readProjects() {
  return await prisma.project.findMany({
    include: {
      tasks: true,
    },
  });
}

export async function updateProject(project) {
  return await prisma.project.update({
    where: {
      id: project.id,
    },
    data: project,
  });
}

export async function deleteProject(id) {
  return await prisma.project.delete({
    where: {
      id,
    },
  });
}

export async function createTask(task, projectId) {
  return await prisma.task.create({
    data: { ...task, projectId },
  });
}

// export async function readTasks() {}

// export async function readTask(id) {}

export async function updateTask(task) {
  await prisma.task.update({
    where: {
      id: task.id,
    },
    data: task,
  });
}

export async function deleteTask(id) {
  return await prisma.task.delete({
    where: {
      id,
    },
  });
}
