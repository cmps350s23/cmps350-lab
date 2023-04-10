import * as repo from "../../repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    return Response.json({ message: "GET /api/accounts/:id/transactions" });
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "An internal error has occurred." },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = params;

    return Response.json({ message: "PUT /api/accounts/:id/transactions" });
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "An internal error has occurred." },
      { status: 500 }
    );
  }
}
