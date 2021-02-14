function filterRecipesViaTags(tags) {
  const search =  this.recipes.reduce((recipes, recipe) => {
    let count = 0;
    tags.forEach(tag => {
      if (recipe.tags.includes(tag)) {
        count += 1;
      }
    })
    if (count === tags.length) {
      recipes.push(recipe)
    }
    return recipes
  }, [])
  showRecipeImages(search);
  return search 
};


function filterRecipesViaName(itemName) {
  let search = this.recipes.filter(recipe =>
    recipe.returnIngredientNames(ingredientsData).join(', ').includes(itemName.toUpperCase()) ||
    recipe.name.toUpperCase().includes(itemName.toUpperCase()));
    recipeChart.innerHTML = ''
    showRecipeImages(search);
    const results = search.map(result => result.name);
    return results
};