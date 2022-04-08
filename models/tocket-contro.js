const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = this.escritorio;
    }
}
class TicketControl {
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate(); 
        this.tickets = [];
        this.ultimos4 = [];
    }

    get toJson(){
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        const {hoy, tickets, ultimo, ultimos4}  = require('../db/data.json');
        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else {
            // Guardar en dado caso no sea el dia 
            this.guardarBD();
        }
    }

    guardarBD(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify( this.toJson ))
    }

    siguiente(){
        this.ultimo += 1;
        const ticket =new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.guardarBD();

        return 'Ticket ' + ticket.numero;
    }

    atenderTicket(escritorio){
        // Validacion, no hay tickets
        if(this.tickets.length === 0 ){
            return null;
        }
        // Elimina primer registro del arreglo shift
        const ticket = this.tickets.shift(); // this.tickets[0];

        ticket.escritorio = escritorio;
        
        this.ultimos4.unshift(ticket);

        // Validar que ultimos4 sean solo 4
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1, 1);
        }

        console.log(this.ultimos4)
        this.guardarBD();

        return ticket;
    }
    
}

module.exports = TicketControl;