
class Recipe {
  constructor(recipe) {
    this.id = recipe.id,
    this.name = recipe.name,
    this.ingredients = recipe.ingredients,
    this.instructions = recipe.instructions,
    this.tags = recipe.tags,
    this.image = recipe.image,
    this.ingredientCodes = recipe.ingredients.map((item) => {
      return item.id
    });
  }

  returnIngredientNames(ourIngredients)  {
    const names = ourIngredients.reduce((ingredientNames, item) => {
      if (this.ingredientCodes.includes(item.id)) {
        ingredientNames.push(item.name.toUpperCase());
      }
      return ingredientNames;
    }, [])
    return names
  }

  returnTotalCost(ourIngredients) {
    const ingredientCosts = this.ingredients.reduce((totalCost, recipeIng) => {
      let ingQuant = ourIngredients.reduce((ingTotal, ing) => {
        if (recipeIng.id === ing.id) {
          ingTotal += (recipeIng.quantity.amount * ing.estimatedCostInCents)
        }
        return ingTotal
      }, 0)
      totalCost += ingQuant /1000
      return totalCost
    }, 0)
    return Math.round(100*ingredientCosts)/100;
  }

  returnInstructions() {
    let stringInstructions = ' '
    this.instructions.forEach(instruction => {
      stringInstructions += `${instruction.number}. ${instruction.instruction} </br> </br>`
    });
    return stringInstructions;
  }

  returnIngredients() {
    let stringIngredients = ' '
    this.ingredients.forEach(ingredient => {
      let ingName;
      ingredientsData.forEach(searchIngredient => {
        if (ingredient.id === searchIngredient.id) {
          ingName = searchIngredient.name;
        }
      })
      stringIngredients += `${ingredient.quantity.amount} ${ingredient.quantity.unit} ${ingName} </br> </br>`
    });
    return stringIngredients;
  }
}



module.exports = Recipe;
