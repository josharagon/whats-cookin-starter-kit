let allRecipes = {}
const nav = document.querySelector('#nav');
const userKitchen = document.querySelector('#userDropdown');
const recipeChart = document.querySelector('#recipes');

nav.addEventListener('click', navPress)
window.addEventListener('load', instantiate)

function instantiate() {
  instantiateRecipeRepository();
  console.log(allRecipes)
  showRecipeImages();
}

function instantiateRecipeRepository() {
  const recipes = recipeData.map(recipe => {
    var recipe = new Recipe(recipe)
    return recipe;
  })
  allRecipes = new RecipeRepository(recipes)
}

function showRecipeImages() {
  allRecipes.recipes.forEach(recipe => {
    recipeChart.innerHTML += `<img src=${recipe.image} alt=${recipe.name}>`
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
  } else {
    userKitchen.style.maxHeight = '275px';
    userKitchen.style.height = '275px';
  }
}
