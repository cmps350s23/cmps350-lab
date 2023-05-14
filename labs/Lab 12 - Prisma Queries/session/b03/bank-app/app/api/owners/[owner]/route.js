import AccountsRepo from "@/app/api/accounts-repo";
const repo = new AccountsRepo();

export async function GET(request, { params }) {
  const { owner } = params;
  console.log(owner);
  const result = await repo.getOwnerTranSum(owner);
  if (result.error) {
    return Response.json({ error: result.message }, { status: 400 });
  }
  return Response.json(result.payload);
}
