import { useState, useEffect } from 'react';

function useRandomRecipe() {
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Create an array of fetch promises
        const fetchPromises = Array.from({ length: 10 }, () =>
          fetch(apiUrl).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data
          })
        );

        // Wait for all fetch promises to resolve
        const data = await Promise.all(fetchPromises);

        // Extract meals from each response
        const meals = data.flatMap(item => item.meals);

        // Update the state with the combined meals
        setRandomRecipe(meals);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchRecipes();
  }, []);

  return { randomRecipe, loading }; // Return loading state along with recipes
}

export default useRandomRecipe;
