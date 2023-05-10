import repo from "../recipe-repo.js";

export async function GET(request, { params }) {
    try {
        const { id } = params
        const recipes = await repo.getRecipe(id);
        return Response.json(recipes, { status: 200 });
    } catch (e) {
        console.log(e);
        return Response.json({ error: "There was an internal error" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params
        const updatedRecipe = await request.json();
        const response = await repo.updateRecipe(id, updatedRecipe);
        return Response.json(response, { status: 200 });
    } catch (e) {
        console.log(e);
        return Response.json({ error: "There was an internal error" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params
        const response = await repo.deleteRecipe(id)
        return Response.json(response, { status: 200 })
    } catch (e) {
        console.log(e);
        return Response.json({ error: 'There was an internal error' }, { status: 500 })
    }
}