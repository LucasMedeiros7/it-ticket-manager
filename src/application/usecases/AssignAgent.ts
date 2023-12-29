import { Ticket } from '../entities/Ticket'
import { TicketRepository } from '../repositories/TicketRepository'

export class AssignAgent {
  constructor(private repository: TicketRepository) {}

  async execute(ticket: Ticket, agentName: string) {
    ticket.setAssignedAgent(agentName)
    await this.repository.update(ticket)
  }
}
