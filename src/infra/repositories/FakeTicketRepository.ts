import { Ticket } from '../../domain/entities/Ticket'
import { TicketRepository } from '../../domain/repositories/TicketRepository'

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
