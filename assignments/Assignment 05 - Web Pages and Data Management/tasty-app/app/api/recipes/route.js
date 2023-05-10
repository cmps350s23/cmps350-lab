import repo from "./recipe-repo.js";

export async function GET(request) {
    try {

        try {
            const { searchParams } = new URL(request.url);
            const region = searchParams.get("region");
            let recipes = await repo.getRecipes(region);

            return Response.json(recipes, { status: 200 });
        } catch (e) {
            console.log(e);
        }

    } catch (e) {
        console.log(e);
        return Response.json({ error: "There was an internal error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const newRecipe = await request.json();
        const added = await repo.addRecipe(newRecipe);

        return Response.json(added, { status: 200 });
    } catch (e) {
        console.log(e);
        return Response.json({ error: "There was an internal error" }, { status: 500 });
    }
}