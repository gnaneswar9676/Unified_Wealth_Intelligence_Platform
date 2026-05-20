import prisma from "../../../../src/config/db";

type CreateInvestorInput = {

  investor_code: string;

  full_name: string;

  pan_number?: string;

  risk_profile?: string;

};

export const createInvestor =
async (
  data: CreateInvestorInput
) => {

  const existingInvestor =
    await prisma.investors.findUnique({

      where: {
        investor_code:
          data.investor_code
      }

    });

  if (existingInvestor) {

    throw new Error(
      "Investor already exists"
    );

  }

  const investor =
    await prisma.investors.create({

      data

    });

  return investor;

};

export const getAllInvestors =
async () => {

  return await prisma.investors.findMany({

    orderBy: {
      created_at: "desc"
    }

  });

};

export const getInvestorById =
async (
  id: string
) => {

  const investor =
    await prisma.investors.findUnique({

      where: { id }

    });

  if (!investor) {

    throw new Error(
      "Investor not found"
    );

  }

  return investor;

};