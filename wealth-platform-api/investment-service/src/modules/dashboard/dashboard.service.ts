import prisma from "../../../../src/config/db";

export const getDashboardData =
async (
  investorId: string
) => {

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
      }

    });

  const mutualFunds =
    await prisma.mf_holdings.findMany({

      where: {
        investor_id: investorId
      }

    });

  let realEstateValue = 0;

  let monthlyRentalIncome = 0;

  properties.forEach((property) => {

    const latestValuation =
      property.property_valuations[0];

    if (latestValuation?.valuation_amount) {

      realEstateValue += Number(
        latestValuation.valuation_amount
      );

    } else if (property.purchase_price) {

      realEstateValue += Number(
        property.purchase_price
      );

    }

    property.rental_agreements.forEach(
      (agreement) => {

        if (agreement.monthly_rent) {

          monthlyRentalIncome +=
            Number(
              agreement.monthly_rent
            );

        }

      }
    );

  });

  let equityValue = 0;

  equityHoldings.forEach((holding) => {

    equityValue +=
      Number(holding.quantity) *
      Number(holding.average_buy_price);

  });

  let mutualFundValue = 0;

  mutualFunds.forEach((holding) => {

    mutualFundValue +=
      Number(holding.units) *
      Number(holding.average_nav);

  });

  const totalWealth =
    realEstateValue +
    equityValue +
    mutualFundValue;

  const assetAllocation = {

    realEstate:
      totalWealth > 0
        ? (
            realEstateValue /
            totalWealth
          ) * 100
        : 0,

    equities:
      totalWealth > 0
        ? (
            equityValue /
            totalWealth
          ) * 100
        : 0,

    mutualFunds:
      totalWealth > 0
        ? (
            mutualFundValue /
            totalWealth
          ) * 100
        : 0

  };

  return {

    investor: {

      id: investor.id,

      full_name:
        investor.full_name,

      risk_profile:
        investor.risk_profile

    },

    summary: {

      totalWealth,

      realEstateValue,

      equityValue,

      mutualFundValue,

      monthlyRentalIncome

    },

    assetAllocation

  };

};