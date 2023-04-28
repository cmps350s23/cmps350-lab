import AccountsRepo from "../../accounts-repo";
const repo = new AccountsRepo();

export async function POST(request) {
    const transaction = await request.json()
    console.log(transaction);
    const response = await repo.addTransaction(transaction)
    return Response.json(response)

}