import prisma from "../../../../src/config/db";

import {
  createAuditLog
} from "../../../../src/utils/audit";

type CreatePropertyInput = {

  investor_id: string;

  property_name?: string;

  property_type?: string;

  purchase_price?: number;

  purchase_date?: Date;

  user_id?: string;

};

export const createProperty =
async (
  data: CreatePropertyInput
) => {

  const investor =
    await prisma.investors.findUnique({

      where: {
        id: data.investor_id
      }

    });

  if (!investor) {

    throw new Error(
      "Investor not found"
    );

  }

  const property =
    await prisma.properties.create({

      data: {

        investor_id:
          data.investor_id,

        property_name:
          data.property_name,

        property_type:
          data.property_type,

        purchase_price:
          data.purchase_price,

        purchase_date:
          data.purchase_date

      }

    });

  await createAuditLog({

    user_id:
      data.user_id,

    entity_name:
      "properties",

    entity_id:
      property.id,

    action_type:
      "CREATE_PROPERTY",

    metadata:
      property

  });

  return property;

};

export const getInvestorProperties =
async (
  investorId: string
) => {

  return await prisma.properties.findMany({

    where: {
      investor_id: investorId
    },

    include: {

      property_valuations: true,

      rental_agreements: true

    }

  });

};