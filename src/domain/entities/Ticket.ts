import { randomUUID } from 'crypto'
import { CreateTicketDTO } from '../../application/dtos/CreateTicketDTO'

type Status = 'Pending' | 'Done'
type Priority = 'Low' | 'Medium' | 'High'

export class Ticket {
  private ticketId: string
  private subject: string
  private description: string
  private createdDate: Date
  private customer: string
  private status: Status
  private priority: Priority
  private assignedAgent?: string

  constructor(input: CreateTicketDTO) {
    if (!this.isValidSubject(input.subject)) {
      throw new Error(
        'The maximum length for a Subject is 35 and minimum must be more than 0',
      )
    }

    this.ticketId = input.ticketId || randomUUID()
    this.subject = input.subject
    this.description = input.description
    this.status = 'Pending'
    this.priority = input.priority
    this.createdDate = new Date()
    this.assignedAgent = input.assignedAgent
    this.customer = input.customer
  }

  public getTicketId(): string {
    return this.ticketId
  }

  public getSubject(): string {
    return this.subject
  }

  public getDescription(): string {
    return this.description
  }

  public getCreatedDate(): Date {
    return this.createdDate
  }

  public getCustomer(): string {
    return this.customer
  }

  public getStatus(): Status {
    return this.status
  }

  public getPriority(): Priority {
    return this.priority
  }

  public getAssignedAgent(): string | undefined {
    return this.assignedAgent
  }

  public setAssignedAgent(agentName: string) {
    this.assignedAgent = agentName
  }

  private isValidSubject(subject: string): boolean {
    return subject.length > 0 && subject.length <= 35
  }
}
