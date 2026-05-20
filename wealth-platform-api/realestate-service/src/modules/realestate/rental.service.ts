import prisma from "../../../../src/config/db";

type CreateRentalInput = {

  property_id: string;

  tenant_name: string;

  monthly_rent: number;

  lease_start?: Date;

  lease_end?: Date;

};

export const createRentalAgreement =
async (
  data: CreateRentalInput
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

  const agreement =
    await prisma.rental_agreements.create({

      data: {

        property_id:
          data.property_id,

        tenant_name:
          data.tenant_name,

        monthly_rent:
          data.monthly_rent,

        lease_start:
          data.lease_start,

        lease_end:
          data.lease_end

      }

    });

  return agreement;

};