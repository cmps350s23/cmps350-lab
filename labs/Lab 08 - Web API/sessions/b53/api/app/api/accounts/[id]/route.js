import * as repo from "../repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const account = await repo.readAccount(id);

    if (account) {
      return Response.json(account, { status: 200 });
    }

    return Response.json({ message: "Account not found." }, { status: 404 });
  } catch (e) {
    console.error(e.message);
    return Response.json(
      { message: "An error has occurred." },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const account = await repo.updateAccount({
      // ...{ balance: body.balance, type: body.type },
      ...body,
      id,
    });

    if (account) {
      return Response.json(account, { status: 200 });
    }

    return Response.json({ message: "Account not found." }, { status: 404 });
  } catch (e) {
    console.error(e.message);
    return Response.json(
      { message: "An error has occurred." },
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
  } catch (e) {
    console.error(e.message);
    return Response.json(
      { message: "An error has occurred." },
      { status: 500 }
    );
  }
}
