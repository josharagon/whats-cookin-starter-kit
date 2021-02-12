let allRecipes = {}
const nav = document.querySelector('#nav');
const main = document.querySelector('#main')
const userKitchen = document.querySelector('#userDropdown');
const recipeChart = document.querySelector('#recipes');
const recipesBox = document.querySelector('#recipesBox');
const recipeCard = document.querySelector('#recipeCard');

nav.addEventListener('click', navPress)
recipeChart.addEventListener('click', mainPress)
window.addEventListener('load', instantiate)

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
    recipeChart.innerHTML += `<div class="recipe-image" id=${recipe.id}>
      <img src=${recipe.image} id=${recipe.id} alt=${recipe.name}>
      <div class="centered" id=${recipe.id}>${recipe.name}</div>
    </div>`
  })
}

function navPress() {
  if (event.target.id === 'whatsCookin') {
    showKitchen()
  }
}

function mainPress() {
  let click = event.target.id;
  const card = allRecipes.recipes.find(recipe => recipe.id == click)
  if(card) {
    showRecipe(card)
  }
}

function showRecipe(recipe) {
  recipeCard.classList.remove('hidden')
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
