async function fetchUsers(request) {
    let response = await sendRequest("GET", `${HOST}/api/users/`);

    if (response.ok) {
        let data = await response.json();

        let users = data.results;
        let container = document.getElementById('div-content');
        let userTemplate = document.querySelector("#template-users");
        users.forEach(user => {
            const userAnchor = userTemplate.content.firstElementChild.cloneNode(true);
            userAnchor.href = `user.html?id=${user.id}`;

            const h5 = userAnchor.querySelector("h5");
            h5.textContent = user.username;
        

            container.appendChild(userAnchor);
        });
    }

    return response;
}


window.addEventListener("DOMContentLoaded", async () => {

    let response = await fetchUsers();
    
    if (!response.ok) {
        let data = await response.json();
        let alert = createAlert("Could not retrieve exercise types!", data);
        document.body.prepend(alert);
    }
});