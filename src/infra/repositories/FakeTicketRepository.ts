import { Ticket } from '../../domain/entities/Ticket'
import { TicketRepository } from '../../domain/repositories/TicketRepository.interface'

export class FakeTicketRepository implements TicketRepository {
  private db: Ticket[] = []

  async save(ticket: Ticket): Promise<void> {
    this.db.push(ticket)
  }

  async listAll(): Promise<Ticket[]> {
    return this.db
  }

  async listById(id: string): Promise<Ticket | undefined> {
    return this.db.find((ticket) => ticket.getTicketId() === id)
  }

  async updateTicket(updatedTicket: Ticket): Promise<void> {
    const ticketId = updatedTicket.getTicketId()
    const tickets = this.db.filter((t) => t.getTicketId() !== ticketId)
    if (tickets.length === this.db.length) {
      throw new Error(`Ticket with ID ${ticketId} does not exist`)
    }
    this.db = [...tickets, updatedTicket]
  }
}
