let cancelButton;
let okButton;

var form = document.querySelector('#form-ingredient');
form.addEventListener('change', function() {
    let formData = new FormData(document.querySelector("#form-ingredient"));
    let caloriesText = document.getElementById("calories");

    caloriesText.innerHTML = "Calories: "
    caloriesText.innerHTML += (formData.get("fat")*9 + formData.get("carbs")*4 + formData.get("protein")*4)
    caloriesText.innerHTML += " kcal"
  
});

function handleCancelButtonDuringCreate() {
    window.location.replace("ingredients.html");
}

async function createIngredient() {
    let formData = new FormData(document.querySelector("#form-ingredient"));
    let body = {"name": formData.get("name"), 
                "fat": formData.get("fat"),
                "protein": formData.get("protein"),
                "carbohydrates": formData.get("carbs"),
                "calories": (formData.get("fat")*9 + formData.get("carbs")*4 + formData.get("protein")*4), };

    console.log(body)

    let response = await sendRequest("POST", `${HOST}/api/ingredients/`, body);

    if (response.ok) {
        window.location.replace("ingredients.html");
    } else {
        let data = await response.json();
        let alert = createAlert("Could not create new ingredient!", data);
        document.body.prepend(alert);
    }
}


window.addEventListener("DOMContentLoaded", async () => {
    cancelButton = document.querySelector("#btn-cancel-ingredient");
    okButton = document.querySelector("#btn-ok-ingredient");

    okButton.addEventListener("click", async () => createIngredient());
    cancelButton.addEventListener("click", handleCancelButtonDuringCreate);
});