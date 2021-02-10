const chai = require('chai');
const expect = chai.expect;

const RecipeRepository = require('../src/reciperepository');
const Recipe = require('../src/recipe');
const testRecipes = require('./test-recipes');
const ingredientList = require('./test-ingredients')
const testIngredients = require('./test-ingredients');
const testRecipeArr = [];
const recipeClasses = testRecipes.forEach(recipe => testRecipeArr.push(new Recipe(recipe)));

describe('RecipeRepository', function() {

  describe('Properties', function() {

    it('should contain a list of recipes', function() {
      const recipeRepo = new RecipeRepository(testRecipeArr)
      expect(recipeRepo.recipes).to.deep.equal(testRecipeArr);
    })
  })

  describe('Methods', function() {

    it('should return a list of recipes filtered by tag', function() {
      const recipeRepo = new RecipeRepository(testRecipeArr)
      expect(recipeRepo.filterRecipesViaTags('testSingle')).to.deep.equal(
        ["Loaded Chocolate Chip Pudding Cookie Cups","Dirty Steve's Original Wing Sauce","Elvis Pancakes"])
    })

    it('should be able to filter via multiple tags', function() {
      const recipeRepo = new RecipeRepository(testRecipeArr)
      expect(recipeRepo.filterRecipesViaTags('testMultiple1', 'testMultiple2')).to.deep.equal(
        ["Loaded Chocolate Chip Pudding Cookie Cups", "3 Tag Search Test"])
    })

    it('should be able to filter via the recipe name', function(){
      const recipeRepo = new RecipeRepository(testRecipeArr)
      expect(recipeRepo.filterRecipesViaName('Name', ingredientList)).to.deep.equal(["Name Search Test"]);
      expect(recipeRepo.filterRecipesViaName('Pork', ingredientList)).to.deep.equal(["Maple Dijon Apple Cider Grilled Pork Chops"])
    })

    it('should be able to filter via the ingredient name', function(){
      const recipeRepo = new RecipeRepository(testRecipeArr)
      expect(recipeRepo.filterRecipesViaName('wheat flour', ingredientList)).to.deep.equal(["Loaded Chocolate Chip Pudding Cookie Cups", "Elvis Pancakes", "3 Tag Search Test"]);
    })

  })
})
