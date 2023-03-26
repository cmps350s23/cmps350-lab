const BASE_URL =
  "https://gist.githubusercontent.com/abdalabaaji/8ac1f0ff9c9e919c72c5f297a9b5266e/raw/a67887ba7445a6887be4c748fcfa0931f0dd165c/recipes";

// load html page in a specific div using the fetch api
async function loadPage(pageUrl) {
  const mainContent = document.getElementById("main-content");
  const page = await fetch(pageUrl);
  const pageHTMLContent = await page.text();
  mainContent.innerHTML = pageHTMLContent;
}

/* you can use the below code for displaying the card
    the same code is also given in the html file
*/
/*
<div class="recipe-card">
  <img
    src="https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg"
    class="card-img"
  />
  <div class="description">
    <h1>Pasta Dish</h1>
    <hr />
    <h2>Instructions</h2>
    <p class="instructions">
      Grease a 1 litre/2 pint pie dish with butter.\r\nCut the crusts off the
      bread.
    </p>
  </div>
  <div class="action-btns">
    <button class="btn-update"><i class="fa fa-pencil">Update</i></button>
    <button class="btn-delete"><i class="fa fa-trash"> Delete </i></button>
  </div>
</div>
*/
