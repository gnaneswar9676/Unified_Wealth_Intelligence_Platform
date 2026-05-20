import {
  Request,
  Response
} from "express";

import {

  createEquityHolding,
  getInvestorEquities

} from "./equity.service";

export const create =
async (
  req: Request,
  res: Response
) => {

  try {

    const holding =
      await createEquityHolding({

        investor_id:
          req.body.investor_id,

        stock_symbol:
          req.body.stock_symbol,

        company_name:
          req.body.company_name,

        exchange_name:
          req.body.exchange_name,

        quantity:
          req.body.quantity,

        average_buy_price:
          req.body.average_buy_price

      });

    res.status(201).json({

      success: true,

      data: holding

    });

  } catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message

    });

  }

};

export const getByInvestor =
async (
  req: Request,
  res: Response
) => {

  try {

    const holdings =
      await getInvestorEquities(

        req.params.investorId

      );

    res.json({

      success: true,

      data: holdings

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};