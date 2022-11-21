import { prisma } from "@/config";
import { DataCreatedPayment } from "@/protocols";

async function findTicketById(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId
    },
    include: {
      Ticket: {
        include: {
          Enrollment: true
        },
      }
    }
  });
}

async function findTicketByTicketId(ticketId: number) {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true,
      Enrollment: {
        include: {
          User: true
        }
      }
    },
  });
}

async function updateTicketStatusById(ticketId: number) {
  await prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  });
}

async function createPayment(data: DataCreatedPayment) {
  return await prisma.payment.create({
    data
  });
}

const paymentRepository = {
  findTicketById,
  findTicketByTicketId,
  updateTicketStatusById,
  createPayment
};

export default paymentRepository;
