const chai = require('chai');
const expect = chai.expect;
const testUser = require('./test-user');
const testRecipes = require('./test-recipes')
const Recipe = require('../src/recipe');
const RecipeRepository = require('../src/reciperepository')
const User = require('../src/user');
const ingredientsData = require('../data/ingredients')
describe('User', function() {
  let newUser;

  beforeEach(function() {
    newUser = new User(testUser[0])
  });

  it('should be an instance of Recipe', function() {
    const user = new User(testUser[0])
    expect(user).to.be.an.instanceof(User);
  })

  describe('Properties', function() {

    it('should have a name', function() {
      expect(newUser.name).to.equal("Saige O'Kon")
    })

    it('should have an id', function() {
      expect(newUser.id).to.equal(1)
    })

    it('should hold and pantry of ingredients', function() {
      expect(newUser.pantry.length).to.equal(4)
    })

    it('should hold favorite recipes', function() {
      expect(newUser.favorites).to.deep.equal([]);
    })

    it('should contain recipes to cook later', function() {
      expect(newUser.savedRecipes).to.deep.equal([]);
    })
  })

  describe('Methods', function() {
    let allRecipes = new RecipeRepository(testRecipes.map(recipe => {
      return new Recipe(recipe)
    }))
    
     it('should be able to add favorite recipes', function() {
       newUser.addRecipe('favorites', allRecipes, 595736);
       expect(newUser.favorites).to.deep.equal([allRecipes.recipes[0]])
     })

     it('should be able to remove favorite recipes', function() {
       newUser.addRecipe('favorites',allRecipes, 595736);
       newUser.removeRecipe('favorites', 595736)
       expect(newUser.favorites).to.deep.equal([])
     })

     it('should be able to add a recipe to a list of recipes to cook', function() {
       newUser.addRecipe('savedRecipes',allRecipes, 595736);
       expect(newUser.savedRecipes).to.deep.equal([allRecipes.recipes[0]])
     })

     it('should be able to remove a recipe to a list of recipes to cook', function() {
       newUser.addRecipe('savedRecipes',allRecipes, 595736);
       newUser.addRecipe('savedRecipes',allRecipes, 678353);
       newUser.removeRecipe('savedRecipes',678353)
       expect(newUser.savedRecipes).to.deep.equal([allRecipes.recipes[0]])
     })

     it('should be able to filter favorited recipes by one or more tags', function() {
       newUser.addRecipe('favorites',allRecipes,595736)
       newUser.addRecipe('favorites',allRecipes,678353)
       expect(newUser.filterFavoritesViaTags('favorites', ['testMultiple1', 'testMultiple2'])[0]).to.equal(
         allRecipes.recipes[0])
     })

     it('should be able to search saved recipes by name or ingredients', function() {
       newUser.addRecipe('savedRecipes',allRecipes,595736)
       newUser.addRecipe('savedRecipes',allRecipes,678353)
       newUser.addRecipe('savedRecipes',allRecipes,741603)
       expect(newUser.filterFavoritesViaName('savedRecipes', 'Dijon', ingredientsData)).to.deep.equal([allRecipes.recipes[0].name, allRecipes.recipes[1].name])
     })
  })
})
