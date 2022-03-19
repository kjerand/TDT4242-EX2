async function retrieveUser(id) {
    let response = await sendRequest("GET", `${HOST}/api/users/${id}/`);

    console.log(response.ok)

    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not retrieve exercise data!", data);
        document.body.prepend(alert);
    } else {
        let user = await response.json();

        console.log(user)

        title = document.getElementById("profilename")
        title.textContent = user.username

        email = document.getElementById("email")
        email.textContent = "Email: " + user.email

        phone_number = document.getElementById("phone_number")
        phone_number.textContent = "Phone number: " + user.phone_number

        country = document.getElementById("country")
        country.textContent = "Country: " + user.country

        city = document.getElementById("city")
        city.textContent = "City: " + user.city

        street_address = document.getElementById("street_address")
        street_address.textContent = "Street adress: " + user.street_address



        
        let container = document.getElementById('div-content');
        workouts = user.workouts
        workouts.forEach(url => {

            id = url.split('/')[5]
            
            getWorkout(id).then(workout => {

                let templateWorkout = document.querySelector("#template-workout");
                let cloneWorkout = templateWorkout.content.cloneNode(true);
    
                let aWorkout = cloneWorkout.querySelector("a");
                aWorkout.href = `workout.html?id=${workout.id}`;
    
                let h5 = aWorkout.querySelector("h5");
                h5.textContent = workout.name;
    
                let localDate = new Date(workout.date);
    
                let table = aWorkout.querySelector("table");
                let rows = table.querySelectorAll("tr");
                rows[0].querySelectorAll("td")[1].textContent = localDate.toLocaleDateString(); // Date
                rows[1].querySelectorAll("td")[1].textContent = localDate.toLocaleTimeString(); // Time
                rows[2].querySelectorAll("td")[1].textContent = workout.exercise_instances.length; // Exercises
    
                container.appendChild(aWorkout);
            })
        });

    }
}


async function getWorkout(id) {
    let workoutData = null;
    let response = await sendRequest("GET", `${HOST}/api/workouts/${id}/`);
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not retrieve workout data!", data);
        document.body.prepend(alert);
    } else {
        workoutData = await response.json();
    }
    return workoutData
}

function createWorkout() {
    window.location.replace("workout.html");
}

window.addEventListener("DOMContentLoaded", async () => {

    const urlParams = new URLSearchParams(window.location.search);

    // view/edit
    if (urlParams.has('id')) {
        const userId = urlParams.get('id');
        await retrieveUser(userId);
    }
});