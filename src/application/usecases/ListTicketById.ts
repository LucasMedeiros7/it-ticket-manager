import { Ticket } from '../entities/Ticket'
import { TicketRepository } from '../repositories/TicketRepository'

export class ListTicketById {
  constructor(private repository: TicketRepository) {}

  async execute(ticketId: string): Promise<Ticket> {
    return await this.repository.listById(ticketId)
  }
}
