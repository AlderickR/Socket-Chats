const TicketControl = require('../models/tocket-contro');

const ticketControl = new TicketControl();

ticketControl.init()

const socketController = (socket) => {
 
    socket.emit('ultimo-ticket', ticketControl.ultimo);
    socket.emit('estado-actual', ticketControl.ultimos4);
    socket.emit('ticket-pendiente', ticketControl.tickets.length);

    socket.on('crear-ticket', ( payload, callback ) => {
        
        const crear = ticketControl.siguiente();

        callback(crear);
        socket.broadcast.emit('ticket-pendiente', ticketControl.tickets.length);
        // TODO: Notificar que hay un neuvo ticket pendiente de asignar

        

    });

    socket.on('atender-ticket', ( {escritorio}, callback) => {
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket(escritorio);

        socket.broadcast.emit('estado-actual', ticketControl.ultimos4);
        socket.emit('ticket-pendiente', ticketControl.tickets.length);
        socket.broadcast.emit('ticket-pendiente', ticketControl.tickets.length);
        // TODO: Notificar sobre una asginacion de tickets
        if(!ticket){
            callback(
                {ok: false,
                msg: 'Ya no hay tickets pendientes'}
            )
        } else{
            callback({
                ok:true,
                ticket
            })
        }
    });

}



module.exports = {
    socketController
}

