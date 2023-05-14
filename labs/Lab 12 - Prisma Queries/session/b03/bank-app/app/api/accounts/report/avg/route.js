import AccountsRepo from "@/app/api/accounts-repo";
const repo = new AccountsRepo();

export async function GET(request) {
  // const body = await request.json();
  const result = await repo.getAvgBalance();
  if (result.error) {
    return Response.json({ error: result.message }, { status: 400 });
  }
  return Response.json(result.payload);
}
