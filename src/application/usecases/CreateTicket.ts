/* eslint-disable no-useless-constructor */
import { Input as CreateTicketDTO, Ticket } from '../entities/Ticket'
import { TicketRepository } from '../repositories/TicketRepository'

export class CreateTicket {
  constructor(private repository: TicketRepository) {}

  async execute(createTicketDTO: CreateTicketDTO): Promise<Ticket> {
    const ticket = new Ticket(createTicketDTO)
    await this.repository.save(ticket)
    return ticket
  }
}
