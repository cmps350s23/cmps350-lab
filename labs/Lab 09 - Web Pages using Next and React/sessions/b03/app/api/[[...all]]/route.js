export async function GET(request, { params }) {
  return Response.json({ message: "Undefined route" }, { status: 404 });
}
