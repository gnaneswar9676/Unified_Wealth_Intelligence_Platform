import {
  Request,
  Response
} from "express";

import {
  getPortfolioSummary
} from "./portfolio.service";

export const getPortfolio =
async (
  req: Request,
  res: Response
) => {

  try {

    const portfolio =
      await getPortfolioSummary(
        req.params.investorId
      );

    res.json({

      success: true,

      data: portfolio

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

