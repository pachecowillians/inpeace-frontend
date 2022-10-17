// Function that executes when the form is submitted
function handleSubmit(event) {
    // Prevent form to redirect the page
    event.preventDefault();

    try {
        // Getting form data
        let form = event.target;
        var formData = new FormData(form);
        let formDataObject = Object.fromEntries(formData);

        // Getting email and password from sessionStorage
        let validLogin = JSON.parse(sessionStorage.getItem("login"));

        // If the email and password matches the data stored on sessionStorage
        if (formDataObject.email === validLogin.email && formDataObject.password === validLogin.password) {
            window.location.assign("./lista-usuarios.html");
        } else {
            // Wrong email or password
            alert("E-mail ou senha inválidos!");

            // Cleaning the fields
            document.querySelector("#email").value = '';
            document.querySelector("#password").value = '';
        }
    } catch (error) {
        alert("Erro ao submeter o formulário");
        console.log(error);
    }
}