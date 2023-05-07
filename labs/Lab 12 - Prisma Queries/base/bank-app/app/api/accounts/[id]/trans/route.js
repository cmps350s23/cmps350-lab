import AccountsRepo from "../../../accounts-repo";
const repo = new AccountsRepo();

export async function POST(request, { params }) {
    const { id } = params
    const transaction = await request.json()
    console.log(transaction);

    const response = await repo.addTransaction(transaction, id)
    return Response.json(response)
}