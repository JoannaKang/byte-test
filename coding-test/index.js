const fetch = require('node-fetch');

async function getDataFromApi () {
  const dataFromApi = await fetch('http://www.recipepuppy.com/api/')
  const result = await dataFromApi.json();
  return result;
}

function filterRecipe (inputIngredients) {  
  const result = [];
  getDataFromApi()
  .then(res => {
    const recipeArray = res.results
    recipeArray.map(recipe => {
      const ingredientsStirng = recipe.ingredients
      let parsedArray = ingredientsStirng.split(',')
      parsedArray = parsedArray.map(ingredientStr => {
        return ingredientStr.trim().toLowerCase();
      })
      inputIngredients.forEach((inputIngredient)=> {
        const parsedArgument = inputIngredient.trim().toLowerCase();
        if(parsedArray.includes(parsedArgument)) {
          result.push(recipe)
        }
      })
      return result;
      })
  }) 
}

filterRecipe(['Barbecue sauce', 'Vanilla extract']);