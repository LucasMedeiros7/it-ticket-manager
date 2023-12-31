import { Ticket } from '../../domain/entities/Ticket'
import { TicketRepository } from '../../domain/repositories/TicketRepository'
import { UseCase } from './UseCase'

export class ListAllTickets implements UseCase {
  constructor(private repository: TicketRepository) {}

  async execute(): Promise<Ticket[]> {
    return await this.repository.listAll()
  }
}
