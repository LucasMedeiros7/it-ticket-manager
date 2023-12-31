import { CreateTicketDTO } from '../dtos/CreateTicketDTO'
import { TicketRepository } from '../../domain/repositories/TicketRepository.interface'
import { Ticket } from '../../domain/entities/Ticket'
import { UseCase } from './UseCase.interface'

export class CreateTicket implements UseCase {
  constructor(private repository: TicketRepository) {}

  async execute(createTicketDTO: CreateTicketDTO): Promise<Ticket> {
    const ticket = new Ticket(createTicketDTO)
    await this.repository.save(ticket)
    return ticket
  }
}
