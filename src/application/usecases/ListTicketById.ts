import { Ticket } from '../../domain/entities/Ticket'
import { TicketRepository } from '../../domain/repositories/TicketRepository'

export class ListTicketById {
  constructor(private repository: TicketRepository) {}

  async execute(ticketId: string): Promise<Ticket> {
    return await this.repository.listById(ticketId)
  }
}
