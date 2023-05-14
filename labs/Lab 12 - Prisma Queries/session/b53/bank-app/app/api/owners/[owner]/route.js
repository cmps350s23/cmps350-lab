import AccountsRepo from "@/app/api/accounts-repo";
const repo = new AccountsRepo();

export async function GET(request, { params }) {
  const { owner } = params;
  // const result = await repo.getOwnerReport(owner);
  const result = await repo.getOwnerBalance(owner);
  if (result.error) {
    return Response.json({ message: result.message }, { status: 400 });
  }
  return Response.json(result.payload);
}

// const res = await fetch();
// const data = await res.json();
// if (!res.ok) {
//   console.error(data.message);
// }
