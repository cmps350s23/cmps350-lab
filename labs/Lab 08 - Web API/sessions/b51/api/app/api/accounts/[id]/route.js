import * as repo from "../repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    return Response.json({ message: "GET /api/accounts/:id", id });
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "An internal error has occurred." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;

    return Response.json({ message: "PUT /api/accounts/:id" });
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "An internal error has occurred." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const account = await repo.deleteAccount(id);

    if (account) {
      return Response.json({ message: "Account deleted" }, { status: 200 });
    }

    return Response.json({ message: "Account not found" }, { status: 404 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "An internal error has occurred." },
      { status: 500 }
    );
  }
}
