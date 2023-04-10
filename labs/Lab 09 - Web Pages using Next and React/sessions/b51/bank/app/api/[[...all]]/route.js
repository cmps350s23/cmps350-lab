export async function GET(request, { params }) {
  return Response.json(
    { message: "Not found", path: params.all.join("/") },
    { status: 404 }
  );
}
