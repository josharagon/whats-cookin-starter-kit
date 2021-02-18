
class User {
  constructor(user) {
    this.name = user.name,
    this.id = user.id,
    this.pantry = user.pantry,
    this.favorites = [],
    this.savedRecipes = []
  }

  addRecipe(saveToHere, recipe) {
    this[saveToHere].push(recipe)
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

  filterRecipesViaTags(searchedRecipes, tags, destination) {
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
    showRecipeImages(destination, search);
    return search
  }

  filterRecipesViaName(searchedRecipes, itemName, destination) {
    let search = this[searchedRecipes].filter(recipe =>
      recipe.returnIngredientNames(ingredientsData).join(', ').includes(itemName.toUpperCase()) ||
      recipe.name.toUpperCase().includes(itemName.toUpperCase()));
    const results = search.map(result => result.name);
    showRecipeImages(destination, search);
    return results
  }

}

module.exports = User;
