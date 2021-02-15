class RecipeRepository {
  constructor(recipes) {
    this.recipes = recipes
    this.filterRecipesViaTags = filterRecipesViaTags
    this.filterRecipesViaName = filterRecipesViaName
  }
}



module.exports = RecipeRepository;
