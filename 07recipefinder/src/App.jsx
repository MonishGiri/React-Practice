import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";
import useRandomRecipe from "./hooks/useRandomRecipe";

function App() {
  const { randomRecipe, loading } = useRandomRecipe();
  const [recipedata, setRecipeData] = useState([]);
  const [searchState, setSearchState] = useState(false);

  useEffect(() => {
    if (!searchState) {
      setRecipeData(randomRecipe);
    }
  }, [randomRecipe, searchState]);

  function getSearchState(state) {
    console.log("Before recipe data: "+recipedata);
    setSearchState(state);
  }

  function handleRecipeData(data){
    setRecipeData(data);
    console.log("Recipe data" + recipedata);
  } 

  return (
    <div>
      {/* Sticky Navbar */}
      <Navbar companyName='RecipeFinder' />

      {/* Main content area */}
      <div className="pt-20 px-4">
        {/* Search Bar */}
        <SearchBar getSearchState={getSearchState} handleRecipeData={handleRecipeData} />
 
        {/* Display loading spinner or message while loading */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="text-white text-lg">Loading...</span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center p-3 m-2">
            {recipedata.map((item, index) => (
              <RecipeCard
                key={(item.idMeal) + index} // Add a unique key for each card
                name={item.strMeal}
                category={item.strCategory}
                imgSrc={item.strMealThumb}
                randomRecipe={randomRecipe}
              />
            ))}
          </div>
        )}
        <div className="mt-6">
          {/* Your additional content goes here */}
        </div>
      </div>
    </div>
  );
}

export default App;
