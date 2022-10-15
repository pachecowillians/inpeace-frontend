function handleSubmit(event) {
    event.preventDefault();

    let form = event.target;
    var formData = new FormData(form);
    let formDataObject = Object.fromEntries(formData);

    if (formDataObject["password"] === formDataObject["confirm-password"]) {

        let loginObject = {
            "email": formDataObject.email,
            "password": formDataObject.password,
        }

        sessionStorage.setItem("login", JSON.stringify(loginObject));

        alert("Cadastro realizado com sucesso!");

        window.location.assign("./index.html");
    } else {
        alert("As senhas não coincidem. Por favor, defina-as novamente.");
        document.querySelector("#password").value = '';
        document.querySelector("#confirm-password").value = '';
    }
}