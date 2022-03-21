let cancelMealButton;
let okMealButton;
let deleteMealButton;
let editMealButton;

async function retrieveMeal(id) {  
    let mealData = null;
    let response = await sendRequest("GET", `${HOST}/api/meals/${id}/`);
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not retrieve your meal data!", data);
        document.body.prepend(alert);
    } else {
        mealData = await response.json();
        let form = document.querySelector("#form-meal");
        let formData = new FormData(form);

        for (let key of formData.keys()) {
            let selector = `input[name="${key}"], textarea[name="${key}"]`;
            let input = form.querySelector(selector);
            let newVal = mealData[key];
            if (key == "date") {
                // Creating a valid datetime-local string with the correct local time
                let date = new Date(newVal);
                date = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000)).toISOString(); // get ISO format for local time
                newVal = date.substring(0, newVal.length - 1);    // remove Z (since this is a local time, not UTC)
            }
            if (key != "files") {
                input.value = newVal;
            }
        }

        let input = form.querySelector("select:disabled");
        // files
        let filesDiv = document.querySelector("#uploaded-files");
        for (let file of mealData.files) {
            let a = document.createElement("a");
            a.href = file.file;
            let pathArray = file.file.split("/");
            a.text = pathArray[pathArray.length - 1];
            a.className = "me-2";
            filesDiv.appendChild(a);
        }

        let divIngredients = document.getElementById("meal-ingredients");
        divIngredients.innerHTML = mealData.ingredients;

        let caloriesText = document.getElementById("calories");
        caloriesText.innerHTML = "Calories: " + mealData.calories + " kcal, carbs: " +mealData.carbohydrates+"g, fat: " +mealData.fat+"g, protein: " + mealData.protein+"g"
    }
    return mealData;     
}

function handleCancelDuringMealEdit() {
    location.reload();
}

function handleEditMealButtonClick() {
    
    setReadOnly(false, "#form-meal");
    document.querySelector("#inputOwner").readOnly = true;  // owner field should still be readonly 

    editMealButton.className += " hide"; // The edit button should be hidden when in edit mode
    okMealButton.className = okMealButton.className.replace(" hide", ""); // The ok button should not be hidden when in edit mode
    cancelMealButton.className = cancelMealButton.className.replace(" hide", ""); // See above
    deleteMealButton.className = deleteMealButton.className.replace(" hide", ""); // See above
    cancelMealButton.addEventListener("click", handleCancelDuringMealEdit);

}

async function deleteMeal(id) {
    let response = await sendRequest("DELETE", `${HOST}/api/meals/${id}/`);
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert(`Could not delete this meal. ID: ${id}!`, data);
        document.body.prepend(alert);
    } else {
        window.location.replace("meals.html");
    }
}

async function updateMeal(id) {
    let submitForm = generateMealForm();

    let response = await sendRequest("PUT", `${HOST}/api/meals/${id}/`, submitForm, "");
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not update your meal! :-( ", data);
        document.body.prepend(alert);
    } else {
        location.reload();
    }
}

function generateMealForm() {
    let form = document.querySelector("#form-meal");

    let formData = new FormData(form);
    let submitForm = new FormData();

    let weights = formData.getAll("weight");
    let e = formData.getAll("type");
    
    let cal = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;
    let ingredients = "";

    for (let i = 0; i < e.length; i++) {
        let macros = e[i].split(",")
        ingredients += macros[4] + ", "

        if (weights[i]) {
            cal += (parseFloat(weights[i]) / 100) * parseInt(macros[0])
            fat += (parseFloat(weights[i]) / 100) * parseInt(macros[1])
            protein += (parseFloat(weights[i]) / 100) * parseInt(macros[2])
            carbs += (parseFloat(weights[i]) / 100) * parseInt(macros[3])
        } 
    }

    submitForm.append("name", formData.get('name'));
    let date = new Date(formData.get('date')).toISOString();
    submitForm.append("date", date);
    submitForm.append("notes", formData.get("notes"));
    submitForm.append("calories", Math.round(cal));
    submitForm.append("fat", Math.round(fat));
    submitForm.append("protein", Math.round(protein));
    submitForm.append("carbohydrates", Math.round(carbs));
    submitForm.append("ingredients", ingredients);

    for(var pair of submitForm.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
     }

    // Adds the files
    for (let file of formData.getAll("files")) {
        submitForm.append("files", file);
    }
    return submitForm;
}

function generateMealFormCopy() {
    let form = document.querySelector("#form-meal");

    let formData = new FormData(form);
    let submitForm = new FormData();

    let info = document.getElementById('calories').innerText
    info = info.replaceAll('g', '')
    info = info.replaceAll(',', '')
    info = info.split(' ')
    
    let cal = parseInt(info[1]);
    let protein = parseInt(info[8]);
    let fat = parseInt(info[6]);
    let carbs = parseInt(info[4]);
    let ingredients = document.getElementById('meal-ingredients').innerHTML;

    submitForm.append("name", formData.get('name') + '-copy');
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    var time ="T"+ today.getHours() + ":" + today.getMinutes() 
    submitForm.append("date", date + time);
    submitForm.append("notes", formData.get("notes"));
    submitForm.append("calories", Math.round(cal));
    submitForm.append("fat", Math.round(fat));
    submitForm.append("protein", Math.round(protein));
    submitForm.append("carbohydrates", Math.round(carbs));
    submitForm.append("ingredients", ingredients);

    for(var pair of submitForm.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
     }

    // Adds the files
    for (let file of formData.getAll("files")) {
        submitForm.append("files", file);
    }
    return submitForm;
}

