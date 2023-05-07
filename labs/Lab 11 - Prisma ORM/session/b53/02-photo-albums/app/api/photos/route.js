import * as repo from "@/utilities/repository.js";

export async function POST(request, { params }) {
  const blob = await request.blob();
  const id = await repo.createPhoto(blob);
  return Response.json({ url: `/api/photos/${id}` }, { status: 201 });
}
