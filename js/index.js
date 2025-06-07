document.addEventListener("DOMContentLoaded", function (event) {

    const id = localStorage.getItem("id");
    const nombre = localStorage.getItem("nombre");
    const email = localStorage.getItem("email");
    const rol = localStorage.getItem("rol");

    const cabecera = document.getElementById("cabecera");
    const enlace = document.getElementById("enlaceSesion");
    const div = document.getElementById('divCont');

    console.log("Id: " + id);
    console.log("Rol: " +rol);

    mostrarBases();

    // Dependiendo del rol del usuario, se mostrará una distribución distinta de la página.
    if (rol == null) {
        enlace.innerText = "Iniciar sesión";
        enlace.setAttribute("href", "acceso/login.html");
        cabecera.innerText = "Publicaciones";
        publicaciones(event);

    }
    else if (rol == 1) {
        enlace.innerText = "Cerrar sesión";
        enlace.setAttribute("href", "");
        enlace.setAttribute("onclick", "logout()");
        cabecera.innerText = "Administrador: " + nombre;

        let divButton2 = document.createElement("button");
        divButton2.innerText = "Mis Datos";

        let divPerfil = document.createElement("a");
        divPerfil.setAttribute("href", "perfil.html");
        divPerfil.appendChild(divButton2);

        let divButton3 = document.createElement("button");
        divButton3.innerText = "Modificar Bases del Concurso";

        let divBases = document.createElement("a");
        divBases.setAttribute("href", "modificarBases.html");
        divBases.appendChild(divButton3);


        document.getElementById('divCont').appendChild(divPerfil);
        document.getElementById('divCont').appendChild(divBases);

        try 
        {
            console.log(id);
            publicacionesUser(id);
        } 
        catch (error) 
        {
            console.log(error);
        }
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
        
        try 
        {
            console.log(id);
            publicacionesUser(id);
        } 
        catch (error) 
        {
            console.log(error);
        }
    }

});

// Se muestra el listado de publicaciones de un usuario en concreto. Si es el admin, mostrará todas las publicaciones existentes.
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
                    divImagen.setAttribute("src", "http://localhost/hlc/tarde/Backend_ProyectoIntegrado/" + publicacion.imagen);
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

                            if(data.id != 1 || id == 1)
                            {
                                let modificarEstado = document.createElement("a");
                                modificarEstado.setAttribute("href", "modificarPublicacion.html?idPublicacion=" + publicacion.id);
                                modificarEstado.innerText = "Modificar Publicación";
                                divFoto.appendChild(modificarEstado);
                            }
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


// Se muestra el listado de publicaciones admitidas.
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
                divFoto.setAttribute("class", "divFoto");
                let divNombre = document.createElement("h3");
                let divDesc = document.createElement("p");
                let divUser = document.createElement("p");
                let divCate = document.createElement("p");
                let divImagen = document.createElement("img");
                let btnVotar = document.createElement("button");

                divNombre.textContent = publicacion.nombre;
                divDesc.textContent = "Descripción: " + publicacion.descripcion;
                divImagen.setAttribute("src", "http://localhost/hlc/tarde/Backend_ProyectoIntegrado/" + publicacion.imagen);
                divImagen.setAttribute("width", "400px");
                btnVotar.textContent = "Votar";
                btnVotar.setAttribute("id", "btnVotar");
                btnVotar.setAttribute("onclick", "votar(" + publicacion.id + ")");


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
                divFoto.appendChild(document.createElement("br"));
                divFoto.appendChild(btnVotar);
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


function votar(publicacion_id) {

    // Primero tomaremos la ip pública del usuario y la guardaremos para futuras votaciones.
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const usuario_ip = data.ip;

            localStorage.setItem("ip", usuario_ip);

            const datos = {publicacion_id, usuario_ip};
            
            //alert("Voto Registrado. Publicacion con id: " + idPublicacion + "\nTu IP: " + ip);

            fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/votaciones.php", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Hubo un problema.');
                    }
                    return response.json();
                })
                .then(data => {

                    console.log(data);
                    alert(data.mensaje);

                })
                .catch(error => {
                    console.log(error);
                });
            

        })
        .catch(() => {
            alert("No se pudo obtener la IP.");
        });
}


// Se muestran las bases del concurso.
function mostrarBases()
{
    fetch("http://localhost/hlc/tarde/Backend_ProyectoIntegrado/bases.php")
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema.');
            }
            return response.json();
        })
        .then(data => {

            document.getElementById("limite_fotos").innerText = "Cada participante puede subir un máximo de " + data.limite_fotos + " publicaciones.";
            document.getElementById("limite_votos").innerText = "Cada usuario no registrado puede votar " + data.limite_votos + " publicaciones distintas.";
            document.getElementById("plazo_publicaciones").innerText = "El plazo de publicación se cerrará: " + data.plazo_publicaciones;
            document.getElementById("plazo_votaciones").innerText = "El plazo de votación se cerrará: " + data.plazo_votaciones;

        })
        .catch(error => {
            console.error('Error al cargar las bases:', error);
        });
}