async function createMeal() {
    let submitForm = generateMealForm();

    let response = await sendRequest("POST", `${HOST}/api/meals/`, submitForm, "");

    if (response.ok) {
        window.location.replace("meals.html");
    } else {
        let data = await response.json();
        let alert = createAlert("Could not create new meal", data);
        document.body.prepend(alert);
    }
}

async function copyMeal() {
    let submitForm = generateMealFormCopy();

    let response = await sendRequest("POST", `${HOST}/api/meals/`, submitForm, "");

    if (response.ok) {
        window.location.replace("meals.html");
    } else {
        let data = await response.json();
        let alert = createAlert("Could not create new meal", data);
        document.body.prepend(alert);
    }
}


function handleCancelDuringMealCreate() {
    window.location.replace("meals.html");
}


async function createBlankIngredient() {
    let form = document.querySelector("#form-meal");

    let ingredientResponse = await sendRequest("GET", `${HOST}/api/ingredients/`);
    let ingredientTypes = await ingredientResponse.json();

    let ingredientTemplate = document.querySelector("#template-ingredient");
    let divIngredientContainer = ingredientTemplate.content.firstElementChild.cloneNode(true);
    let ingredientTypeSelect = divIngredientContainer.querySelector("select");
    
    for (let i = 0; i < ingredientTypes.count; i++) {
        let option = document.createElement("option");
        option.value = [ingredientTypes.results[i].calories, ingredientTypes.results[i].fat, ingredientTypes.results[i].protein, ingredientTypes.results[i].carbohydrates, ingredientTypes.results[i].name];
        option.innerText = ingredientTypes.results[i].name;
        ingredientTypeSelect.append(option);
    }

    let currentIngredientType = ingredientTypes.results[0];
    ingredientTypeSelect.value = currentIngredientType.name;
    
    let divIngredients = document.querySelector("#ingredients");
    divIngredients.appendChild(divIngredientContainer);
}

function removeIngredient(event) {
    let divExerciseContainers = document.querySelectorAll(".div-ingredient-container");
    if (divExerciseContainers && divExerciseContainers.length > 0) {
        divExerciseContainers[divExerciseContainers.length - 1].remove();
    }
}

var form = document.querySelector('#form-meal');
form.addEventListener('change', function() {
    let formData = new FormData(document.querySelector("#form-meal"));
    let caloriesText = document.getElementById("calories");

    let weights = formData.getAll("weight");
    var e = formData.getAll("type");
    
    let cal = 0;
    let protein = 0;
    let fat = 0;
    let carbs = 0;

    for (let i = 0; i < e.length; i++) {
        let macros = e[i].split(",")
        if (weights[i]) {
            cal += (parseFloat(weights[i]) / 100) * parseInt(macros[0])
            fat += (parseFloat(weights[i]) / 100) * parseInt(macros[1])
            protein += (parseFloat(weights[i]) / 100) * parseInt(macros[2])
            carbs += (parseFloat(weights[i]) / 100) * parseInt(macros[3])
        } 
    }
    
    caloriesText.innerHTML = "Calories: " + cal + " kcal, carbs: " +carbs+"g, fat: " +fat+"g, protein: " + protein+"g"
});

window.addEventListener("DOMContentLoaded", async () => {
    cancelMealButton = document.querySelector("#btn-cancel-meal");
    okMealButton = document.querySelector("#btn-ok-meal");
    deleteMealButton = document.querySelector("#btn-delete-meal");
    editMealButton = document.querySelector("#btn-edit-meal");
    copyMealButton = document.querySelector("#btn-copy-meal")

    let buttonAddIngredient = document.querySelector("#btn-add-ingredient");
    let buttonRemoveIngredient = document.querySelector("#btn-remove-ingredient");

    buttonAddIngredient.addEventListener("click", createBlankIngredient);
    buttonRemoveIngredient.addEventListener("click", removeIngredient);

    const urlParams = new URLSearchParams(window.location.search);
    let currentUser = await getCurrentUser();


    if (urlParams.has('id')) {
        const id = urlParams.get('id');
        let mealData = await retrieveMeal(id);

        if (mealData["owner"] == currentUser.url) {
            editMealButton.classList.remove("hide");
            editMealButton.addEventListener("click", handleEditMealButtonClick);
            copyMealButton.classList.remove("hide")
            copyMealButton.addEventListener("click", async () => await copyMeal());
            deleteMealButton.addEventListener("click", (async (id) => await deleteMeal(id)).bind(undefined, id));
            okMealButton.addEventListener("click", (async (id) => await updateMeal(id)).bind(undefined, id));
        }
    } else {
        let ownerInput = document.querySelector("#inputOwner");
        ownerInput.value = currentUser.username;
        setReadOnly(false, "#form-meal");
        ownerInput.readOnly = !ownerInput.readOnly;

        buttonAddIngredient.className = buttonAddIngredient.className.replace(" hide", "");
        buttonRemoveIngredient.className = buttonRemoveIngredient.className.replace(" hide", "");
        okMealButton.className = okMealButton.className.replace(" hide", "");
        cancelMealButton.className = cancelMealButton.className.replace(" hide", "");

        okMealButton.addEventListener("click", async () => await createMeal());
        cancelMealButton.addEventListener("click", handleCancelDuringMealCreate);
    }

});