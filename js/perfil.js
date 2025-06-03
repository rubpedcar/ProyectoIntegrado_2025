document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    document.getElementById("formNombre").value = localStorage.getItem("nombre");
    document.getElementById("formEmail").value = localStorage.getItem("email");
});


function validarDatos()
{
    let mensaje = document.getElementById("mensaje");
    let nombre = document.getElementById("formNombre").value;
    let email = document.getElementById("formEmail").value;

    let res = true;

    if(nombre == "" || email == "")
    {
        mensaje.innerText = "Debes rellenar todos los campos.";
        res = false;
    }
    else
    {
        mensaje.innerText = "";
    }

    return res;
}


function enviarDatos()
{
    let id = this.localStorage.getItem("id");
    let nombre = document.getElementById("formNombre").value;
    let email = document.getElementById("formEmail").value;


    const datos = {id, nombre, email};
    //console.log(datos);

    fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/usuarios.php", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("mensaje").textContent = data.mensaje;
        
        alert(data.mensaje);

        window.location.href = "index.html";
    })
    .catch(err => {
        console.log(err);
        document.getElementById("mensaje").textContent = data.mensaje;
    });
}



document.getElementById("form").addEventListener("submit", function(event){
    event.preventDefault();

    if(validarDatos())
    {
        enviarDatos();
    }

    
});

