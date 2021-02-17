
class User {
  constructor(user) {
    this.name = user.name,
    this.id = user.id,
    this.pantry = user.pantry,
    this.favorites = [],
    this.savedRecipes = []
  }

  addRecipe(saveToHere, recipeRepo, recipeID) {
    let ourRecipes = recipeRepo.recipes
    let thisRecipe = ourRecipes.find(recipe => recipe.id == recipeID)
    this[saveToHere].push(thisRecipe)
  }

  removeRecipe(removeFromHere, recipeID) {
    let count = 0;
    this[removeFromHere].forEach(recipe => {
      if (recipe.id == recipeID) {
        this[removeFromHere].splice(count, 1)
        return;
      }
      count++
    })
  }

  filterFavoritesViaTags(searchedRecipes, tags) {
    const search =  this[searchedRecipes].reduce((recipes, recipe) => {
      let count = 0;
      tags.forEach(tag => {
        if (recipe.tags.join(', ').includes(tag)) {
          count += 1;
        }
      })
      if (count === tags.length) {
        recipes.push(recipe)
      }
      return recipes
    }, [])
    if (!search.length) {
      search.push({
        id: 'none',
        name: 'No Recipes Found',
        image: './images/PenguinChef.png'
      })
    }
    return search
  }

  filterFavoritesViaName(searchedRecipes, itemName, ingredientList) {
    let search = this[searchedRecipes].filter(recipe =>
      recipe.returnIngredientNames(ingredientList).join(', ').includes(itemName.toUpperCase()) ||
      recipe.name.toUpperCase().includes(itemName.toUpperCase()));
    const results = search.map(result => result.name);
    return results
  }

}

module.exports = User;
