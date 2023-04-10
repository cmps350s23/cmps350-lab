import * as repo from "../../../../../utilities/repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const transactions = await repo.readTransactions(id);

    return Response.json(transactions, { status: 200 });
  } catch (e) {
    console.error(e.message);
    return Response.json(
      { message: "An error has occurred." },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    if (false) {
      return Response.json({ message: "Invalid parameters." }, { status: 400 });
    }

    const transaction = await repo.createTransaction(id, body);

    if (transaction) {
      return Response.json(transaction, { status: 201 });
    } else {
      return Response.json(
        { message: "Insufficient balance." },
        { status: 409 }
      );
    }
  } catch (e) {
    console.error(e.message);
    return Response.json(
      { message: "An error has occurred." },
      { status: 500 }
    );
  }
}
