let recipes = [];
const recipeForm = document.getElementById("recipeForm");
const recipeList = document.getElementById("recipeList");
const filterCuisine = document.getElementById("filterCuisine");
const searchTitle = document.getElementById("searchTitle");
const searchIngredients = document.getElementById("searchIngredients");
const cancelEdit = document.getElementById("cancelEdit");
const clearFilters = document.getElementById("clearFilters");
// get data from lockalstorega
function loadRecipes() {
  const data = localStorage.getItem("recipes");
  recipes = data ? JSON.parse(data) : [];
}

// save date to sotrage
function saveRecipes() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}
// creat/edit/delete
function addRecipe(e) {
  e.preventDefault();
  const id = document.querySelector("#recipeId").value;
  const title = document.querySelector("#title").value.trim();
  const Image = document.querySelector("#Image").value.trim();
  const ingredients = document.querySelector("#ingredients").value.trim();
  const instructions = document.querySelector("#instructions").value.trim();
  const cuisine = document.querySelector("#cuisine").value.trim();
  if (!title || !ingredients) {
    alert("Title and ingredients are required.");
    return;
  }
  if (id) {
    const idx = recipes.findIndex((r) => r.id === id);
    if (idx !== -1) {
      recipes[idx] = { id, title, ingredients, instructions, cuisine };
    }
  } else {
    recipes.push({
      id: Date.now().toString(),
      Image,
      title,
      ingredients,
      instructions,
      cuisine,
    });
  }
  saveRecipes();
  displayRecipes();
  recipeForm.reset();
  document.querySelector("#recipeId").value = "";
  cancelEdit.classList.add("hidden");
}
 function editRecipe(id) {
      const recipe = recipes.find(r => r.id === id);
      if (!recipe) return;
      document.querySelector('#recipeId').value = recipe.id;
      document.querySelector('#title').value = recipe.title;
      document.querySelector('#Image').value = recipe.Image;
      document.querySelector('#ingredients').value = recipe.ingredients;
      document.querySelector('#instructions').value = recipe.instructions;
      document.querySelector('#cuisine').value = recipe.cuisine;
      cancelEdit.classList.remove('hidden');
    }
function deleteRecipe(id){
   if (!confirm('Delete this recipe?')) return;
    recipes = recipes.filter(r => r.id !== id);
      saveRecipes();
      displayRecipes();
}
// rendaring page
  function displayRecipes() {
    // filter
     let filtered = [...recipes];
     const titleValue = searchTitle.value.trim().toLowerCase();
      const ingValue = searchIngredients.value.trim().toLowerCase();
      const cuisineValue = filterCuisine.value;
        if (titleValue) {
        filtered = filtered.filter(r => r.title.toLowerCase().includes(titleValue));
      }
      if (ingValue) {
        filtered = filtered.filter(r => r.ingredients.toLowerCase().includes(ingValue));
      }
      if (cuisineValue) {
        filtered = filtered.filter(r => r.cuisine === cuisineValue);
      }
      // cuisine options
      const cuisines = [...new Set(recipes.map(r => r.cuisine).filter(Boolean))];
      filterCuisine.innerHTML = `<option value="">All Cuisines</option>` +
        cuisines.map(c => `<option value="${c}">${c}</option>`).join('');
      filterCuisine.value = cuisineValue;

      // render recipes
      recipeList.innerHTML = filtered.length ? filtered.map(r =>
      `<div class="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      
      <!-- Left section -->
      <div class="flex-1 space-y-3">
          <h2 class="text-2xl font-bold text-green-700">${r.title}</h2>

          <img 
            src="${r.Image}" 
            alt="${r.title}" 
            class="w-full h-48 object-cover rounded"
          />

          <div class="text-gray-700">
              <p><span class="font-semibold">Ingredients:</span> ${r.ingredients}</p>
              <p><span class="font-semibold">Instructions:</span> ${r.instructions || '-'}</p>
              <p class="text-sm text-gray-500">
                  <span class="font-semibold">Cuisine:</span> ${r.cuisine || '-'}
              </p>
          </div>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
          <button 
            onclick="editRecipe('${r.id}')"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Edit
          </button>

          <button 
            onclick="deleteRecipe('${r.id}')"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Delete
          </button>
      </div>

  </div>
`).join('')  : `<div class="text-center text-gray-500">No recipes found.</div>`
    }

    //event Listeners
    recipeForm.addEventListener('submit', addRecipe);
    cancelEdit.addEventListener('click', () => {
      recipeForm.reset();
      document.getElementById('recipeId').value = '';
      cancelEdit.classList.add('hidden');
    });
    searchTitle.addEventListener('input', displayRecipes);
    searchIngredients.addEventListener('input', displayRecipes);
    filterCuisine.addEventListener('change', displayRecipes);
    clearFilters.addEventListener('click', () => {
      searchTitle.value = '';
      searchIngredients.value = '';
      filterCuisine.value = '';
      displayRecipes();
    });

    window.editRecipe = editRecipe;
    window.deleteRecipe = deleteRecipe;

  
    loadRecipes();
    displayRecipes();









