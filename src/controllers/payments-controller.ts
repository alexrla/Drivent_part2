import { PaymentProcessBody } from "@/protocols";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query as Record<string, string>;

  if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.returnPayment(userId, Number(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function postCreatePayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentProcessBody = req.body as PaymentProcessBody;

  try {
    const paymentMade = await paymentsService.returnCreatedPayment(userId, paymentProcessBody);
    return res.status(httpStatus.OK).send(paymentMade);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
