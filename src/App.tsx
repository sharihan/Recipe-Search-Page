import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // for holding the recipes fetched from API
  const [recipes, setRecipes] = useState([]);
  // State for holding search criteria
  const [searchName, setSearchName] = useState("");
  const [searchDifficulty, setSearchDifficulty] = useState("");
  // searchTime of "All" will return all recipes (default)
  const [searchTime, setSearchTime] = useState("All");
  // State for holding the filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from API
    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  const handleSearch = (e) => {
    // Prevent the form from submitting and refreshing the page
    e.preventDefault();

    setFilteredRecipes(
      recipes
        .filter((recipe) => {
          // calculate total time for each recipe rather than individually
          const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
          // convert to lowercase for case-insensitive search
          const matchesName =
            searchName === "" ||
            recipe.name.toLowerCase().includes(searchName.toLowerCase());
          const matchesDifficulty =
            searchDifficulty === "Any" ||
            recipe.difficulty.toLowerCase() === searchDifficulty.toLowerCase();
          let matchesTime = true; // Assume true for 'All' times by default.

          if (searchTime === "Less than 15") {
            matchesTime = totalTime < 15;
          } else if (searchTime === "15-30") {
            matchesTime = totalTime >= 15 && totalTime <= 30;
          } else if (searchTime === "More than 30") {
            matchesTime = totalTime > 30;
          }
          // only return recipes that match all the criteria
          return matchesName && matchesDifficulty && matchesTime;
        })
        .slice(0, 8) // Take the first 8 recipes that match the filters
    );
  };

  return (
    <div>
      <h1>Recipe Search Page</h1>
      {/* Used form element to enable submission on enter key  */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for your recipe"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        {/* Total Time Drop Down */}
        <select
          value={searchTime}
          onChange={(e) => setSearchTime(e.target.value)}
        >
          <option value="All">Total Time to Cook</option>
          <option value="Less than 15">Less than 15 minutes</option>
          <option value="15-30">15-30 minutes</option>
          <option value="More than 30">More than 30 minutes</option>
        </select>
        {/* Difficulty drop down */}
        <select
          value={searchDifficulty}
          onChange={(e) => setSearchDifficulty(e.target.value)}
        >
          <option value="">Difficulty</option>
          <option value="Any">Any</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div className="RecipesGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {/* Only show filtered recipes */}
        {filteredRecipes.map((recipe, index) => (
          // Use the recipe id as the key to avoid the warning
          <div className="RecipeCard" key={recipe.id}>
             <img
              src={recipe.image}
              alt={recipe.name}
              // Make the first image larger
              width={index == 0 ? 250 : 100}
              height={index == 0 ? 150 : 75}
            />
            <h3>{recipe.name}</h3>
            <div className="RecipeInfo">
              <p>Difficulty: {recipe.difficulty}</p></div>
              <div>
              <span className="PrepTime">
                Prep Time: {recipe.prepTimeMinutes} mins
              </span>
              <span className="CookTime">
                Cook Time: {recipe.cookTimeMinutes} mins
              </span>
            </div>
          </div>
        ))}
        {/* Handle edge cases */}
        {recipes.length === 0 && <p>Loading...</p>}
        {searchName && filteredRecipes.length === 0 && <p>No recipes found</p>}
      </div>
    </div>
  );
}

export default App;
