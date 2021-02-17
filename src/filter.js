function filterRecipesViaTags(searchedRecipes, tags) {
  recipeChart.innerHTML = ''
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
  showRecipeImages(recipeChart, search);
  return search
}

function filterRecipesViaName(searchedRecipes, itemName) {
  recipeChart.innerHTML = ''
  let search = this[searchedRecipes].filter(recipe =>
    recipe.returnIngredientNames(ingredientsData).join(', ').includes(itemName.toUpperCase()) ||
    recipe.name.toUpperCase().includes(itemName.toUpperCase()));
  recipeChart.innerHTML = ''
  showRecipeImages(recipeChart, search);
  const results = search.map(result => result.name);
  return results
}

module.exports = {
filterRecipesViaName,
filterRecipesViaTags
};
