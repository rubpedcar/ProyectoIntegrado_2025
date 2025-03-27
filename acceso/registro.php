<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>
<body>
    <a href="login.php">Volver</a>
    <h1>Formulario de inscripción</h1>

    <form action="">
        <p>Nombre: <input type="text" name="nombre"></p>
        <p>Email: <input type="text" name="email"></p>
        <p>Contraseña: <input type="password" name="password"></p>
        <p>Elige una foto de perfil:</p>

        <div>
            <img src="../fotos_perfil/perfil_01.png" alt="foto de perfil 1" style="width: 200px;">
            <img src="../fotos_perfil/perfil_02.png" alt="foto de perfil 2" style="width: 200px;">
            <img src="../fotos_perfil/perfil_03.png" alt="foto de perfil 3" style="width: 200px;">
        </div>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>