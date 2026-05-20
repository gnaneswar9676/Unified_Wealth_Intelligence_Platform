import prisma
from "../../../../src/config/db";

export const getAdminStats =
async () => {

  const totalInvestors =
    await prisma.investors.count();

  const totalProperties =
    await prisma.properties.count();

  const totalEquities =
    await prisma.equity_holdings.count();

  const totalMutualFunds =
    await prisma.mf_holdings.count();

  return {

    totalInvestors,

    totalProperties,

    totalEquities,

    totalMutualFunds

  };

};