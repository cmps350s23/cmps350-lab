import * as repo from "@/utilities/repository.js";

export async function GET(request) {
  try {
    // const type = request.nextUrl.searchParams.get("type");
    const searchParams = new URL(request.url).searchParams;
    // const type = searchParams.get("type")
    //   ? searchParams.get("type").toLowerCase()
    //   : searchParams.get("type");
    const type = searchParams.get("type")?.toLowerCase();
    const accounts = await repo.readAccounts(type);
    return Response.json(accounts, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);

    if (
      "balance" in body &&
      Number(body.balance) >= 0 &&
      "type" in body &&
      (body.type === "current" || body.type === "savings")
    ) {
      const account = await repo.createAccount({
        balance: Number(body.balance),
        type: body.type,
        transactions: [],
      });
      console.log(account);
      return Response.json(account, { status: 201 });
    } else {
      return Response.json({ message: "Invalid parameters." }, { status: 400 });
    }
  } catch (error) {
    console.log(error.message);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
