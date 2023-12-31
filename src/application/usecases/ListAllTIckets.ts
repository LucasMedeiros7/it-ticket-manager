import { Ticket } from '../../domain/entities/Ticket'
import { TicketRepository } from '../../domain/repositories/TicketRepository.interface'
import { UseCase } from './UseCase.interface'

export class ListAllTickets implements UseCase {
  constructor(private repository: TicketRepository) {}

  async execute(): Promise<Ticket[]> {
    return await this.repository.listAll()
  }
}
