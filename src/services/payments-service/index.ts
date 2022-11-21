import { PaymentProcessBody, DataCreatedPayment } from "@/protocols";
import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import { exclude } from "@/utils/prisma-utils";

async function returnPayment(userId: number, ticketId: number) {
  const ticket = await paymentRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  if (ticket.Ticket.Enrollment.userId != userId) throw unauthorizedError();

  return exclude(ticket, "Ticket");
}

async function returnCreatedPayment(userId: number, paymentProcessBody: PaymentProcessBody) {
  const ticket = await paymentRepository.findTicketByTicketId(paymentProcessBody.ticketId);

  if(!ticket) throw notFoundError();

  if (ticket.Enrollment.User.id !== userId) throw unauthorizedError();

  await paymentRepository.updateTicketStatusById(paymentProcessBody.ticketId);

  const { ticketId, cardData } = paymentProcessBody;
  const { issuer, number } = cardData;

  const cardIssuer = issuer;
  const cardLastDigits = String(number).slice(-4);
  const value = ticket.TicketType.price;

  const dataCreatedPayment = {
    ticketId,
    value,
    cardIssuer,
    cardLastDigits
  } as DataCreatedPayment;

  return await paymentRepository.createPayment(dataCreatedPayment);
}

const paymentsService = {
  returnPayment,
  returnCreatedPayment
};

export default paymentsService;
