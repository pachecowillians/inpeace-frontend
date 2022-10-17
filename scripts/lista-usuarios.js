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
    const response = await axios.get('https://reqres.in/api/users?delay=0');
    const jsonResponse = await response.data;
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
        src: "../assets/icon-edit.svg",
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

// Function to display items shown number on the bottom of the page
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
            // Create a card to each user
            users.map((user) => {
                const usersContainer = document.querySelector(".users");
                usersContainer.appendChild(createCard(user));
            })
            // Update number of items shown
            updateItemsShown(response.per_page, response.total);
        })
    } catch (error) {
        alert("Erro ao obter dados da API");
        console.log(error);
    }
}