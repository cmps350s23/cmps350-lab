import { revalidatePath } from "next/cache";
import prisma from "@/app/api/prisma";

export async function GET(request) {
  const documents = await prisma.document.findMany({
    select: {
      id: true,
      name: true,
      type: true,
    },
  });
  return Response.json(documents);
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const content = Buffer.from(await file.arrayBuffer());

  const result = await prisma.document.create({
    data: {
      name: file.name,
      size: file.size,
      type: file.type,
      content,
    },
  });
  revalidatePath("/");
  return Response.json("Success.", { status: 201 });
}
