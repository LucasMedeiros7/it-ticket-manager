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
}
