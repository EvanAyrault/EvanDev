export interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  createdAt: string;
}

class TicketService {
  private readonly STORAGE_KEY = 'contact_tickets';

  private getTickets(): Ticket[] {
    if (typeof window === 'undefined') return [];
    const tickets = localStorage.getItem(this.STORAGE_KEY);
    return tickets ? JSON.parse(tickets) : [];
  }

  private saveTickets(tickets: Ticket[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tickets));
  }

  createTicket(ticket: Omit<Ticket, 'id' | 'status' | 'createdAt'>): Ticket {
    const tickets = this.getTickets();
    const newTicket: Ticket = {
      ...ticket,
      id: Math.random().toString(36).substr(2, 9),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    tickets.unshift(newTicket);
    this.saveTickets(tickets);
    return newTicket;
  }

  getAllTickets(): Ticket[] {
    return this.getTickets();
  }

  updateTicketStatus(id: string, status: Ticket['status']): void {
    const tickets = this.getTickets();
    const index = tickets.findIndex(ticket => ticket.id === id);
    if (index !== -1) {
      tickets[index].status = status;
      this.saveTickets(tickets);
    }
  }

  deleteTicket(id: string): void {
    const tickets = this.getTickets();
    const filteredTickets = tickets.filter(ticket => ticket.id !== id);
    this.saveTickets(filteredTickets);
  }
}

export const ticketService = new TicketService(); 