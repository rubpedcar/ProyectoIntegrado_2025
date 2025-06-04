document.addEventListener("DOMContentLoaded", function (event) {

    const id = localStorage.getItem("id");
    const nombre = localStorage.getItem("nombre");
    const email = localStorage.getItem("email");
    const rol = localStorage.getItem("rol");

    const cabecera = document.getElementById("cabecera");
    const enlace = document.getElementById("enlaceSesion");
    const div = document.getElementById('divCont');

    console.log("Idkjcbcaskd: " + id);
    console.log("Rol: " +rol);

    if (rol == null) {
        enlace.innerText = "Iniciar sesión";
        enlace.setAttribute("href", "acceso/login.html");
        cabecera.innerText = "Publicaciones";
        publicaciones(event);

    }
    else if (rol == 1) {
        cabecera.innerHTML.textContent = "Admin";
    }
    else if (rol == 2) {

        enlace.innerText = "Cerrar sesión";
        enlace.setAttribute("href", "");
        enlace.setAttribute("onclick", "logout()");
        cabecera.innerText = "Publicaciones de " + nombre;

        let divButton = document.createElement("button");
        divButton.innerText = "Nueva Publicación";

        let divNueva = document.createElement("a");
        divNueva.setAttribute("href", "crearPublicacion.html");
        divNueva.appendChild(divButton);

        let divButton2 = document.createElement("button");
        divButton2.innerText = "Mis Datos";

        let divPerfil = document.createElement("a");
        divPerfil.setAttribute("href", "perfil.html");
        divPerfil.appendChild(divButton2);


        document.getElementById('divCont').appendChild(divPerfil);
        document.getElementById('divCont').appendChild(divNueva);
        
        try {
            console.log(id);
            publicacionesUser(id);
        } catch (error) {
            console.log(error);
        }
    }

});


function publicacionesUser(id) {
    //event.preventDefault();
    console.log("Publicaciones de usuario");
    console.log(localStorage.getItem("id"));

    fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/publicaciones.php?id=" + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema.');
            }
            return response.json();
        })
        .then(data => {

            console.log(data);

            

            if (data != "") {
 

                data.forEach(publicacion => {


                    let divFoto = document.createElement("div");
                    let divNombre = document.createElement("h3");
                    let divDesc = document.createElement("p");
                    let divUser = document.createElement("p");
                    let divCate = document.createElement("p");
                    let divImagen = document.createElement("img");
                    let divEstado = document.createElement("p");

                    divNombre.textContent = publicacion.nombre;
                    divDesc.textContent = "Descripción: " + publicacion.descripcion;
                    divImagen.setAttribute("src", "img/" + publicacion.imagen);
                    divImagen.setAttribute("width", "400px");

                    // Se obtiene el nombre de la categoría.
                    fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/categorias.php?id=" + publicacion.categoria_id)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Hubo un problema.');
                            }
                            return response.json();
                        })
                        .then(data => {

                            divCate.textContent = "Categoría: " + data.categoria;
                        })
                        .catch(error => {

                        });


                    // Se obtiene el nombre del estado.
                    fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/estados.php?id=" + publicacion.estado_id)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Hubo un problema.');
                            }
                            return response.json();
                        })
                        .then(data => {

                            divEstado.textContent = "Estado: " + data.estado;
                        })
                        .catch(error => {

                        });



                    divFoto.appendChild(divNombre);
                    divFoto.appendChild(divDesc);
                    divFoto.appendChild(divUser);
                    divFoto.appendChild(divCate);
                    divFoto.appendChild(divImagen);
                    divFoto.appendChild(divEstado);

                    
                    document.getElementById('divCont').appendChild(divFoto);
                });
            }
            else {
                
                let divMess = document.createElement("p");
                divMess.textContent = "No hay publicaciones.";
                document.getElementById('divCont').appendChild(divMess);
            }


        })
        .catch(error => {
            console.log(error);
        }
        );
}



function publicaciones(event) {
    event.preventDefault();

    fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/publicaciones.php")
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema.');
            }
            return response.json();
        })
        .then(data => {

            data.forEach(publicacion => {

                let divFoto = document.createElement("div");
                let divNombre = document.createElement("h3");
                let divDesc = document.createElement("p");
                let divUser = document.createElement("p");
                let divCate = document.createElement("p");
                let divImagen = document.createElement("img");

                divNombre.textContent = publicacion.nombre;
                divDesc.textContent = "Descripción: " + publicacion.descripcion;
                divImagen.setAttribute("src", "img/" + publicacion.imagen);
                divImagen.setAttribute("width", "400px");


                // Se obtiene el nombre del usuario.
                fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/usuarios.php?id=" + publicacion.usuario_id)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Hubo un problema.');
                        }
                        return response.json();
                    })
                    .then(data => {

                        divUser.textContent = "Foto tomada por: " + data.nombre;
                    })
                    .catch(error => {

                    });


                // Se obtiene el nombre de la categoría.
                fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/categorias.php?id=" + publicacion.categoria_id)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Hubo un problema.');
                        }
                        return response.json();
                    })
                    .then(data => {

                        divCate.textContent = "Categoría: " + data.categoria;
                    })
                    .catch(error => {

                    });


                
                

                divFoto.appendChild(divNombre);
                divFoto.appendChild(divDesc);
                divFoto.appendChild(divUser);
                divFoto.appendChild(divCate);
                divFoto.appendChild(divImagen);
                document.getElementById('divCont').appendChild(divFoto);
            });
        })
        .catch(error => {

        }
        );
}



function logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("nombre");
    localStorage.removeItem("email");
    localStorage.removeItem("rol");

    window.location.href = "../index.html";
}


