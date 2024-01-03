import { AssignAgent } from '../application/usecases/tickets/AssignAgent'
import { CloseTicket } from '../application/usecases/tickets/CloseTicket'
import { CreateTicket } from '../application/usecases/tickets/CreateTicket'
import { ListAllTickets } from '../application/usecases/tickets/ListAllTIckets'
import { ListTicketById } from '../application/usecases/tickets/ListTicketById'

import { TicketRepository } from '../domain/repositories/TicketRepository.interface'

export class TicketUseCasesFactory {
  private _assignAgent: AssignAgent
  private _createTicket: CreateTicket
  private _listAllTickets: ListAllTickets
  private _listTIcketById: ListTicketById
  private _closeTicket: CloseTicket

  constructor(ticketRepository: TicketRepository) {
    this._closeTicket = new CloseTicket(ticketRepository)
    this._assignAgent = new AssignAgent(ticketRepository)
    this._createTicket = new CreateTicket(ticketRepository)
    this._listAllTickets = new ListAllTickets(ticketRepository)
    this._listTIcketById = new ListTicketById(ticketRepository)
  }

  get closeTicket() {
    return this._closeTicket
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
