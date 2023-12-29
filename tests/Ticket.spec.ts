import { describe, expect, it } from 'vitest'
import { Input, Ticket } from '../src/application/entities/Ticket'

describe('Create Ticket', () => {
  const payload: Input = {
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
    expect(ticket.ticketId).toBeDefined()
    expect(ticket.subject).toEqual(payload.subject)
    expect(ticket.description).toEqual(payload.description)
    expect(ticket.priority).toEqual(payload.priority)
    expect(ticket.status).toEqual('Pending')
    expect(ticket.createdDate).toBeInstanceOf(Date)
    expect(ticket.assignedAgent).toEqual(payload.assignedAgent)
    expect(ticket.customer).toEqual(payload.customer)
  })

  it('Should throw an error if the subject exceeds the maximum length', () => {
    const payloadWithLongSubject: Input = {
      ...payload,
      subject:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    }

    expect(() => new Ticket(payloadWithLongSubject)).toThrowError(
      'The maximum length for a Subject is 35 and minimum must be more than 0',
    )
  })
})
