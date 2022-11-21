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
          Enrollment: {
            include: {
              User: true
            }
          }
        },
      }
    }
  });
}

async function findUserById(userId: number) {
  return await prisma.user.findFirst({
    where: {
      id: userId
    },
    include: {
      Enrollment: {
        include: {
          Ticket: {
            include: {
              TicketType: true
            }
          }
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
  findUserById,
  findTicketByTicketId,
  updateTicketStatusById,
  createPayment
};

export default paymentRepository;
