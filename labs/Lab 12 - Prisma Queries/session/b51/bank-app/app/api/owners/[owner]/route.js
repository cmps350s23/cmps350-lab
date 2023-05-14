import AccountsRepo from "@/app/api/accounts-repo";
const repo = new AccountsRepo();

export async function GET(request, { params }) {
  const { owner } = params;
  const result = await repo.getOwnerReport(owner);
  return Response.json(result);
}
