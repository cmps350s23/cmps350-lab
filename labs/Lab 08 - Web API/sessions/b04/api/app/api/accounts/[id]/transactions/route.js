import * as repo from "../../repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const transactions = await repo.readTransactions(id);

    if (transactions) {
      return Response.json(transactions, { status: 200 });
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

export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    console.log(body);
    // const body = await request.formData();
    const transaction = await repo.createTransaction(id, body);

    // assuming body is valid
    //if balance is insufficient set the status to 409

    if (transaction) {
      return Response.json(transaction, { status: 201 });
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
