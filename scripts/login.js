
// Function that executes when the form is submitted
function handleSubmit(event) {
    // Prevent form to redirect the page
    event.preventDefault();

    try {
        // Getting form data
        let form = event.target;
        var formData = new FormData(form);
        let formDataObject = Object.fromEntries(formData);

        // Validating if all the fields are filled
        if (formDataObject["email"].trim().length == 0 || formDataObject["password"].trim().length == 0) {
            alert("Preencha todos os campos!");
        } else {
            // Getting email and password from sessionStorage
            let validLogin = JSON.parse(sessionStorage.getItem("login"));

            // If the email and password matches the data stored on sessionStorage
            if (formDataObject.email === validLogin.email && formDataObject.password === validLogin.password) {
                sessionStorage.setItem("user", validLogin.email);

                window.location.assign("./lista-usuarios.html");
            } else {
                // Wrong email or password
                alert("E-mail ou senha inválidos!");

                // Cleaning the fields
                document.querySelector("#email").value = '';
                document.querySelector("#password").value = '';
            }
        }
    } catch (error) {
        alert("Não há nenhum usuário cadastrado. Favor realizar o cadastro.");
    }
}