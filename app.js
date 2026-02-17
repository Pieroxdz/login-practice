const form = document.querySelector("#form")
const formBtn = document.querySelector("#form button")
const inputEmail = document.querySelector("#email")
const inputPassword = document.querySelector("#password")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

let datos = {
    email: "",
    password: ""
};

const limpiarObj = () => {
    for (let key in datos) {
        datos[key] = ""
    }
}

const validar = (e) => {
    e.preventDefault()

    const { email } = datos;

    if (Object.values(datos).some(valor => valor.trim() === "")) {
        alert("Llenar todo")
        return
    }

    const emailValido = emailRegex.test(email);

    if (!emailValido) {
        alert("El email no es válido")
        return
    }

    alert("Envíando....")
    form.reset()
    limpiarObj()
}

const sincronizarData = (e) => {
    datos[e.target.name] = e.target.value
}

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", validar)
    inputEmail.addEventListener("change", sincronizarData)
    inputPassword.addEventListener("change", sincronizarData)
})


