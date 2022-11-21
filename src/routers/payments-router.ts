import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayments, postCreatePayments } from "@/controllers";
import { createPaymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process", validateBody(createPaymentSchema), postCreatePayments);

export { paymentsRouter };
