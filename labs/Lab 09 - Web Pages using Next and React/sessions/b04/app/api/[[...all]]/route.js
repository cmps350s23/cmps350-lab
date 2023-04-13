export async function GET(request) {
  return Response.json({ message: "Invalid endpoint." }, { status: 404 });
}
