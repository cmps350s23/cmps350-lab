import * as repo from "@/utilities/repository.js";

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const id = params["id"];
  const photo = await repo.readPhoto(id);
  if (photo) {
    return Response.redirect(`${url.origin}/files/${id}`);
  } else {
    return Response.json({ message: "Photo not found." }, { status: 404 });
  }
}
