import prisma from "../../config/db";

type CreateMFInput = {

  investor_id: string;

  fund_code: string;

  fund_name: string;

  category?: string;

  units: number;

  average_nav: number;

};

export const createMFHolding =
async (
  data: CreateMFInput
) => {

  /*
  ===================================
  CHECK INVESTOR
  ===================================
  */

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

  /*
  ===================================
  FIND EXISTING FUND
  ===================================
  */

  let fund =
    await prisma.mf_funds.findFirst({

      where: {

        fund_code:
          data.fund_code

      }

    });

  /*
  ===================================
  CREATE FUND IF NOT EXISTS
  ===================================
  */

  if (!fund) {

    fund =
      await prisma.mf_funds.create({

        data: {

          fund_code:
            data.fund_code,

          fund_name:
            data.fund_name,

          category:
            data.category

        }

      });

  }

  /*
  ===================================
  CHECK EXISTING HOLDING
  ===================================
  */

  const existingHolding =
    await prisma.mf_holdings.findFirst({

      where: {

        investor_id:
          data.investor_id,

        fund_id:
          fund.id

      }

    });

  let holding;

  /*
  ===================================
  UPDATE IF EXISTS
  ===================================
  */

  if (existingHolding) {

    holding =
      await prisma.mf_holdings.update({

        where: {

          id:
            existingHolding.id

        },

        data: {

          units: {

            increment:
              data.units

          }

        }

      });

  }

  /*
  ===================================
  CREATE NEW HOLDING
  ===================================
  */

  else {

    holding =
      await prisma.mf_holdings.create({

        data: {

          units:
            data.units,

          average_nav:
            data.average_nav,

          investor: {

            connect: {

              id:
                data.investor_id

            }

          },

          mf_fund: {

            connect: {

              id:
                fund.id

            }

          }

        }

      });

  }

  return holding;

};

export const getInvestorMFs =
async (
  investorId: string
) => {

  return await prisma.mf_holdings.findMany({

    where: {

      investor_id:
        investorId

    },

    include: {

      mf_fund: true

    }

  });

};