import * as repo from "@/utilities/repository.js";

export async function GET(request, { params }) {
  try {
    // const type = request.nextUrl.searchParams.get("type");
    const type = new URL(request.url).searchParams.get("type")?.toLowerCase();

    if (type && type !== "current" && type !== "savings") {
      return Response.json({ message: "Invalid parameters." }, { status: 400 });
    }

    const accounts = await repo.readAccounts(type);
    return Response.json(accounts, { status: 200 });
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
    const body = await request.json();
    if (
      "balance" in body &&
      Number(body.balance) >= 0 &&
      "type" in body &&
      (body.type === "current" || body.type === "savings")
    ) {
      const account = await repo.createAccount({
        balance: body.balance,
        type: body.type,
      });
      return Response.json(account, { status: 201 });
    }

    return Response.json({ message: "Invalid parameters." }, { status: 400 });
  } catch (error) {
    console.error(error.message);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
