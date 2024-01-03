import { Application } from 'express'
import { TicketUseCasesFactory } from './Factory'
import { FakeTicketRepository } from './repositories/FakeTicketRepository'

const ticketRepository = new FakeTicketRepository()
const TicketUseCases = new TicketUseCasesFactory(ticketRepository)

export function registerRoutes(app: Application) {
  app.get('/tickets', async (req, res) => {
    const tickets = await TicketUseCases.listAllTickets.execute()
    return res.json(tickets)
  })

  app.get('/tickets/:id', async (req, res) => {
    const ticket = await TicketUseCases.listTIcketById.execute(req.params.id)
    return res.json(ticket)
  })

  app.post('/tickets', async (req, res) => {
    const { subject, description, priority, customer, assignedAgent } = req.body
    const ticket = await TicketUseCases.createTicket.execute({
      subject,
      description,
      priority,
      customer,
      assignedAgent: assignedAgent ?? undefined,
    })
    return res.status(201).json(ticket)
  })

  app.patch('/tickets/:id/close', async (req, res) => {
    const ticketId = req.params.id
    const ticket = await TicketUseCases.listTIcketById.execute(ticketId)
    await TicketUseCases.closeTicket.execute(ticket)
    return res.sendStatus(204)
  })

  app.patch('/tickets/:id/assignAgent', async (req, res) => {
    const ticketId = req.params.id
    const agentName = req.body.agentName
    console.log(req.body)
    const ticket = await TicketUseCases.listTIcketById.execute(ticketId)
    await TicketUseCases.assignAgent.execute(ticket, agentName)
    return res.sendStatus(204)
  })
}
