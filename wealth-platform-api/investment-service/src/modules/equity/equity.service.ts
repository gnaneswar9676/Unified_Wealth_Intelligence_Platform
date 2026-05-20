import prisma from "../../config/db";

type CreateEquityInput = {

  investor_id: string;

  stock_symbol: string;

  company_name: string;

  exchange_name?: string;

  quantity: number;

  average_buy_price: number;

};

export const createEquityHolding =
async (
  data: CreateEquityInput
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
  FIND EXISTING ASSET
  ===================================
  */

  let asset =
    await prisma.equity_assets.findFirst({

      where: {

        stock_symbol:
          data.stock_symbol

      }

    });

  /*
  ===================================
  CREATE ASSET IF NOT EXISTS
  ===================================
  */

  if (!asset) {

    asset =
      await prisma.equity_assets.create({

        data: {

          stock_symbol:
            data.stock_symbol,

          company_name:
            data.company_name,

          exchange_name:
            data.exchange_name

        }

      });

  }

  /*
  ===================================
  CREATE HOLDING
  ===================================
  */

 const existingHolding =
  await prisma.equity_holdings.findFirst({

    where: {

      investor_id:
        data.investor_id,

      equity_asset_id:
        asset.id

    }

  });

let holding;

if (existingHolding) {

  holding =
    await prisma.equity_holdings.update({

      where: {

        id:
          existingHolding.id

      },

      data: {

        quantity: {

          increment:
            data.quantity

        }

      }

    });

} else {

  holding =
    await prisma.equity_holdings.create({

      data: {

        quantity:
          data.quantity,

        average_buy_price:
          data.average_buy_price,

        investor: {

          connect: {

            id:
              data.investor_id

          }

        },

        equity_asset: {

          connect: {

            id:
              asset.id

          }

        }

      }

    });

}}

export const getInvestorEquities =
async (
  investorId: string
) => {

  return await prisma.equity_holdings.findMany({

    where: {

      investor_id:
        investorId

    },

    include: {

      equity_asset: true

    }

  });

}