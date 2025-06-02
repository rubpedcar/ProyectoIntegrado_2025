document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    document.getElementById("formNombre").value = localStorage.getItem("nombre");
    document.getElementById("formEmail").value = localStorage.getItem("email");
});

document.getElementById("form").addEventListener("click", function(event){
    event.preventDefault();

    
});