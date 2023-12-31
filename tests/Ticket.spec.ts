import { describe, expect, it } from 'vitest'
import { CreateTicketDTO } from '../src/application/dtos/CreateTicketDTO'
import { Ticket } from '../src/domain/entities/Ticket'

describe('Create Ticket', () => {
  const payload: CreateTicketDTO = {
    subject: 'Issue in the staging environment',
    description:
      "I can't access the staging environment with the account I'm using to access the AWS console!",
    priority: 'High',
    assignedAgent: 'Anderson Gonhi',
    customer: 'Lucas Medeiros',
  }

  it('Should be able to create a Ticket', () => {
    const ticket = new Ticket(payload)
    expect(ticket).toBeDefined()
    expect(ticket.getTicketId()).toBeDefined()
    expect(ticket.getSubject()).toEqual(payload.subject)
    expect(ticket.getDescription()).toEqual(payload.description)
    expect(ticket.getPriority()).toEqual(payload.priority)
    expect(ticket.getStatus()).toEqual('Pending')
    expect(ticket.getCreatedDate()).toBeInstanceOf(Date)
    expect(ticket.getAssignedAgent()).toEqual(payload.assignedAgent)
    expect(ticket.getCustomer()).toEqual(payload.customer)
  })

  it('Should throw an error if the subject exceeds the maximum length', () => {
    const payloadWithLongSubject: CreateTicketDTO = {
      ...payload,
      subject:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }

    expect(() => new Ticket(payloadWithLongSubject)).toThrowError(
      'The maximum length for a Subject is 35 and minimum must be more than 0',
    )
  })
})
