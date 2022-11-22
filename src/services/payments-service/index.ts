import { PaymentProcessBody, DataCreatedPayment } from "@/protocols";
import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { exclude } from "@/utils/prisma-utils";

async function returnPayment(userId: number, ticketId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);

  if(!ticket) throw notFoundError(); 

  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);

  if(enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentRepository.findTicketById(ticketId);

  return exclude(payment, "Ticket");
}

async function returnCreatedPayment(userId: number, paymentProcessBody: PaymentProcessBody) {
  const ticket = await paymentRepository.findTicketByTicketId(paymentProcessBody.ticketId);

  if(!ticket) throw notFoundError();

  if(ticket.Enrollment.User.id !== userId) throw unauthorizedError();

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
