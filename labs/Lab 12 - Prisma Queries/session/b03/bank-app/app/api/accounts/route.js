import AccountsRepo from "../accounts-repo";
const repo = new AccountsRepo();

export async function GET(request) {
  const type = request.nextUrl.searchParams.get("type");
  const result = await repo.getAccounts(type);
  if (result.error) {
    return Response.json({ message: result.message }, { status: 400 });
  }
  return Response.json(result.payload);
}

export async function POST(request) {
  const account = await request.json();
  console.log(account);
  const newAccount = await repo.addAccount(account);
  return Response.json(newAccount);
}
