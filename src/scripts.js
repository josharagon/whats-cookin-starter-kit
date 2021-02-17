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
const star = document.querySelector('#favoriteRecipe');

nav.addEventListener('click', navPress)
nav.addEventListener('keyup', navPress)
recipeChart.addEventListener('click', mainPress)
recipeCard.addEventListener('click', cardPress)
window.addEventListener('load', instantiate)

function instantiate() {
  instantiateRecipeRepository();
  showRecipeImages(allRecipes.recipes);
}

function instantiateRecipeRepository() {
  const recipes = recipeData.map(recipe => {
    var recipe = new Recipe(recipe)
    return recipe;
  })
  allRecipes = new RecipeRepository(recipes)
}

function checkFavorites(recipeID) {
  // let match = user.favorites.find(recipe => {
  //   if (recipe.id === recipeId) {
  //     return true;
  //   }
  // })
  // if (match) {
  //   return '★'
  // } else {
  //   return '☆'
  // }
  return '☆';
}

function showRecipeImages(recipes) {
  recipes.forEach(recipe => {
    recipeChart.innerHTML += `<div class="recipe-image" id=${recipe.id}>
      <img src=${recipe.image} alt=${recipe.name}>
      <p class="favorite">${checkFavorites(recipe.id)}</p>
      <p class="centered" >${recipe.name}</p>
    </div>`
  })
}

function navPress() {
  if (event.target.id === 'whatsCookin') {
    showKitchen()
    showFavorites()
    showRecipesToCook()
  } else if (event.target.id === 'searchBar') {
    updateRecipeImages()
  }
}

function showFavorites() {

}

function showRecipesToCook() {

}

function mainPress() {
  let click = event.target.parentNode.id;
  const card = allRecipes.recipes.find(recipe => recipe.id == click)
  if (card && recipeCard.classList.contains('hidden')) {
    showRecipe(card)
  }
}

function cardPress() {
  if (event.target.id === 'exitRecipe') {
    recipeFront.innerHTML = ''
    recipeBack.innerHTML = ''
    unhideRecipeCard()
    if (!recipeBack.classList.contains('hidden')) {
      recipeFront.classList.toggle('hidden')
      showInstructions()
    }
  } else if (event.target.id === 'flipRecipe') {
    showInstructions()
    recipeFront.classList.toggle('hidden')
  } else if (event.target.id === 'favoriteRecipe') {
    changeFavorite()
  }
}

function changeFavorite() {
  const list = [...recipeFront.childNodes]
  let fave = list.find(child => child.id === 'favoriteRecipe')
  if (fave.innerText === '☆') {
    // function to update user class
    // showRecipeImages(allRecipes.recipes)
    fave.innerText = '★'
  } else {
    fave.innerHTML = '☆'
  }
}

function showRecipe(recipe) {
  unhideRecipeCard()
  recipeFront.innerHTML += `<img src=${recipe.image} alt=${recipe.name}>
  <p class="favorite" id="favoriteRecipe">${checkFavorites(recipe.id)}</p>
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
