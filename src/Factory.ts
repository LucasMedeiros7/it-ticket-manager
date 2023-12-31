import { AssignAgent } from './application/usecases/AssignAgent'
import { CreateTicket } from './application/usecases/CreateTicket'
import { ListAllTickets } from './application/usecases/ListAllTIckets'
import { ListTicketById } from './application/usecases/ListTicketById'

import { TicketRepository } from './domain/repositories/TicketRepository'

export class TicketUseCasesFactory {
  private _assignAgent: AssignAgent
  private _createTicket: CreateTicket
  private _listAllTickets: ListAllTickets
  private _listTIcketById: ListTicketById

  constructor(ticketRepository: TicketRepository) {
    this._assignAgent = new AssignAgent(ticketRepository)
    this._createTicket = new CreateTicket(ticketRepository)
    this._listAllTickets = new ListAllTickets(ticketRepository)
    this._listTIcketById = new ListTicketById(ticketRepository)
  }

  get assignAgent() {
    return this._assignAgent
  }

  get createTicket() {
    return this._createTicket
  }

  get listAllTickets() {
    return this._listAllTickets
  }

  get listTIcketById() {
    return this._listTIcketById
  }
}
