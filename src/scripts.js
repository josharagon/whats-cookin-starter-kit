let allRecipes = {}
const nav = document.querySelector('#nav');
const userKitchen = document.querySelector('#userDropdown');
const recipeChart = document.querySelector('#recipes');
const recipesBox = document.querySelector('#recipesBox');

nav.addEventListener('click', navPress)
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
    recipeChart.innerHTML += `<div class="recipe-image">
      <img src=${recipe.image} alt=${recipe.name}>
      <div class="centered">${recipe.name}</div>
    </div>`
  })
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
