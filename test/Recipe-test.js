const chai = require('chai');
const expect = chai.expect;
//const recipeData = require('../data/recipes');
const testRecipes = require('./test-recipes');
const testIngredients = require('./test-ingredients')
const Recipe = require('../src/recipe');

describe('Recipe', function() {

  it('should be an instance of Recipe', function() {
    const recipe = new Recipe(testRecipes[0]);
    expect(recipe).to.be.an.instanceof(Recipe);
  })

  describe('Properties', function() {

    it('should have an id', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.id).to.deep.equal(testRecipes[0].id);
    })

    it('should have a name', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.name).to.deep.equal(testRecipes[0].name);
    })

    it('should have an image reference', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.image).to.deep.equal(testRecipes[0].image);
    })

    it('should have have an ingredients list', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.ingredients).to.deep.equal(testRecipes[0].ingredients);
    })

    it('should have instructions', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.instructions).to.deep.equal(testRecipes[0].instructions);
    })

    it('should have tags', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.tags).to.deep.equal(testRecipes[0].tags);
    })

    it('should have a list of ids', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.ingredientCodes).to.deep.equal([ 20081, 18372, 1123, 19335 ]);
    })
  })

  describe('Methods', function() {

    it('should return names of ingredients', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.returnIngredientNames(testIngredients)).to.deep.equal(["wheat flour", "bicarbonate of soda", "eggs", "sucrose"]);
    })

    it('should return the total cost of ingredients', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.returnTotalCost(testIngredients)).to.deep.equal(1.43);
    })

    it('should return recipe instructions in order', function() {
      const recipe = new Recipe(testRecipes[0]);
      expect(recipe.returnInstructions()).to.deep.equal(testRecipes[0].instructions);
    })

  })
})
