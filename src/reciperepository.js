  const filterRecipesViaName = require('../src/filter.js');
  const filterRecipesViaTags = require('../src/filter.js');

class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes
    this.filterRecipesViaTags = filterRecipesViaTags
    this.filterRecipesViaName = filterRecipesViaName
  }
}

module.exports = RecipeRepository;
