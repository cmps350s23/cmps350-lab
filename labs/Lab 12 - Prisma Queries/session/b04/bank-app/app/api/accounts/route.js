import AccountsRepo from "@/app/api/accounts-repo";
const repo = new AccountsRepo();

export async function GET(request) {
  const type = request.nextUrl.searchParams.get("type");
  const result = await repo.getAccounts(type);
  console.log(result);
  if (result.error) {
    return Response.json({ message: result.message }, { status: 400 });
  }
  return Response.json(result.payload);
}

export async function POST(request) {
  const account = await request.json();
  const result = await repo.addAccount(account);
  if (result.error) {
    return Response.json({ message: result.message }, { status: 400 });
  }
  return Response.json(result.payload);
}

// const response = await fetch(path);
// if (!response.ok) {
//   // display error message
//   // cleanup and return
// }
// const data = await response.json();
