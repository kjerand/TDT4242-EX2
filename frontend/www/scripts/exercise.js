import routes from "./routes.js";

let cancelButton;
let okButton;
let deleteButton;
let editButton;
let oldFormData;

class MuscleGroup { 
    constructor(type) {
        this.isValidType = false;
        this.validTypes = ["Legs", "Chest", "Back", "Arms", "Abdomen", "Shoulders"]

        this.type = this.validTypes.includes(type) ? type : undefined;
    }

    setMuscleGroupType(newType) { //Rule 7: not consistent use of functions
        this.isValidType = false;
        
        if(this.validTypes.includes(newType)){
            this.isValidType = true;
            this.type = newType;
        }
        else{
            alert("Invalid muscle group!");
        }

    }
    
    getMuscleGroupType() {
        return this.type;
    }
}

function handleCancelButtonDuringEdit() {
    setReadOnly(true, "#form-exercise");
    document.querySelector("select").setAttribute("disabled", "")
    showEditButton();

    cancelButton.removeEventListener("click", handleCancelButtonDuringEdit);

    let form = document.querySelector("#form-exercise");
    if (oldFormData.has("name")) form.name.value = oldFormData.get("name");
    if (oldFormData.has("description")) form.description.value = oldFormData.get("description");
    if (oldFormData.has("duration")) form.duration.value = oldFormData.get("duration");
    if (oldFormData.has("calories")) form.calories.value = oldFormData.get("calories");
    if (oldFormData.has("muscleGroup")) form.muscleGroup.value = oldFormData.get("muscleGroup");
    if (oldFormData.has("unit")) form.unit.value = oldFormData.get("unit");
    if (oldFormData.has("info")) form.unit.value = oldFormData.get("info");

    deleteOldFormData();
}

function handleCancelButtonDuringCreate() {
    window.location.replace("exercises.html");
}

async function createExercise() { //Change to same name format with handle
    document.querySelector("select").removeAttribute("disabled") //Rule 7: semicolon
    let form = document.querySelector("#form-exercise");
    let formData = new FormData(form);
    let body = getFormBody(formData);

    console.log(routes.getAllExercisesRoute())

    let response = await sendRequest("POST", routes.getAllExercisesRoute(), body); //Rule 8 haed code

    if (response.ok) {
        window.location.replace("exercises.html");
    } else {
        let data = await response.json();
        let alert = createAlert("Could not create new exercise!", data);
        document.body.prepend(alert);
    }
}

function handleEditExerciseButtonClick() {
    setReadOnly(false, "#form-exercise");

    document.querySelector("select").removeAttribute("disabled")

    editButton.className += " hide";
    okButton.className = okButton.className.replace(" hide", "");
    cancelButton.className = cancelButton.className.replace(" hide", "");
    deleteButton.className = deleteButton.className.replace(" hide", "");

    cancelButton.addEventListener("click", handleCancelButtonDuringEdit);

    let form = document.querySelector("#form-exercise");
    oldFormData = new FormData(form);
}

async function deleteExercise(id) {
    let response = await sendRequest("DELETE", routes.getExerciseRoute(id)); //Rule 8
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert(`Could not delete exercise ${id}`, data);
        document.body.prepend(alert);
    } else {
        window.location.replace("exercises.html");
    }
}

async function retrieveExercise(id) {
    let response = await sendRequest("GET", routes.getExerciseRoute(id)); // Rule 8

    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not retrieve exercise data!", data);
        document.body.prepend(alert);
    } else {
        document.querySelector("select").removeAttribute("disabled")
        let exerciseData = await response.json();
        let form = document.querySelector("#form-exercise");
        let formData = new FormData(form);

        for (let key of formData.keys()) {
            let selector;
            if (key !== "muscleGroup") {
                selector = `input[name="${key}"], textarea[name="${key}"]`
            } else {
                selector = `select[name=${key}]`
            }
            //Rule 5: make it more simple
            let input = form.querySelector(selector);
            let newVal = exerciseData[key];
            input.value = newVal;
        }
        document.querySelector("select").setAttribute("disabled", "")
    }
}

async function updateExercise(id) {
    let form = document.querySelector("#form-exercise");
    let formData = new FormData(form);

    let muscleGroupSelector = document.querySelector("select")
    muscleGroupSelector.removeAttribute("disabled")

    let body = getFormBody(formData);
    let response = await sendRequest("PUT", routes.getExercisesRoute(id), body); //Rule 8

    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert(`Could not update exercise ${id}`, data);
        document.body.prepend(alert);
    } else {
        muscleGroupSelector.setAttribute("disabled", "")

        setReadOnly(true, "#form-exercise");
        showEditButton();

        cancelButton.removeEventListener("click", handleCancelButtonDuringEdit);
        deleteOldFormData();
    }
}

function showEditButton() {
    okButton.className += " hide";
    deleteButton.className += " hide";
    cancelButton.className += " hide";
    editButton.className = editButton.className.replace(" hide", "");
}

function deleteOldFormData() {
    oldFormData.delete("name");
    oldFormData.delete("description");
    oldFormData.delete("duration");
    oldFormData.delete("calories");
    oldFormData.delete("muscleGroup");
    oldFormData.delete("unit");
    oldFormData.delete("info");
}

function getFormBody(formData) {
    let selectedMuscleGroup = new MuscleGroup(formData.get("muscleGroup"));
    let body = {"name": formData.get("name"), 
    "description": formData.get("description"),
    "duration": formData.get("duration"),
    "calories": formData.get("calories"),
    "muscleGroup": selectedMuscleGroup.getMuscleGroupType(),
    "unit": formData.get("unit"),
    "info": formData.get("info")};

    return body;
}

window.addEventListener("DOMContentLoaded", async () => {
    cancelButton = document.querySelector("#btn-cancel-exercise");
    okButton = document.querySelector("#btn-ok-exercise");
    deleteButton = document.querySelector("#btn-delete-exercise");
    editButton = document.querySelector("#btn-edit-exercise");
    oldFormData = null;

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('id')) {
        const exerciseId = urlParams.get('id');
        await retrieveExercise(exerciseId);

        editButton.addEventListener("click", handleEditExerciseButtonClick);
        deleteButton.addEventListener("click", (async (id) => deleteExercise(id)).bind(undefined, exerciseId)); //await not neccesary, sonar
        okButton.addEventListener("click", (async (id) => updateExercise(id)).bind(undefined, exerciseId));
    } 
    else {
        setReadOnly(false, "#form-exercise");

        editButton.className += " hide";
        okButton.className = okButton.className.replace(" hide", "");
        cancelButton.className = cancelButton.className.replace(" hide", "");

        okButton.addEventListener("click", async () => createExercise());
        cancelButton.addEventListener("click", handleCancelButtonDuringCreate);
    }
});