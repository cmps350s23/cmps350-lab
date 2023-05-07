import AccountsRepo from "../accounts-repo"
const repo = new AccountsRepo()

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const accounts = await repo.getAccounts(type)

    return Response.json(accounts)
}

export async function POST(request) {

    const account = await request.json()
    console.log(account);
    const newAccount = await repo.addAccount(account)
    return Response.json(newAccount)

}