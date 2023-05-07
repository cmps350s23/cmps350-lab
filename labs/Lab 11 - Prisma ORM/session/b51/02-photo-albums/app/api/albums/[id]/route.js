import * as repo from "@/utilities/repository.js";

export async function GET(request, { params }) {
  const id = params["id"];
  const album = await repo.readAlbum(id);
  if (album) {
    return Response.json(album);
  } else {
    return Response.json({ message: "Album not found." }, { status: 404 });
  }
}

export async function PATCH(request, { params }) {
  const id = params["id"];
  const { photos } = await request.json();
  const success = await repo.updateAlbum(id, photos);
  if (success) {
    return Response.json("Success.");
  } else {
    return Response.json({ message: "Album not found." }, { status: 404 });
  }
}

export async function DELETE(request, { params }) {
  const id = params["id"];
  const success = await repo.deleteAlbum(id);
  if (success) {
    return Response.json("Success.");
  } else {
    return Response.json({ message: "Album not found." }, { status: 404 });
  }
}
