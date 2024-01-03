import { describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '../../src/app'

const newTicket = {
  subject: 'New Ticket',
  description: 'Description of new ticket',
  priority: 'High',
  customer: 'Client Name',
}

describe('[GET] /tickets', () => {
  it('Should return the list of tickets', async () => {
    await request(app).post('/tickets').send(newTicket)
    const response = await request(app).get('/tickets')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(expect.any(Array))
    expect(response.body).toHaveLength(1)
  })
})

describe('[POST] /tickets', () => {
  it('Should be create a new ticket', async () => {
    const response = await request(app).post('/tickets').send(newTicket)

    expect(response.status).toBe(201)

    expect(response.body.ticketId).toString()
    expect(response.body).toMatchObject(newTicket)
    expect(new Date(response.body.createdDate)).toBeTruthy()
  })
})
