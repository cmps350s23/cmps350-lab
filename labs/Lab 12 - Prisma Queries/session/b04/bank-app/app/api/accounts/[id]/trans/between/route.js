import AccountsRepo from "@/app/api/accounts-repo";
const repo = new AccountsRepo();

export async function GET(request, { params }) {
  const account = params["id"];
  const fromDate = request.nextUrl.searchParams.get("from");
  const toDate = request.nextUrl.searchParams.get("to");

  const result = await repo.getTrans(fromDate, toDate, account);
  if (result.error) {
    return Response.json({ message: result.message }, { status: 400 });
  }
  return Response.json(result.payload);
}
