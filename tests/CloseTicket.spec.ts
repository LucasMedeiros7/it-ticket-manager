import { beforeEach, describe, expect, it } from 'vitest'
import { FakeTicketRepository } from '../src/infra/repositories/FakeTicketRepository'
import { CreateTicketDTO } from '../src/application/dtos/CreateTicketDTO'
import { TicketRepository } from '../src/domain/repositories/TicketRepository.interface'
import { CreateTicket } from '../src/application/usecases/tickets/CreateTicket'
import { ListTicketById } from '../src/application/usecases/tickets/ListTicketById'
import { CloseTicket } from '../src/application/usecases/tickets/CloseTicket'

describe('Close Ticket', () => {
  let fakeRepository: TicketRepository

  let createTicket: CreateTicket
  let closeTicket: CloseTicket
  let listTicketById: ListTicketById

  let input: CreateTicketDTO

  beforeEach(() => {
    fakeRepository = new FakeTicketRepository()
    createTicket = new CreateTicket(fakeRepository)
    closeTicket = new CloseTicket(fakeRepository)
    listTicketById = new ListTicketById(fakeRepository)

    input = {
      subject: 'Problem in the testing environment',
      description:
        "Can't access the testing environment with the AWS console using the provided account!",
      priority: 'High',
      assignedAgent: 'John Doe',
      customer: 'Lucas Medeiros',
    }
  })

  it('Should be able to close a Ticket', async () => {
    const ticket = await createTicket.execute(input)
    await closeTicket.execute(ticket)
    const closedTicket = await listTicketById.execute(ticket.getTicketId())

    expect(closedTicket.getStatus()).toBe('Done')
  })
})
