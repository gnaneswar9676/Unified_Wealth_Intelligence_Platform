import prisma
from "../../../../src/config/db";

export const getAuditLogs =
async () => {

  return await prisma.audit_logs.findMany({

    orderBy: {

      created_at:
        "desc"

    },

    include: {

      user: {

        select: {

          id: true,

          full_name: true,

          email: true

        }

      }

    }

  });

};