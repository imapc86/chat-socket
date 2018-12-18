var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios')
}

var usuario = {
        nombre: params.get('nombre'),
        sala: params.get('sala')
    }
    //  .on para escuchar
socket.on('connect', function() {
    console.log("Conectado al servidor");

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    });
});

socket.on('disconnect', function() {
    console.log('Se perdio la conexión con el servidor');
});

// .emit enviar información
socket.emit('enviarMensaje', {
    usuario: 'Israel',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('Respuesta Server', resp);
});

// .on escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor dice: ', mensaje);
});

//Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    console.log('Personas: ', personas);
});

//Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado', mensaje);
});