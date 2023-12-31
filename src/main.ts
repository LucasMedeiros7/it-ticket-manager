import express from 'express'
import { FakeTicketRepository } from './infra/repositories/FakeTicketRepository'
import { TicketUseCasesFactory } from './Factory'

const app = express()
const PORT = process.env.PORT || 5151

const ticketRepository = new FakeTicketRepository()
const { listAllTickets, createTicket } = new TicketUseCasesFactory(
  ticketRepository,
)

app.use(express.json())

app.get('/tickets', async (req, res) => {
  const tickets = await listAllTickets.execute()
  return res.json(tickets)
})

app.post('/tickets', async (req, res) => {
  const { subject, description, priority, customer } = req.body
  const ticket = await createTicket.execute({
    subject,
    description,
    priority,
    customer,
  })
  return res.status(201).json(ticket)
})

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})
