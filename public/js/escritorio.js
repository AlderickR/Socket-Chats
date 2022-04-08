// Referencias HTML
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')

const lblPendientes = document.querySelector('#lblPendientes')


const searchParms = new URLSearchParams(window.location.search);


if(!searchParms.has('escritorio')) {
    windows.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParms.get('escritorio')
lblEscritorio.innerHTML = escritorio;

divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    // Habilitar y deshabilitar etiquetas
    // socket.on('ultimo-ticket', null,(ultimo) => {
    //     lblNuevoTicket = ultimo;
    // });
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true;
});
// Reiniciar servidor cada que se modifique un script de la vista como nueva emicion o un listen
// socket.on('ultimo-ticket', (ultimo) => {
//         lblNuevoTicket.innerHTML = 'Ticket ' + ultimo;
// });


btnAtender.addEventListener( 'click', () => {
     
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg}) => {
        if(!ok){
            lblTicket.innerText = 'Nadie'
            return divAlerta.style.display = '';
        }
        lblTicket.innerText = `Ticket ${ticket.numero}`;
    });
   
// Emite mensajes
    // socket.emit( 'crear-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerHTML = ticket;
    // });

});
socket.on('ticket-pendiente', (payload) => {
    lblPendientes.innerText = payload;
})