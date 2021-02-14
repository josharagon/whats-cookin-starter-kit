let allRecipes = {}
const nav = document.querySelector('#nav');
const userKitchen = document.querySelector('#userDropdown');
const recipeChart = document.querySelector('#recipes');
const recipesBox = document.querySelector('#recipesBox');
const searchBar = document.querySelector('.search-bar');

nav.addEventListener('click', navPress)
window.addEventListener('load', instantiate)
searchBar.addEventListener('keyup', updateRecipeImages)

function instantiate() {
  instantiateRecipeRepository();
  console.log(allRecipes)
  showRecipeImages(allRecipes.recipes);
}

function instantiateRecipeRepository() {
  const recipes = recipeData.map(recipe => {
    var recipe = new Recipe(recipe)
    return recipe;
  })
  allRecipes = new RecipeRepository(recipes)
}

function showRecipeImages(recipes) {
  recipes.forEach(recipe => {
    recipeChart.innerHTML += `<div class="recipe-image">
      <img src=${recipe.image} alt=${recipe.name}>
      <div class="centered">${recipe.name}</div>
    </div>`
  })
}

function updateRecipeImages() {
  allRecipes.filterRecipesViaName(searchBar.value);
  console.log(searchBar.value.split('  '))
  allRecipes.filterRecipesViaTags(searchBar.value.split('  '))
}

function navPress() {
  if (event.target.id === 'whatsCookin') {
    showKitchen()
  }
}


function showKitchen() {
  document.querySelector('#whatsCookin').classList.toggle("active");
  userKitchen.classList.toggle("collapsed");
  if (userKitchen.style.maxHeight) {
    userKitchen.style.maxHeight = null;
    userKitchen.style.height = null;
    recipesBox.style.height = '85%';
  } else {
    userKitchen.style.maxHeight = '275px';
    userKitchen.style.height = '275px';
    recipesBox.style.height = '60%';
  }
}
