import { prisma } from "@/config";
import { DataCreatedTicket } from "@/protocols";

async function findTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function findTickeyById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: { 
      enrollmentId 
    },
    include: { 
      TicketType: true 
    }
  });
}

async function createTicket(data: DataCreatedTicket) {
  const { status, ticketTypeId, enrollmentId } = data;

  return await prisma.ticket.create({
    data: {
      status: status,
      TicketType: {
        connect: {
          id: ticketTypeId
        }
      },
      Enrollment: {
        connect: {
          id: enrollmentId
        }
      }
    },
    include: {
      TicketType: true
    }
  });
}

const ticketRepository = {
  findTicketsTypes,
  findTickeyById,
  findTicketByEnrollmentId,
  createTicket
};

export default ticketRepository;
