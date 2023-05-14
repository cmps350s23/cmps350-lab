import AccountsRepo from "../accounts-repo"
const repo = new AccountsRepo()

export async function GET(request) {
    const owners = await repo.getOwners()
    return Response.json(owners)
}
