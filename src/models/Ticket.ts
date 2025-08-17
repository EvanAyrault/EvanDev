export interface Ticket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'nouveau' | 'en_cours' | 'résolu';
  createdAt: Date;
  updatedAt: Date;
}

export type TicketStatus = Ticket['status']; 