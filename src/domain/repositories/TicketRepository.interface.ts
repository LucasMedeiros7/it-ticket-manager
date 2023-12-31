import { Ticket } from '../entities/Ticket'

export interface TicketRepository {
  save(ticket: Ticket): Promise<void>
  listAll(): Promise<Ticket[]>
  listById(id: string): Promise<Ticket | undefined>
  updateTicket(ticket: Ticket): Promise<void>
}
