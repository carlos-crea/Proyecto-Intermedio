const crearUsuario = (nombre, apellidos, fechaNacimiento, telefono, userName, correo, password,direccion,ciudad,estado,cp,tipoTarjeta,numTarjeta,expiracionTarjeta) => {
    return fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, apellidos, fechaNacimiento, telefono, userName,correo,password,direccion,ciudad,estado,cp,tipoTarjeta,numTarjeta,expiracionTarjeta,id: uuid.v4() }),
    });
};

export function agregaUser(nombreUsuario, apellidosUsuario, nacimientoUsuario, telefonoUsuario,nombreDeUsuario,correoUusuario,contrasenaUsuario,direccionCompleta,ciudadUsuario,estadoUsuario,codigoPostalUser,tipoTarjeta,numTarjeta,fechaExpiracion) {
    crearUsuario(nombreUsuario, apellidosUsuario, nacimientoUsuario, telefonoUsuario, nombreDeUsuario,correoUusuario,contrasenaUsuario,direccionCompleta,ciudadUsuario,estadoUsuario,codigoPostalUser,tipoTarjeta,numTarjeta,fechaExpiracion);
};