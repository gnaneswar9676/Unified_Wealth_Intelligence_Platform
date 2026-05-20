import prisma from "../../../../src/config/db";

type CreateValuationInput = {

  property_id: string;

  valuation_amount: number;

  valuation_date?: Date;

};

export const createValuation =
async (
  data: CreateValuationInput
) => {

  const property =
    await prisma.properties.findUnique({

      where: {
        id: data.property_id
      }

    });

  if (!property) {

    throw new Error(
      "Property not found"
    );

  }

  return await prisma.property_valuations.create({

    data: {

      property_id:
        data.property_id,

      valuation_amount:
        data.valuation_amount,

      valuation_date:
        data.valuation_date

    }

  });

};