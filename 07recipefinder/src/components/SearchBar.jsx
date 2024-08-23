import { useState, useEffect } from "react";
import useRecipeInfo from "../hooks/useRecipeInfo";

function SearchBar({ getSearchState, handleRecipeData }) {
  const [query, setQuery] = useState(''); // User's input
  const [searchQuery, setSearchQuery] = useState(''); // Actual search query to trigger the hook
  const [searchState, setSearchState] = useState(false);
  const recipe = useRecipeInfo(searchQuery); // Call the hook with the current search query

  const handleSearch = () => {
    setSearchState(true);
    setSearchQuery(query); // Update searchQuery state, triggering the useRecipeInfo hook
    getSearchState(true);
  };

  useEffect(() => {
    if (recipe.length > 0) {
      handleRecipeData(recipe); // Only call when recipe data is updated
    } else if (searchState) {
      handleRecipeData([]); // Clear recipe data if no results
    }
  }, [recipe, handleRecipeData, searchState]);

  return (
    <div className="w-80 mx-auto mt-4" id="searchForm">   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          id="default-search" 
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Search Recipes..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update input value
          required 
        />
        <button 
          onClick={handleSearch}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </button>
      </div>

      {/* Display the recipe info if available */}
      {searchState && recipe.length === 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Working on it.. Try something else</h3>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
