import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTicket } from '../src/application/usecases/CreateTicket'
import { FakeTicketRepository } from '../src/infra/repositories/FakeTicketRepository'
import { ListTicketById } from '../src/application/usecases/ListTicketById'
import { AssignAgent } from '../src/application/usecases/AssignAgent'
import { CreateTicketDTO } from '../src/application/dtos/CreateTicketDTO'
import { TicketRepository } from '../src/application/repositories/TicketRepository'

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

  it('Deve ser possivel atribuir um Ticket a um Agent', async () => {
    const ticket = await createTicket.execute(input)

    assignAgent.execute(ticket, 'Anderson Gonhi')
    const output = await listTicketById.execute(ticket.getTicketId())

    expect(output.getAssignedAgent()).toBe('Anderson Gonhi')
    expect(output.getTicketId()).toBe(ticket.getTicketId())
  })
})
