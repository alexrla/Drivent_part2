import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsTypes, getTickets, postCreateTickets  } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTickets)
  .post("/", validateBody(createTicketSchema), postCreateTickets);

export { ticketsRouter };
