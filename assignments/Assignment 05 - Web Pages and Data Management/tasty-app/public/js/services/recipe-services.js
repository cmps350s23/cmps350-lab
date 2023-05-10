const BASE_URL = '/api/recipes'

export async function getRecipes(region) {
    const data = await fetch(`${BASE_URL}?region=${region}`);
    const recipes = await data.json();
    return recipes;
}
export async function getRecipe(id) {
    const data = await fetch(`${BASE_URL}/${id}`);
    const recipe = await data.json();
    return recipe;
}

export async function addRecipe(recipe) {
    const data = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
    });
}
export async function updateRecipe(id, updatedRecipe) {
    const data = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe)
    });
}

export async function deleteRecipe(id) {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
}