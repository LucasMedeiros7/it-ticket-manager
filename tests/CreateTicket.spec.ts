import { describe, expect, it, beforeEach } from 'vitest'
import { CreateTicketDTO } from '../src/application/dtos/CreateTicketDTO'
import { CreateTicket } from '../src/application/usecases/tickets/CreateTicket'
import { TicketRepository } from '../src/domain/repositories/TicketRepository.interface'
import { FakeTicketRepository } from '../src/infra/repositories/FakeTicketRepository'

describe('Create Ticket Use Case', () => {
  let fakeRepository: TicketRepository
  let createTicket: CreateTicket
  let input: CreateTicketDTO

  beforeEach(() => {
    fakeRepository = new FakeTicketRepository()
    createTicket = new CreateTicket(fakeRepository)
    input = {
      subject: 'Problem in the testing environment',
      description:
        "Can't access the testing environment with the AWS console using the provided account!",
      priority: 'High',
      assignedAgent: 'Anderson Gonhi',
      customer: 'Lucas Medeiros',
    }
  })

  it('should be able to create a ticket and save it in the database', async () => {
    const output = await createTicket.execute(input)
    const savedTicket = await fakeRepository.listAll()
    expect(savedTicket[0].getTicketId()).toBe(output.getTicketId())
  })

  it('should assign the ticket to the specified agent', async () => {
    await createTicket.execute(input)
    const savedTicket = await fakeRepository.listAll()
    expect(savedTicket[0].getAssignedAgent()).toBe(input.assignedAgent)
  })

  it('should set the default status to "Pending" for a new ticket', async () => {
    await createTicket.execute(input)
    const savedTicket = await fakeRepository.listAll()
    expect(savedTicket[0].getStatus()).toBe('Pending')
  })

  it('should not allow creating a ticket without a subject', async () => {
    expect(async () => {
      await createTicket.execute({ ...input, subject: '' })
    }).rejects.toThrowError(
      'The maximum length for a Subject is 35 and minimum must be more than 0',
    )
  })
})
