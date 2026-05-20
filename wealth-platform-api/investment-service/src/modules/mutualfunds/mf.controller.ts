import {
  Request,
  Response
} from "express";

import {

  createMFHolding,
  getInvestorMFs

} from "./mf.service";

export const create =
async (
  req: Request,
  res: Response
) => {

  try {

    const holding =
      await createMFHolding({

        investor_id:
          req.body.investor_id,

        fund_code:
          req.body.fund_code,

        fund_name:
          req.body.fund_name,

        category:
          req.body.category,

        units:
          req.body.units,

        average_nav:
          req.body.average_nav

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
      await getInvestorMFs(

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