/* eslint-disable no-use-before-define */
import { randomUUID } from 'crypto'

type Status = 'Pending' | 'Done'
type Priority = 'Low' | 'Medium' | 'High'

export type Input = Omit<Ticket, 'createdDate' | 'status'>

export class Ticket {
  readonly ticketId?: string
  readonly subject: string
  readonly description: string
  readonly createdDate: Date
  readonly customer: string
  readonly status: Status
  readonly priority: Priority
  readonly assignedAgent?: string

  constructor(input: Input) {
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

  private isValidSubject(subject: string): boolean {
    return subject.length > 0 && subject.length <= 35
  }
}
