// Referencias HTML


const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    // Habilitar y deshabilitar etiquetas
    // socket.on('ultimo-ticket', null,(ultimo) => {
    //     lblNuevoTicket = ultimo;
    // });
    btnCrear.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true;
});
// Reiniciar servidor cada que se modifique un script de la vista como nueva emicion o un listen
socket.on('ultimo-ticket', (ultimo) => {
        lblNuevoTicket.innerHTML = 'Ticket ' + ultimo;
});


btnCrear.addEventListener( 'click', () => {
// Emite mensajes
    socket.emit( 'crear-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerHTML = ticket;
    });



});