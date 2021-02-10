class RecipeRepository {
    constructor(recipes) {
        this.recipes = recipes

    }
    filterRecipesViaTags(tag, tag2) {
       const search =  this.recipes.filter(recipe => recipe.tags.includes(tag, tag2))
       const results = search.map(result => result.name)
       return results
    }
    filterRecipesViaName(input, ourIngredients) {
        const search = this.recipes.filter(recipe => recipe.returnIngredientNames(ourIngredients).includes(input) || recipe.name.includes(input));
        const results = search.map(result => result.name);
        return results    
    }
}



module.exports = RecipeRepository;