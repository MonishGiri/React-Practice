import { useEffect, useState } from "react";

function useRecipeInfo(searchQuery) {
  const [data, setData] = useState([]);
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`;

  useEffect(() => {
    if (searchQuery) { // Only fetch if there's a search query
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setData(data.meals || []); // Ensure meals is an array
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  }, [searchQuery]); // Re-run effect when searchQuery changes

  return data;
}

export default useRecipeInfo;
