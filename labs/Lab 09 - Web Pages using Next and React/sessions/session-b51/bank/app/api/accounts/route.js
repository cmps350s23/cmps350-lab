import * as repo from "./repository.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let type = searchParams.get("type")?.toLowerCase();
    // const type = request.nextUrl.searchParams.get("type");

    if (type && !(type === "current" || type == "savings")) {
      return Response.json({ message: "Invalid parameters." }, { status: 400 });
    }

    // breaking code
    // const o = null;
    // console.log(o.prop);

    const accounts = await repo.readAccounts(type);
    return Response.json(accounts, { status: 200 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "An internal error has occurred." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    let body = await request.json();
    body.balance = Number(body.balance ?? 0.0);
    body.type = body.type ? body.type.toLowerCase() : body.type;

    if (
      body.balance >= 0 &&
      (body.type === "current" || body.type === "savings")
    ) {
      body = { balance: body.balance, type: body.type };
      const account = await repo.createAccount(body);
      return Response.json(account, { status: 201 });
    }

    return Response.json({ message: "Invalid parameters." }, { status: 400 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { message: "An internal error has occurred." },
      { status: 500 }
    );
  }
}
