import {
  Request,
  Response
} from "express";

import {
  createRentalAgreement
} from "./rental.service";

export const create =
async (
  req: Request,
  res: Response
) => {

  try {

    const agreement =
      await createRentalAgreement({

        property_id:
          req.body.property_id,

        tenant_name:
          req.body.tenant_name,

        monthly_rent:
          req.body.monthly_rent,

        lease_start:
          req.body.lease_start
            ? new Date(
                req.body.lease_start
              )
            : undefined,

        lease_end:
          req.body.lease_end
            ? new Date(
                req.body.lease_end
              )
            : undefined

      });

    res.status(201).json({

      success: true,

      data: agreement

    });

  } catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message

    });

  }

};