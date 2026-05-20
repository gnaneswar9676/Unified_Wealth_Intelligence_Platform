import {
  Request,
  Response
} from "express";

import {
  createProperty,
  getInvestorProperties
} from "./property.service";

import {
  createPropertySchema
} from "./property.validation";

import {
  AuthRequest
} from "../../../../api-gateway/src/middlewares/auth.middleware";

export const create =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const validatedData =
      createPropertySchema.parse(
        req.body
      );

    const property =
      await createProperty({

        investor_id:
          validatedData.investor_id,

        property_name:
          validatedData.property_name,

        property_type:
          validatedData.property_type,

        purchase_price:
          validatedData.purchase_price,

        purchase_date:
          validatedData.purchase_date
            ? new Date(
                validatedData.purchase_date
              )
            : undefined,

        user_id:
          req.user?.userId

      });

    res.status(201).json({

      success: true,

      data: property

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

    const properties =
      await getInvestorProperties(
        req.params.investorId
      );

    res.json({

      success: true,

      data: properties

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};