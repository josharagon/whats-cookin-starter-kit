const chai = require('chai');
const expect = chai.expect;
const testUser = require('./test-user');
const testRecipes = require('./test-recipes')
const Recipe = require('../src/recipe');
const RecipeRepository = require('../src/reciperepository')
const User = require('../src/user');

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
      expect(newUser.pantry.length()).to.equal(4)
    })

    it('should hold favorite recipes', function() {
      expect(newUser.favorites).to.deep.equal([]);
    })

    it('should contain recipes to cook later', function() {
      expect(newUser.savedRecipes).to.deep.equal([]);
    })
  })

  describe('Methods', function() {
    let userRecipes = new RecipeRepository(testRecipes.map(recipe => {
      return new Recipe(recipe)
    }))

     it('should be able to favorite/unfavorite recipes', function() {
       newUser.addToFavorites(595736);
       expect(newUser.favorites).to.deep.equal([userRecipes[0]])
     })

     it('should be able to add a recipe to a list of recipes to cook', function() {
       newUser.saveRecipe(595736);
       expect(newUser.savedRecipes).to.deep.equal([userRecipes[0]])
     })

     it('should be able to filter favorited recipes by one or more tags', function() {
       newUser.addToFavorites(595736)
       newUser.addToFavorites(678353)
       expect(newUser.filterFavoriteRecipesViaTags(['testMultiple1', 'testMultiple2'])).to.deep.equal(
         [testRecipes[0]])
     })

     it('should be able to search saved recipes by name or ingredients', function() {
       newUser.addToFavorites(595736)
       newUser.addToFavorites(678353)
       newUser.addToFavorites(741603)
       expect(newUser.searchSavedRecipesViaName(['Dijon'])).to.deep.equal([userRecipes[0], userRecipes[1]])
     })
  })
})
