import path from 'path'
import { promises as fs } from 'fs'

const dataPath = path.join(process.cwd(), 'data/recipes.json')

// TODO : re-implement the following functions using prisma

class RecipeRepo {

    async getRecipes(region) {
        try {

            const data = await fs.readFile(dataPath, 'utf8');
            const recipes = JSON.parse(data);

            if (!region || region == 'All') return recipes

            return recipes.filter((r) => r.region.toUpperCase() === region.toUpperCase());
        } catch (e) {
            console.log(e.message);
            return { error: e.message }
        }
    }

    async getRecipe(id) {
        try {
            const recipes = await this.getRecipes();
            const recipe = recipes.find(r => r.id == id);

            if (!recipe)
                return { error: `No Recipe with id : ${id}` }

            return recipe;
        } catch (e) {
            console.log(e.message);
            return { error: e.message }
        }
    }

    async addRecipe(recipe) {
        try {
            const recipes = await this.getRecipes();
            recipe.id = Math.max(...recipes.map(r => r.id)) + 1
            recipes.push(recipe);
            await fs.writeFile(dataPath, JSON.stringify(recipes, null, 2));

            return recipe;
        } catch (e) {
            console.log(e.message);
            return { error: e.message }
        }

    }

    async updateRecipe(id, updatedRecipe) {
        try {
            const recipes = await this.getRecipes();
            const index = recipes.findIndex(r => r.id == id);

            recipes[index] = { ...recipes[index], ...updatedRecipe };
            await fs.writeFile(dataPath, JSON.stringify(recipes, null, 2));
            return recipes[index];

        } catch (e) {
            console.log(e.message);
            return { error: e.message }
        }


    }

    async deleteRecipe(id) {
        try {
            const recipes = await this.getRecipes();
            const newRecipes = recipes.filter(r => r.id != id);
            await fs.writeFile(dataPath, JSON.stringify(newRecipes, null, 2));
            return { message: `Recipe with id : ${id} deleted successfully` }

        } catch (e) {
            console.log(e.message);
            return { error: e.message }
        }
    }

    // this is a new method so no need to implement an interface for it.
    //use aggregation
    async getRegionsRecipes() {
        try {
            const data = await fs.readFile(dataPath, 'utf8');
            const recipes = JSON.parse(data);
            const regions = [...new Set(recipes.map(r => r.region))];

            const regionRecipes = regions.map(region => {
                const recipesInRegion = recipes.filter(r => r.region === region);
                return { region, recipes: recipesInRegion, count: recipesInRegion.length }
            });

            console.log(JSON.stringify(regionRecipes, null, 2))
            return regionRecipes;
        } catch (e) {
            console.log(e.message);
            return { error: e.message }
        }
    }
}

// just to test the aggregation function
new RecipeRepo().getRegionsRecipes();
export default new RecipeRepo();