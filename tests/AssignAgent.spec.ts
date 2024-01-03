import { beforeEach, describe, expect, it } from 'vitest'
import { FakeTicketRepository } from '../src/infra/repositories/FakeTicketRepository'
import { CreateTicketDTO } from '../src/application/dtos/CreateTicketDTO'
import { TicketRepository } from '../src/domain/repositories/TicketRepository.interface'
import { CreateTicket } from '../src/application/usecases/tickets/CreateTicket'
import { ListTicketById } from '../src/application/usecases/tickets/ListTicketById'
import { AssignAgent } from '../src/application/usecases/tickets/AssignAgent'

describe('Assign Agent', () => {
  let fakeRepository: TicketRepository

  let createTicket: CreateTicket
  let listTicketById: ListTicketById
  let assignAgent: AssignAgent

  let input: CreateTicketDTO

  beforeEach(() => {
    fakeRepository = new FakeTicketRepository()
    createTicket = new CreateTicket(fakeRepository)
    listTicketById = new ListTicketById(fakeRepository)
    assignAgent = new AssignAgent(fakeRepository)

    input = {
      subject: 'Problem in the testing environment',
      description:
        "Can't access the testing environment with the AWS console using the provided account!",
      priority: 'High',
      customer: 'Lucas Medeiros',
    }
  })

  it('Should be able to assign an Agent to a Ticket', async () => {
    const ticket = await createTicket.execute(input)

    assignAgent.execute(ticket, 'Anderson Gonhi')

    const updatedTicket = await listTicketById.execute(ticket.getTicketId())

    expect(updatedTicket.getAssignedAgent()).toBe('Anderson Gonhi')
    expect(updatedTicket.getTicketId()).toBe(ticket.getTicketId())
  })

  it('Should be able to change the Agent of a Ticket', async () => {
    const ticket = await createTicket.execute({
      ...input,
      assignedAgent: 'Anderson Gonhi',
    })

    assignAgent.execute(ticket, 'Jonh Doe')

    const updatedTicket = await listTicketById.execute(ticket.getTicketId())

    expect(updatedTicket.getAssignedAgent()).toBe('Jonh Doe')
    expect(updatedTicket.getTicketId()).toBe(ticket.getTicketId())
  })
})
