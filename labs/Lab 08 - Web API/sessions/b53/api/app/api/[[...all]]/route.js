export async function GET(request, { params }) {
  // return Response.json(params.all);

  // if (all[0] === "accounts") {
  //   if (all[1]) {
  //     if (all[2] === "transactions") {
  //     }
  //   }
  // }

  return Response.json({ message: "Route not found." }, { status: 404 });
}
