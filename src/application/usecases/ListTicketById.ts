import { Ticket } from '../../domain/entities/Ticket'
import { TicketRepository } from '../../domain/repositories/TicketRepository.interface'
import { UseCase } from './UseCase.interface'

export class ListTicketById implements UseCase {
  constructor(private repository: TicketRepository) {}

  async execute(ticketId: string): Promise<Ticket> {
    return await this.repository.listById(ticketId)
  }
}
