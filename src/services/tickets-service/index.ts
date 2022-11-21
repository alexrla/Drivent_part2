import { DataCreatedTicket } from "@/protocols";
import { requestError } from "@/errors";
import { verifyEnrollment } from "@/utils/verify-enrollment";
import ticketRepository from "@/repositories/ticket-repository";

async function returnTicketsTypes() {
  const result = await ticketRepository.findTicketsTypes();

  return result;
}

async function returnTickets(userId: number) {
  const enrollment = await verifyEnrollment(userId);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if(!ticket) throw requestError(404, "BAD_REQUEST");

  return ticket;
}

async function returnCreatedTicket(userId: number, tickeTypeId: number) {
  const enrollment = await verifyEnrollment(userId);

  const dataCreatedTicket = {
    status: "RESERVED",
    ticketTypeId: tickeTypeId,
    enrollmentId: enrollment.id,
  } as DataCreatedTicket;

  return await ticketRepository.createTicket(dataCreatedTicket);
}

const ticketsService = {
  returnTicketsTypes,
  returnTickets,
  returnCreatedTicket
};

export default ticketsService;
