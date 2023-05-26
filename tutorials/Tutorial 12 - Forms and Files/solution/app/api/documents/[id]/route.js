import { revalidatePath } from "next/cache";
import prisma from "@/app/api/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;
  const result = await prisma.document.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  return Response.json("Success.");
}

export async function GET(request, { params }) {
  const { id } = params;
  const document = await prisma.document.findUnique({
    where: {
      id,
    },
  });

  const blob = new Blob([document.content], {
    type: document.type,
  });
  return new Response(blob);

  // const file = new File([blob], document.name, {
  //   type: document.type,
  //   lastModified: new Date(),
  // });
  // const response = new Response(file);
  // const headers = new Headers(response.headers);
  // headers.set("Content-Type", document.type);
  // headers.set("Content-Disposition", `attachment; filename=${document.name}`);
  // return response;
}
