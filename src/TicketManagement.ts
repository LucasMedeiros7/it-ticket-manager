class TicketManagement {
  private ticket: string

  constructor() {
    this.ticket = 'Novo Ticket'
  }

  createTicket() {
    return this.ticket
  }
}

const ticketSystem = new TicketManagement()

console.log(ticketSystem.createTicket())
