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

  async updateAssignedAgent(updatedTicket: Ticket): Promise<void> {
    const ticket = this.tickets.find(
      (t) => t.getTicketId() === updatedTicket.getTicketId(),
    )
    if (!ticket) {
      throw new Error(
        `Ticket with ID ${updatedTicket.getTicketId()} does not exist`,
      )
    }
    ticket.setAssignedAgent(updatedTicket.getAssignedAgent())
  }
}
