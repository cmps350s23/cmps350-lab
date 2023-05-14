import AccountsRepo from "../accounts-repo";
const repo = new AccountsRepo();

export async function GET(request) {
  const result = await repo.getOwners();
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
