async function fetchUsers() {
    const response = await fetch('https://reqres.in/api/users?page=2');
    const jsonResponse = await response.json();
    return jsonResponse;
}

/* <div class="user">
                <button>
                    <img src="../assets/icon-edit.svg" alt="Edit icon">
                </button>
                <div class="picture-name">
                    <img src="https://reqres.in/img/faces/9-image.jpg" alt="Profile picture">
                    <span>John Doe</span>
                </div>
                <span>johndoe@uppersoft.com</span>
            </div> */

function createCard(user) {
    console.log(user);
    let divUser = document.createElement("div");
    divUser.innerHTML = user.first_name;
    divUser.classList.add('user');

    let button = document.createElement("button");
    let profilePicture = document.createElement("img");
    profilePicture.src = "../assets/icon-edit.svg";
    profilePicture.alt = "Edit user";

    button.appendChild(profilePicture);
    divUser.appendChild(button)
    return divUser;
}

window.onload = () => {
    fetchUsers().then(response => {
        const users = response.data;
        users.map((user) => {
            const usersContainer = document.querySelector(".users");
            usersContainer.appendChild(createCard(user))
        })
    })
}