let goBackButton; //Rule 13: is not defined in the correct scope
let submitNewFileButton; //Rule 2: this declaration is unused

async function retrieveWorkoutImages(id) {  
    let workoutData = null; //1
    let response = await sendRequest("GET", `${HOST}/api/workouts/${id}/`); //2 //Rule 8: String should not be hard coded
    if (!response.ok) { //3
        let data = await response.json(); //4
        let alert = createAlert("Could not retrieve workout data!", data); //5
        document.body.prepend(alert); //6
    } else {
        workoutData = await response.json(); //7

        document.getElementById("workout-title").innerHTML = "Workout name: " + workoutData["name"]; //8
        document.getElementById("workout-owner").innerHTML = "Owner: " + workoutData["owner_username"]; //9

        let hasNoImages = workoutData.files.length == 0; // 10
        let noImageText = document.querySelector("#no-images-text"); // 11

        if(hasNoImages){ // 12
            noImageText.classList.remove("hide");
            return;
        }

        noImageText.classList.add("hide");

        
        let filesDiv = document.getElementById("img-collection"); // 13
        let filesDeleteDiv = document.getElementById("img-collection-delete"); // 14
        
        const currentImageFileElement = document.querySelector("#current"); //15
        let isFirstImg = true; //16

        let fileCounter = 0; //17

        for (let file of workoutData.files) {//18 //Rule 9: variable and attribute file has the same name
            let a = document.createElement("a"); //19
            a.href = file.file; // 20
            let pathArray = file.file.split("/"); //21
            a.text = pathArray[pathArray.length - 1]; //22
            a.className = "me-2"; //23
   
            let isImage = ["jpg", "png", "gif", "jpeg", "JPG", "PNG", "GIF", "JPEG"].includes(a.text.split(".")[1]); //24

            if(isImage){ //25
                let deleteImgButton = document.createElement("input"); //26
                deleteImgButton.type = "button"; //27
                deleteImgButton.className = "btn btn-close"; //28
                deleteImgButton.id = file.url.split("/")[file.url.split("/").length - 2]; //29
                deleteImgButton.addEventListener('click', () => handleDeleteImgClick(deleteImgButton.id, "DELETE", `Could not delete workout ${deleteImgButton.id}!`, HOST, ["jpg", "png", "gif", "jpeg", "JPG", "PNG", "GIF", "JPEG"])); //30 //Rule 7: too long line
                filesDeleteDiv.appendChild(deleteImgButton); //31
                
                let img = document.createElement("img"); //32
                img.src = file.file; //33
                
                filesDiv.appendChild(img); //34
                deleteImgButton.style.left = `${(fileCounter % 4) * 191}px`; //35
                deleteImgButton.style.top = `${Math.floor(fileCounter / 4) * 105}px`; //36

                if(isFirstImg){ //37
                    currentImageFileElement.src = file.file; //38
                    isFirstImg = false; //39
                }
                fileCounter++; //40
            }
        }

        const otherImageFileElements = document.querySelectorAll(".imgs img"); //41
        const selectedOpacity = 0.6; //42
        otherImageFileElements[0].style.opacity = selectedOpacity; //43

        otherImageFileElements.forEach((imageFileElement) => imageFileElement.addEventListener("click", (event) => { //44
            //Changes the main image
            currentImageFileElement.src = event.target.src; //45

            //Adds the fade animation
            currentImageFileElement.classList.add('fade-in') //46
            setTimeout(() => currentImageFileElement.classList.remove('fade-in'), 500); //47

            //Sets the opacity of the selected image to 0.4
            otherImageFileElements.forEach((imageFileElement) => imageFileElement.style.opacity = 1) //48 //Rule 9: imageFileElement already declared
            event.target.style.opacity = selectedOpacity; //49
        }))

    }
    return workoutData; //50    
}

async function validateImgFileType(id, host_variable, acceptedFileTypes) {
    let file = await sendRequest("GET", `${host_variable}/api/workout-files/${id}/`); //Rule 8: endpoint should not be hard-coded
    let fileData = await file.json();
    let fileType = fileData.file.split("/")[fileData.file.split("/").length - 1].split(".")[1];
    
    return acceptedFileTypes.includes(fileType);
}

async function handleDeleteImgClick (id, http_keyword, fail_alert_text, host_variable, acceptedFileTypes) {
    if(validateImgFileType(id, host_variable, acceptedFileTypes, )){
        return // 11: not easy to test
    }

    let response = await sendRequest(http_keyword, `${host_variable}/api/workout-files/${id}/`);  //Rule 8: endpoint should not be hard-coded

    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert(fail_alert_text, data);
        document.body.prepend(alert);
    } else {
        location.reload();
    }
}

function handleGoBackToWorkoutClick() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    window.location.replace(`workout.html?id=${id}`);
}

window.addEventListener("DOMContentLoaded", async () => {

    goBackButton = document.querySelector("#btn-back-workout");
    goBackButton.addEventListener('click', handleGoBackToWorkoutClick);

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let workoutData = await retrieveWorkoutImages(id); // Rule 2: Variable unused

});