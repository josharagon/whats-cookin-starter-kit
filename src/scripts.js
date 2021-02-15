let allRecipes = {}
const nav = document.querySelector('#nav');
const main = document.querySelector('#main')
const userKitchen = document.querySelector('#userDropdown');
const recipeChart = document.querySelector('#recipes');
const recipesBox = document.querySelector('#recipesBox');
const recipeCard = document.querySelector('#recipeCard');
const recipeInfo = document.querySelector('#recipeInfo');
const instructions = document.querySelector('#instructions');
const searchBar = document.querySelector('.search-bar');

nav.addEventListener('click', navPress)
recipeChart.addEventListener('click', mainPress)
recipeCard.addEventListener('click', cardPress)
searchBar.addEventListener('keydown', updateRecipeImages);
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
    console.log(card)
    showRecipe(card)
  }
}

function cardPress() {
  console.log(event.target)
  if(event.target.id === 'exitRecipe') {
    recipeInfo.innerHTML = ''
    unhideRecipeCard()
  } else if (event.target.id === 'flipRecipe'){
    showInstructions()
    recipeInfo.classList.toggle('hidden')
  }
}

function showRecipe(recipe) {
  unhideRecipeCard()

  recipeInfo.innerHTML += `<img src=${recipe.image} alt=${recipe.name}>
  <h2 class="recipeTitle card-text">${recipe.name}</h2>
  <h3 class="cost card-text">Cost: $${recipe.returnTotalCost(ingredientsData)}</h3>
  <h4 class="cost card-text">Ingredients: ${recipe.returnIngredientNames(ingredientsData)}</h4>`
  // <ol class="hidden" id="instructions">
  // ${recipe.instructions.forEach(step => {
  //   return `<li>${step.instruction}</li>`
  // })}
  // </ol>`
}

function showInstructions(recipe) {
//  instructions.classList.toggle('hidden')
}

function unhideRecipeCard() {
  recipeCard.classList.toggle('hidden')
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

function updateRecipeImages() {
  allRecipes.filterRecipesViaName(searchBar.value);
  console.log(searchBar.value.split('  '))
  allRecipes.filterRecipesViaTags(searchBar.value.split('  '))
}
