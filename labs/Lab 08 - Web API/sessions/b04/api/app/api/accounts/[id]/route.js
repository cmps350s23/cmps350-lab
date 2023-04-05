import * as repo from "../repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const account = await repo.readAccount(id);

    if (account) {
      return Response.json(account, { status: 200 });
    } else {
      return Response.json({ message: "Account not found." }, { status: 404 });
    }
  } catch (error) {
    console.log(error.message);
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

    // body must be validated
    // if (
    //   "balance" in body &&
    //   Number(body.balance) < 0 ||
    //   "type" in body &&
    //   (body.type !== "current" && body.type !== "savings")
    // ) {
    //   return Response.json({ message: "Invalid parameters." }, { status: 400 });
    // }

    const account = await repo.updateAccount(id, body);
    if (account) {
      return Response.json(account, { status: 200 });
    } else {
      return Response.json({ message: "Account not found." }, { status: 404 });
    }
  } catch (error) {
    console.log(error.message);
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
    } else {
      return Response.json({ message: "Account not found." }, { status: 404 });
    }
  } catch (error) {
    console.log(error.message);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
