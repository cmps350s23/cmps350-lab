import * as repo from "./repository.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type")?.toLowerCase();
    // const type = searchParams.get("type")
    //   ? searchParams.get("type").toLowerCase()
    //   : searchParams.get("type");
    // const type = request.nextUrl.searchParams.get("type");

    // breaking code
    // const o = null;
    // o.key;

    if (type && type !== "current" && type !== "savings") {
      return Response.json({ message: "Invalid parameters" }, { status: 400 });
    }

    const accounts = await repo.readAccounts(type);
    return Response.json(accounts, { status: 200 });
  } catch (e) {
    console.error(e.message);
    return Response.json(
      { message: "An error has occurred." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    // body.balance = body.balance ? Number(body.balance) : body.balance;
    // body.type = body.type ? body.type.toLowerCase() : body.type;

    if (
      body.balance &&
      Number(body.balance) >= 0 &&
      body.type &&
      (body.type !== "current" || body.type !== "savings")
    ) {
      const account = await repo.createAccount({
        balance: body.balance,
        type: body.type,
      });
      return Response.json(account, { status: 201 });
    }

    return Response.json({ message: "Invalid parameters" }, { status: 400 });
  } catch (e) {
    console.error(e.message);
    return Response.json(
      { message: "An error has occurred." },
      { status: 500 }
    );
  }
}
