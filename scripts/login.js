function handleSubmit(event) {
    event.preventDefault();

    let form = event.target;
    var formData = new FormData(form);
    let formDataObject = Object.fromEntries(formData);

    console.log(formDataObject);

    let validLogin = JSON.parse(sessionStorage.getItem("login"));

    if (formDataObject.email === validLogin.email && formDataObject.password === validLogin.password) {
        window.location.assign("./lista-usuarios.html");
    } else {
        alert("E-mail ou senha inválidos!");
        document.querySelector("#email").value = '';
        document.querySelector("#password").value = '';
    }

}