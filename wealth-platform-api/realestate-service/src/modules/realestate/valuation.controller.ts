import {
  Request,
  Response
} from "express";

import {
  createValuation
} from "./valuation.service";

export const create =
async (
  req: Request,
  res: Response
) => {

  try {

    const valuation =
      await createValuation({

        property_id:
          req.body.property_id,

        valuation_amount:
          req.body.valuation_amount,

        valuation_date:
          req.body.valuation_date
            ? new Date(
                req.body.valuation_date
              )
            : undefined

      });

    res.status(201).json({

      success: true,

      data: valuation

    });

  } catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message

    });

  }

};