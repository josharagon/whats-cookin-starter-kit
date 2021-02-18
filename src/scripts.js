let allRecipes = {}
let currentUser = {}
const nav = document.querySelector('#nav');
const main = document.querySelector('#main')
const greeting = document.querySelector('#welcome')
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
userKitchen.addEventListener('click', mainPress)
recipeChart.addEventListener('click', mainPress)
recipeCard.addEventListener('click', cardPress)
window.addEventListener('load', instantiate)

function instantiate() {
  instantiateRecipeRepository();
  getRandomUser();
  showRecipeImages(recipeChart, allRecipes.recipes);
}

function instantiateRecipeRepository() {
  const recipes = recipeData.map(recipe => {
    var recipe = new Recipe(recipe)
    return recipe;
  })
  allRecipes = new RecipeRepository(recipes)
}

function getRandomUser() {
  currentUser = new User (usersData[Math.floor(Math.random()*Math.floor(usersData.length))])
  console.log(currentUser)
  welcome.innerText = `Welcome Back, ${currentUser.name}!`
}


function showRecipeImages(destination, recipes) {
  destination.innerHTML = '';
  recipes.forEach(recipe => {
    destination.innerHTML += `<div class="recipe-image" id=${recipe.id}>
      <img src=${recipe.image} alt=${recipe.name}>
      <p class="favorite">${recipe.favorited}</p>
      <p class="centered" >${recipe.name}</p>
    </div>`
  })
}

function navPress() {
  if (event.target.id === 'whatsCookin') {
    showKitchen()

  } else if (event.target.id === 'searchBar' && !userKitchen.classList.contains('collapsed')) {
    updateRecipeImages(currentUser, 'savedRecipes', userKitchen.children[0].children[1])
  } else if (event.target.id === 'searchBar') {
    updateRecipeImages(allRecipes, 'recipes', recipeChart)
  }
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
  } else if (event.target.title === 'Favorite') {
    changeFavorite()
  } else if( event.target.id === 'saveRecipe') {
    changeSaved()
  }
}


function changeFavorite() {
  const list = [...recipeFront.childNodes]
  let fave = list.find(child => child.title == "Favorite")
  let thisRecipe = allRecipes.recipes.find(recipe => fave.id == recipe.id)
  if (fave.innerText === '☆') {
    thisRecipe.favorited = '★'
    currentUser.addRecipe('favorites', thisRecipe);
    fave.innerText = '★'
    console.log(this)
  } else {
    thisRecipe.favorited = '☆'
    currentUser.removeRecipe('favorites', fave.id);
    fave.innerHTML = '☆'
  }
  updateAllRecipes();
}

function changeSaved() {
  const list = [...recipeFront.childNodes]
  let fave = list.find(child => child.title == "Favorite")
  let thisRecipe = allRecipes.recipes.find(recipe => fave.id == recipe.id)
  console.log(thisRecipe)
  if (!currentUser.savedRecipes.includes(thisRecipe)) {
    currentUser.addRecipe('savedRecipes', thisRecipe);
  }
  updateAllRecipes();
}

function updateAllRecipes() {
  showRecipeImages(recipeChart, allRecipes.recipes);
  showRecipeImages(userKitchen.children[1].children[1], currentUser.favorites);
  showRecipeImages(userKitchen.children[0].children[1], currentUser.savedRecipes);
}

function showRecipe(recipe) {
  unhideRecipeCard()
  recipeFront.innerHTML += `<img src=${recipe.image} alt=${recipe.name}>
  <p class="favorite" id="${recipe.id}" title="Favorite">${recipe.favorited}</p>
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
    recipesBox.style.height = '40%';
  }
}

function updateRecipeImages(instance, searchIn, destination) {
  if (instance.filterRecipesViaName(searchIn, searchBar.value, destination).length === 0) {
    instance.filterRecipesViaTags(searchIn, searchBar.value.split(' '), destination);
  }
}
