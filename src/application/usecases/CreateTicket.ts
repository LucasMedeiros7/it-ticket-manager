import { CreateTicketDTO } from '../dtos/CreateTicketDTO'
import { TicketRepository } from '../../domain/repositories/TicketRepository'
import { Ticket } from '../../domain/entities/Ticket'

export class CreateTicket {
  constructor(private repository: TicketRepository) {}

  async execute(createTicketDTO: CreateTicketDTO): Promise<Ticket> {
    const ticket = new Ticket(createTicketDTO)
    await this.repository.save(ticket)
    return ticket
  }
}
