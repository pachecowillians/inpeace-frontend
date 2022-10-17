// Function that executes when user submits the form
function handleSubmit(event) {
    // Prevent to redirect page
    event.preventDefault();

    try {
        // Getting form data
        let form = event.target;
        var formData = new FormData(form);
        let formDataObject = Object.fromEntries(formData);

        // Validating empty fields
        if (formDataObject["sex"] === undefined ||
            formDataObject["state"] === undefined ||
            formDataObject["name"].trim().length == 0 ||
            formDataObject["email"].trim().length == 0 ||
            formDataObject["password"].trim().length == 0 ||
            formDataObject["confirm-password"].trim().length == 0) {
            alert("Preencha todos os campos!");
        } else if (formDataObject["password"] === formDataObject["confirm-password"]) {
            // Validating equality between password and confirm password
            let loginObject = {
                "email": formDataObject.email,
                "password": formDataObject.password,
            }

            // Saving email and password on sessionStorage
            sessionStorage.setItem("login", JSON.stringify(loginObject));

            alert("Cadastro realizado com sucesso!");

            // Redirecting to login page
            window.location.assign("./index.html");
        } else {
            // When password and confirm password are different
            alert("As senhas não coincidem. Por favor, defina-as novamente.");
            document.querySelector("#password").value = '';
            document.querySelector("#confirm-password").value = '';
        }
    } catch (error) {
        alert("Erro ao submeter o formulário");
        console.log(error);
    }
}