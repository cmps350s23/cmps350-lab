import AccountsRepo from "../accounts-repo";
const repo = new AccountsRepo();

export async function GET(request) {
  const result = await repo.getOwners();
  if (result.error) {
    return Response.json({ error: result.message }, { status: 400 });
  }
  return Response.json(result.payload);
}

// const response = await fetch(path);
// if (!response.ok) {
//   // display error message
//   //
//   // cleanup and return
// }
// const data = await response.json();
