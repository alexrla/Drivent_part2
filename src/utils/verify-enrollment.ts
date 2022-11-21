import { requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";

export async function verifyEnrollment(userId: number) {
  const enrollmentExists = enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollmentExists) throw requestError(404, "BAD_REQUEST");

  return enrollmentExists;
}
