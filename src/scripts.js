let allRecipes = {}
const nav = document.querySelector('#nav');
const main = document.querySelector('#main')
const userKitchen = document.querySelector('#userDropdown');
const recipeChart = document.querySelector('#recipes');
const recipesBox = document.querySelector('#recipesBox');
const recipeCard = document.querySelector('#recipeCard');
const recipeFront = document.querySelector('#recipeFront');
const recipeBack = document.querySelector('#recipeBack')
const instructions = document.querySelector('#instructions');

nav.addEventListener('click', navPress)
nav.addEventListener('keyup', navPress)
recipeChart.addEventListener('click', mainPress)
recipeCard.addEventListener('click', cardPress)
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
  console.log(event.target.id)
  if (event.target.id === 'whatsCookin') {
    showKitchen()
  } else if (event.target.id === 'searchBar') {
    updateRecipeImages()
  }
}

function mainPress() {
  let click = event.target.id;
  const card = allRecipes.recipes.find(recipe => recipe.id == click)
  if (card) {
    showRecipe(card)
  }
}

function cardPress() {
  if (event.target.id === 'exitRecipe') {
    recipeFront.innerHTML = ''
    recipeBack.innerHTML = ''
    unhideRecipeCard()
    if(!recipeBack.classList.contains('hidden')){
      recipeFront.classList.toggle('hidden')
      showInstructions()
    }
  } else if (event.target.id === 'flipRecipe') {
    showInstructions()
    recipeFront.classList.toggle('hidden')
  }
}

function showRecipe(recipe) {
  unhideRecipeCard()
  console.log(recipeFront)
  recipeFront.innerHTML += `<img src=${recipe.image} alt=${recipe.name}>
  <h2 class="recipeTitle card-text">${recipe.name}</h2>
  <h3 class="cost card-text">Cost: $${recipe.returnTotalCost(ingredientsData)}</h3>
  <h4 class="cost card-text"><u>Ingredients:</u> </br> ${recipe.returnIngredients()}</h4>`
  recipeBack.innerHTML += `<p class="instruction-text"> ${recipe.returnInstructions()} </p>`
}

function showInstructions(recipe) {
  recipeBack.classList.toggle('hidden')
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
  if (allRecipes.filterRecipesViaName('recipes', searchBar.value).length === 0) {
    allRecipes.filterRecipesViaTags('recipes', searchBar.value.split(' '));
  }
}
