import * as repo from "@/utilities/repository.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const transactions = await repo.readTransactions(id);

    if (transactions) {
      return Response.json(transactions, { status: 200 });
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

export async function POST(request, { params }) {
  try {
    // successful transaction
    // if transaction
    return Response.json({ message: "" }, { status: 201 });

    // failed transactions
    // if result === false
    return Response.json({ message: "" }, { status: 409 });

    // account not found
    // if result === null
    return Response.json({ message: "" }, { status: 404 });
  } catch (error) {
    console.error(error.message);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
