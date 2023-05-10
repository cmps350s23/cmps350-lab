import * as services from './services/recipe-services.js';



// This function will be called when the page is loaded
document.addEventListener('DOMContentLoaded', async () => {
    window.loadPage = loadPage;
    window.deleteRecipe = deleteRecipe;
    window.addRecipe = addRecipe;
    window.showHideInstructions = showHideInstructions;
    await loadRecipes()
})
// We will use this variable to store all recipes
let recipes = [];

// We will use this variable to store all dom elements that we will use in our app
const mainContent = document.querySelector("#main-content");

let recipesCards;
let form;

// This will help us to load the page dynamically 
// and also to pass the id of the recipe to be updated 
async function loadPage(pageUrl, id) {
    const page = await fetch(pageUrl)
    const pageHTMLContent = await page.text()
    mainContent.innerHTML = pageHTMLContent;

    // check if we are in the recipes page or the form page

    if (pageUrl == 'pages/recipes.html') {
        recipesCards = document.querySelector("#recipe-cards");
        displayRecipes();
    } else if (pageUrl == 'pages/form.html') {
        form = document.querySelector("#recipe-form");

        // check if we are in add mode or edit mode
        if (!id) {
            form.addEventListener('submit', addRecipe);
        } else {
            // get the recipe from the service
            const recipe = await services.getRecipe(id);

            // fill the form with the recipe data
            for (const key in recipe)
                form[key].value = recipe[key];

            // change the button text
            form.querySelector('#submit-recipe-btn').value = 'Update Recipe';

            // add the event listener to the form
            form.addEventListener('submit', (e) => updateRecipe(e, id));
        }
    }
}

// This function will be called when the user clicks on the delete button 
// or when the app is loaded for the first time
async function loadRecipes() {
    await loadPage('pages/recipes.html')
    recipes = await services.getRecipes('All');
    displayRecipes();
}

async function displayRecipes() {
    const pageHTMLContent = recipes.map(recipe => recipeToCard(recipe)).join(' ');
    recipesCards.innerHTML = pageHTMLContent;

    // populate the select element with the regions
    const regions = [...new Set(recipes.map(recipe => recipe.region))];
    console.log(regions);
    const regionDD = document.querySelector('#regions');
    regionDD.innerHTML = `<option value="">All</option>`;
    regionDD.innerHTML += regions.map(region => `<option value="${region}">${region}</option>`).join(' ');
    regionDD.addEventListener('change', filterRecipes);

}

async function filterRecipes(e) {
    const region = e.target.value;
    console.log('region', region);
    const filteredRecipes = await services.getRecipes(region);
    recipesCards.innerHTML = filteredRecipes.map(recipe => recipeToCard(recipe)).join(' ');
}

{/* <h2>Instructions for ${recipe.id}</h2>
<p class="instructions">${recipe.instructions}
</p> */}
function recipeToCard(recipe) {
    return `<div class="recipe-card">
                    <img src="${recipe.image}" class="card-img" />
                    <div class="description">
                        <h1>${recipe.name}</h1>
                        <h3>${recipe.region}</h3>
                        <hr>
                        <div class="instructions" id="instructions-${recipe.id}">
                            <h2>Instructions for ${recipe.id}</h2>
                                <p>${recipe.instructions}
                            </p>
                        </div>
                    </div>
                    <br/>
                    <div class="action-btns">      
                        <button id="showhide-${recipe.id}" class="btn-detail" onclick="showHideInstructions(${recipe.id})"><i class="fa fa-book">Show Instructions </i></button>
                        <button class="btn-update" onclick="loadPage('pages/form.html', ${recipe.id})"> <i class="fa fa-pencil">Update</i></button>
                        <button class="btn-delete" onclick="deleteRecipe(${recipe.id})"> <i class="fa fa-trash"> Delete </i></button>
                    </div>
                </div>
        `
}

// This function will be called when the user clicks on the show instructions button
async function showHideInstructions(id) {

    const instructions = document.querySelector(`#instructions-${id}`)
    const showHideBtn = document.querySelector(`#showhide-${id}`)

    if (instructions.style.display == 'none' || instructions.style.display == '') {
        instructions.style.display = 'block'
        showHideBtn.innerHTML = `<i class="fa fa-close"> Hide Instructions </i>`
    }
    else {
        instructions.style.display = 'none'
        showHideBtn.innerHTML = `<i class="fa fa-book">Show Instructions </i>`
    }
}

async function deleteRecipe(id) {
    await services.deleteRecipe(id);
    await loadRecipes();

}

async function addRecipe(e) {
    e.preventDefault();
    const recipe = formToObject(e.target);
    await services.addRecipe(recipe);
    await loadRecipes();
}
async function updateRecipe(e, id) {
    e.preventDefault();
    const recipe = formToObject(e.target);
    await services.updateRecipe(id, recipe);
    await loadRecipes();
}

function formToObject(form) {
    const formData = new FormData(form)
    const data = {}

    for (const [key, value] of formData)
        data[key] = value

    return data;
}