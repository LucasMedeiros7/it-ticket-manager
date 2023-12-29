import { Ticket } from '../../application/entities/Ticket'
import { TicketRepository } from '../../application/repositories/TicketRepository'

export class FakeTicketRepository implements TicketRepository {
  private tickets: Ticket[] = []

  async save(ticket: Ticket): Promise<void> {
    this.tickets.push(ticket)
  }

  async listAll(): Promise<Ticket[]> {
    return this.tickets
  }

  async listById(id: string): Promise<Ticket | undefined> {
    return this.tickets.find((ticket) => ticket.getTicketId() === id)
    /* 
      for (let i = 0; i < this.tickets.length; i++) {
        const ticketId = this.tickets[i].getTicketId()
        if (ticketId === id) {
          return this.tickets[i]
        }
      } 
     */
  }

  async update(updatedTicket: Ticket): Promise<void> {
    const tickets = this.tickets.filter(
      (ticket) => ticket.getTicketId() !== updatedTicket.getTicketId(),
    )
    tickets.push(updatedTicket)
    this.tickets = tickets
  }
}
