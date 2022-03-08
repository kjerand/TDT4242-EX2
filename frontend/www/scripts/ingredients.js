async function fetchIngredients(request) {
    let response = await sendRequest("GET", `${HOST}/api/ingredients/`);

    if (response.ok) {
        let data = await response.json();

        let ingredients = data.results;
        let container = document.getElementById('div-content');
        let ingredientTemplate = document.querySelector("#template-ingredient");

        console.log(ingredients)
        
        ingredients.forEach(ingredient => {
            const ingredientAnchor = ingredientTemplate.content.firstElementChild.cloneNode(true);

            const h5 = ingredientAnchor.querySelector("h5");
            h5.textContent = ingredient.name;

            const p = ingredientAnchor.querySelector("p");
            p.textContent = "Calories: " +ingredient.calories+ " kcal, Carbohydrates: " + ingredient.carbohydrates + "g, Fat: " + ingredient.fat + "g, Protein: " + ingredient.protein +"g";   

            container.appendChild(ingredientAnchor);
        });
    }

    return response;
}

function createExercise() {
    window.location.replace("ingredient.html");
}

window.addEventListener("DOMContentLoaded", async () => {
    let createButton = document.querySelector("#btn-create-ingredient");
    createButton.addEventListener("click", createExercise);

    let response = await fetchIngredients();
    
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not retrieve types!", data);
        document.body.prepend(alert);
    }
});
