import * as repo from "@/utilities/repository.js";

export async function GET(request) {
  const albums = await repo.readAlbums();
  return Response.json(albums);
}

export async function POST(request) {
  const { title } = await request.json();
  const id = await repo.createAlbum(title);

  if (id) {
    return Response.json({ url: `/api/albums/${id}` }, { status: 201 });
  } else {
    return Response.json({ message: "Title already exists." }, { status: 400 });
  }
}
