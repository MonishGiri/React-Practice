import { useState } from "react";
import useRecipeInfo from "../hooks/useRecipeInfo";

function RecipeCard({ name, category, imgSrc }) {
  const recipe = useRecipeInfo(name);
  const [clicked, setClicked] = useState(false);
  const [unqRecipe, setUnqRecipe] = useState('');
  const [ingredients, setIngredients] = useState('');

  const handleClick = () => {
    setClicked(!clicked);
    setUnqRecipe(recipe[0]?.strInstructions || '');
    let reqItems = '';
    for (let i = 1; i <= 20; i++) {
      let item = 'strIngredient' + i.toString();
      if (recipe[0]?.[item]) {
        reqItems += recipe[0][item] + ", ";
      }
    }
    setIngredients(reqItems.slice(0, -2)); // Remove the last comma and space
  };

  return (
    <>
      <div
        className={`${
          clicked
            ? 'fixed inset-0 z-50 bg-white dark:bg-gray-800 p-6 m-4 overflow-y-auto'
            : 'max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:transform hover:scale-105 transition-transform duration-300'
        }`}
        style={clicked ? { margin: 'auto', width: '80%', height: '80%' } : {}}
      >
        <a href="#" className="flex  flex items-center justify-center">
          <img 
            className={`rounded-t-lg ${clicked ? 'w-[30%] h-min object-cover ' : 'w-full h-64 object-cover'}`}
            src={imgSrc} 
            alt={name} 
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Category: {category}
          </p>
          {clicked ? (
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <span className="text-white">Ingredients: </span>{ingredients}<br /><br />
              <span className="text-white">Recipe: </span>{unqRecipe}
            </p>
          ) : (
            <button
              onClick={handleClick}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get Recipe
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          )}
        </div>
        {clicked && (
          <button
            onClick={handleClick}
            className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 rounded-full p-2"
          >
            Close
          </button>
        )}
      </div>
    </>
  );
}

export default RecipeCard;
