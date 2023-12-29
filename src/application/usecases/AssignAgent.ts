import { Ticket } from '../../domain/entities/Ticket'
import { TicketRepository } from '../../domain/repositories/TicketRepository'

export class AssignAgent {
  constructor(private repository: TicketRepository) {}

  async execute(ticket: Ticket, agentName: string) {
    ticket.setAssignedAgent(agentName)
    await this.repository.updateAssignedAgent(ticket)
  }
}
