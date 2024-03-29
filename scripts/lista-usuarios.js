// Function to create an element with specified proprieties
function createElementWithProps(tagName, props) {
    // Creating element
    let element = document.createElement(tagName);

    // Setting props
    Object.keys(props).forEach(key => {
        element.setAttribute(key, props[key]);
    })

    // Returning element
    return element;
}

// Async function to get users from API
async function fetchUsers() {
    // Show load animation
    let loader = createElementWithProps("div", {
        id: "load-icon"
    });

    document.querySelector(".users").appendChild(loader);

    // Getting data from API with axios
    const response = await axios.get('https://reqres.in/api/users?delay=2');
    const jsonResponse = await response.data;

    // Returning users list and pagination information
    return jsonResponse;
}

// Function to create a card with user information
function createCard(user) {

    // Creating elements
    let divUser = createElementWithProps("div", {
        class: "user"
    });

    let button = createElementWithProps("button", {
        type: "button"
    });
    let editIcon = createElementWithProps("img", {
        src: "../assets/images/icon-edit.svg",
        alt: "Edit user"
    });

    let pictureName = createElementWithProps("div", {
        class: "picture-name"
    });

    let avatar = createElementWithProps("img", {
        src: user.avatar,
        alt: user.first_name + " " + user.last_name
    });

    let name = document.createElement("span");
    name.innerHTML = user.first_name + " " + user.last_name;

    let mail = document.createElement("span");
    mail.innerHTML = user.email;

    // Creating elements hierarchy
    button.appendChild(editIcon);
    pictureName.appendChild(avatar);
    pictureName.appendChild(name);
    divUser.appendChild(button);
    divUser.appendChild(pictureName);
    divUser.appendChild(mail);

    // Returning card
    return divUser;
}

// Function to display pagination number on the bottom of the page
function updateItemsShown(shown, total) {
    let itemsShown = document.querySelector("#items-shown");
    itemsShown.innerHTML = `mostrando ${shown} de ${total}`;
}

// Function that executes when window finish loading
window.onload = () => {
    try {
        // Getting users from API
        fetchUsers().then(response => {
            // Removing loading animation
            document.querySelector(".users").innerHTML = ""
            const users = response.data;

            // Creating a card to each user
            users.map((user) => {
                const usersContainer = document.querySelector(".users");
                usersContainer.appendChild(createCard(user));
            })

            // Updating the number of items shown
            updateItemsShown(response.per_page, response.total);
        })
    } catch (error) {
        alert("Erro ao obter dados da API");
        console.log(error);
    }
}

// Function that executes when the page is loading
document.onreadystatechange = function (e) {
    if (document.readyState === 'complete') {

        //Verify if there is an user logged in
        let user = sessionStorage.getItem("user");

        // If there is no user, return to the login page
        if (user === null) {
            alert("Usuário não identificado! Favor realizar o login.");
            window.location.assign("./index.html");
        }
    }
};