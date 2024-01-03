import { Ticket } from '../../../domain/entities/Ticket'
import { TicketRepository } from '../../../domain/repositories/TicketRepository.interface'
import { UseCase } from '../UseCase.interface'

export class CloseTicket implements UseCase {
  constructor(private repository: TicketRepository) {}

  async execute(ticket: Ticket) {
    ticket.close()
    await this.repository.updateTicket(ticket)
  }
}
