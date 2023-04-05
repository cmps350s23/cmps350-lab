import * as repo from "../repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const account = await repo.readAccount(id);

    if (account) {
      return Response.json(account, { status: 200 });
    }

    return Response.json({ message: "Account not found." }, { status: 404 });
  } catch (error) {
    console.error(error.message);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    // validate body as in POST /api/accounts

    const account = await repo.updateAccount(id, body);

    if (account) {
      return Response.json(account, { status: 200 });
    }

    return Response.json({ message: "Account not found." }, { status: 404 });
  } catch (error) {
    console.error(error.message);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const account = await repo.deleteAccount(id);

    if (account) {
      return Response.json(account, { status: 200 });
    }

    return Response.json({ message: "Account not found." }, { status: 404 });
  } catch (error) {
    console.error(error.message);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
