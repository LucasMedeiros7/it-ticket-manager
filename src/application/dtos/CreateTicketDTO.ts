export type CreateTicketDTO = {
  ticketId?: string
  subject: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  assignedAgent?: string
  customer: string
}
