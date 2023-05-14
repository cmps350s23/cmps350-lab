import AccountsRepo from "../../accounts-repo";

const repo = new AccountsRepo();

export async function GET(request, { params }) {
    const { id } = params;
    const account = await repo.getAccount(id)
    return Response.json(account, { status: 200 });
}

export async function PUT(request, { params }) {
    const account = await request.json()
    const accountNo = params.id;
    const updatedAccount = await repo.updateAccount(account, accountNo)
    return Response.json(updatedAccount)
}

export async function DELETE(request, { params }) {
    const { id } = params;
    const account = await repo.deleteAccount(id)
    return Response.json(account, { status: 200 });
}