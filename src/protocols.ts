import { TicketStatus } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type DataCreatedTicket = {
  status: TicketStatus,
  ticketTypeId: number,
  enrollmentId: number
};

export type PaymentProcessBody = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
  }
};

export type DataCreatedPayment = {
  ticketId: number,
  value: number,
  cardIssuer: "VISA" | "MASTERCARD",
  cardLastDigits: string
};
