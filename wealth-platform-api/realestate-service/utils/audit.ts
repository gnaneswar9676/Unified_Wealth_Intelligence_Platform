import prisma from "../src/config/db";

type AuditInput = {

  user_id?: string;

  entity_name: string;

  entity_id?: string;

  action_type: string;

  metadata?: any;

};

export const createAuditLog =
async (
  data: AuditInput
) => {

  return await prisma.audit_logs.create({

    data

  });

};