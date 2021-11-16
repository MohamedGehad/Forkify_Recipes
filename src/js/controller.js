import * as model from './model.js'
import recipeView from './views/recipeView.js';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import { async } from 'regenerator-runtime';


// if (module.hot){
//   module.hot.accept();
// }


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function() {
  try{
    const id = window.location.hash.slice(1);
      // console.log(id);

    if(!id) return;
    recipeView.renderSpiner();
    
    //loding respice    
      await model.loadRecipe(id);
      // const {recipe}=model.state;

      //rendaing respice
      recipeView.render(model.state.recipe);
      


    }catch (err){
      recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try {
    recipeView.renderSpiner();

    //1 )  get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) load search result
    await model.loadSearchResults(query); //////'pizza'


    /// 3) render results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultspage());

    //4)  render intial pagination buttons
    paginationView.render(model.state.search);

  } catch (err){
    console.log(err);
  }
}

    const controlPagintaion = function(goToPage) {

    /// 1) render new results
    // console.log(model.state.search.results);
    resultsView.render(model.getSearchResultspage(goToPage));

    //2)  render new pagination buttons
    paginationView.render(model.state.search);
}


const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagintaion)
};

init();


