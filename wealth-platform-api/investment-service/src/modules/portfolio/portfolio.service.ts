import prisma from "../../../../src/config/db";

import redisClient
from "../../../../src/config/redis";

export const getPortfolioSummary =
async (
  investorId: string
) => {

  const cachedPortfolio =
    await redisClient.get(

      `portfolio:${investorId}`

    );

  if (cachedPortfolio) {

    console.log(
      "CACHE HIT 🚀"
    );

    return JSON.parse(
      cachedPortfolio
    );

  }

  console.log(
    "DB HIT ⚡"
  );

  const investor =
    await prisma.investors.findUnique({

      where: {
        id: investorId
      }

    });

  if (!investor) {

    throw new Error(
      "Investor not found"
    );

  }

  const properties =
    await prisma.properties.findMany({

      where: {
        investor_id: investorId
      },

      include: {

        property_valuations: true,

        rental_agreements: true

      }

    });

  const equityHoldings =
    await prisma.equity_holdings.findMany({

      where: {
        investor_id: investorId
      },

      include: {
        equity_asset: true
      }

    });

  const mutualFunds =
    await prisma.mf_holdings.findMany({

      where: {
        investor_id: investorId
      },

      include: {
        mf_fund: true
      }

    });

  let realEstateValue = 0;

  properties.forEach((property) => {

    const latestValuation =
      property.property_valuations[0];

    if (
      latestValuation?.valuation_amount
    ) {

      realEstateValue += Number(

        latestValuation
          .valuation_amount

      );

    } else if (
      property.purchase_price
    ) {

      realEstateValue += Number(

        property.purchase_price

      );

    }

  });

  let equityValue = 0;

  equityHoldings.forEach((holding) => {

    equityValue +=

      Number(holding.quantity) *

      Number(
        holding.average_buy_price
      );

  });

  let mutualFundValue = 0;

  mutualFunds.forEach((holding) => {

    mutualFundValue +=

      Number(holding.units) *

      Number(
        holding.average_nav
      );

  });

  const totalWealth =

    realEstateValue +

    equityValue +

    mutualFundValue;

  const result = {

    investor,

    summary: {

      realEstateValue,

      equityValue,

      mutualFundValue,

      totalWealth

    },

    properties,

    equityHoldings,

    mutualFunds

  };

  await redisClient.set(

    `portfolio:${investorId}`,

    JSON.stringify(result),

    {

      EX: 300

    }

  );

  return result;

};