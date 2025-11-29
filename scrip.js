let recipes = [];

// Cached DOM elements
const recipeForm = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipeList");
const filterCuisine = document.getElementById("filterCuisine");
const searchTitle = document.getElementById("searchTitle");
const searchIngredients = document.getElementById("searchIngredients");
const cancelEdit = document.getElementById("cancelEdit");
const clearFilters = document.getElementById("clearFilters");

const fieldId = document.getElementById("recipeId");
const fieldTitle = document.getElementById("title");
const fieldImage = document.getElementById("Image");
const fieldIngredients = document.getElementById("ingredients");
const fieldInstructions = document.getElementById("instructions");
const fieldCuisine = document.getElementById("cuisine");


function loadRecipes() {
  const saved = localStorage.getItem("recipes");
  recipes = saved ? JSON.parse(saved) : [];
}

function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

function addRecipe(event) {
  event.preventDefault();

  const id = fieldId.value;
  const title = fieldTitle.value.trim();
  const image = fieldImage.value.trim();
  const ingredients = fieldIngredients.value.trim();
  const instructions = fieldInstructions.value.trim();
  const cuisine = fieldCuisine.value.trim();

  if (!title || !ingredients) {
    alert("Title and Ingredients are required.");
    return;
  }

  if (id) {
    // Editing existing recipe
    const index = recipes.findIndex(r => r.id === id);
    if (index !== -1) {
      recipes[index] = {
        id,
        title,
        Image: image,
        ingredients,
        instructions,
        cuisine
      };
    }
  } else {
    // Adding a new recipe
    recipes.push({
      id: Date.now().toString(),
      title,
      Image: image,
      ingredients,
      instructions,
      cuisine
    });
  }

  saveRecipes();
  displayRecipes();
  recipeForm.reset();
  fieldId.value = "";
  cancelEdit.classList.add("hidden");
}



function editRecipe(id) {
  const recipe = recipes.find(r => r.id === id);
  if (!recipe) return;

  fieldId.value = recipe.id;
  fieldTitle.value = recipe.title;
  fieldImage.value = recipe.Image;
  fieldIngredients.value = recipe.ingredients;
  fieldInstructions.value = recipe.instructions;
  fieldCuisine.value = recipe.cuisine;

  cancelEdit.classList.remove("hidden");
}

function deleteRecipe(id) {
  if (!confirm("Delete this recipe?")) return;

  recipes = recipes.filter(r => r.id !== id);
  saveRecipes();
  displayRecipes();
}

function populateCuisineFilter() {
  const uniqueCuisines = [
    ...new Set(recipes.map(r => r.cuisine).filter(Boolean))
  ];

  filterCuisine.innerHTML =
    `<option value="">All Cuisines</option>` +
    uniqueCuisines.map(c => `<option value="${c}">${c}</option>`).join("");
}

function displayRecipes() {
  let list = [...recipes];

  // Apply title filter
  const titleVal = searchTitle.value.trim().toLowerCase();
  if (titleVal) list = list.filter(r => r.title.toLowerCase().includes(titleVal));

  // Apply ingredient filter
  const ingVal = searchIngredients.value.trim().toLowerCase();
  if (ingVal) list = list.filter(r => r.ingredients.toLowerCase().includes(ingVal));

  // Apply cuisine filter
  const cuisineVal = filterCuisine.value;
  if (cuisineVal) list = list.filter(r => r.cuisine === cuisineVal);

  populateCuisineFilter(); // update dropdown options
  filterCuisine.value = cuisineVal; // keep current selection

  recipeList.innerHTML = list.length
    ? list
        .map(
          r => `
      <div class="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
        
        <div class="flex-1 space-y-3">
          <h2 class="text-2xl font-bold text-green-700">${r.title}</h2>

          <img src="${r.Image}" 
               class="w-full h-48 object-cover rounded"
               alt="${r.title}">

          <div class="text-gray-700">
            <p><strong>Ingredients:</strong> ${r.ingredients}</p>
            <p><strong>Instructions:</strong> ${r.instructions || "-"}</p>
            <p><strong>Cuisine:</strong> ${r.cuisine || "-"}</p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row md:space-x-3 space-y-2 md:space-y-0">
          <button onclick="editRecipe('${r.id}')"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit
          </button>

          <button onclick="deleteRecipe('${r.id}')"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    `
        )
        .join("")
    : `<p class="text-center text-gray-500">No recipes found.</p>`;
}


recipeForm.addEventListener("submit", addRecipe);

cancelEdit.addEventListener("click", () => {
  recipeForm.reset();
  fieldId.value = "";
  cancelEdit.classList.add("hidden");
});

searchTitle.addEventListener("input", displayRecipes);
searchIngredients.addEventListener("input", displayRecipes);
filterCuisine.addEventListener("change", displayRecipes);

clearFilters.addEventListener("click", () => {
  searchTitle.value = "";
  searchIngredients.value = "";
  filterCuisine.value = "";
  displayRecipes();
});

// Expose functions to HTML
window.editRecipe = editRecipe;
window.deleteRecipe = deleteRecipe;


loadRecipes();
displayRecipes();
