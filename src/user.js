const filterRecipesViaName = require('../src/filter.js');
const filterRecipesViaTags = require('../src/filter.js');

class User {
  constructor(user) {
    this.name = user.name,
    this.id = user.id,
    this.pantry = user.pantry,
    this.favorites = [],
    this.savedRecipes = [],
    this.filterRecipesViaTags = filterRecipesViaTags,
    this.filterRecipesViaName = filterRecipesViaName
  }

  addRecipe(saveToHere, recipeRepo, recipeID) {
    let ourRecipes = recipeRepo.recipes
    let thisRecipe = ourRecipes.find(recipe => recipe.id === recipeID)
    this[saveToHere].push(thisRecipe)
  }

  removeRecipe(removeFromHere, recipeID) {
    let count = 0;
    this[removeFromHere].forEach(recipe => {
      if (recipe.id === recipeID) {
        this[removeFromHere].splice(count, 1)
        return;
      }
      count++
    })
  }



}

module.exports = User;
