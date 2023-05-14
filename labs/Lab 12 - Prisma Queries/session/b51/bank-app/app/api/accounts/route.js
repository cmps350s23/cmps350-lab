import AccountsRepo from "../accounts-repo";
const repo = new AccountsRepo();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const accounts = await repo.getAccounts(type);

  return Response.json(accounts);
}

export async function POST(request) {
  const account = await request.json();
  console.log(account);
  const result = await repo.addAccount(account);
  if (result.error) {
    return Response.json({ message: result.payload }, { status: 400 });
  }
  return Response.json(result.payload);
}

// const res = await fetch();
// if (res.ok) {
//   const data = await res.json();
// } else {
//   // display error
// }
