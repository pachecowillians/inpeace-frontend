async function fetchUsers() {
    const response = await fetch('https://reqres.in/api/users?page=2');
    const jsonResponse = await response.json();
    return jsonResponse;
}

function createCard(user) {
    console.log(user);
    let divUser = document.createElement("div");
    divUser.classList.add('user');

    let button = document.createElement("button");
    let editIcon = document.createElement("img");
    editIcon.src = "../assets/icon-edit.svg";
    editIcon.alt = "Edit user";

    button.appendChild(editIcon);

    let pictureName = document.createElement("div");
    pictureName.classList.add("picture-name");

    let avatar = document.createElement("img");
    avatar.src = user.avatar;
    avatar.alt = "Avatar";

    let name = document.createElement("span");
    name.innerHTML = user.first_name + " " + user.last_name;

    pictureName.appendChild(avatar);
    pictureName.appendChild(name);

    let mail = document.createElement("span");
    mail.innerHTML = user.email;

    divUser.appendChild(button);
    divUser.appendChild(pictureName);
    divUser.appendChild(mail);
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