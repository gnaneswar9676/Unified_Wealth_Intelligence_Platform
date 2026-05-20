import {
  Request,
  Response
} from "express";

import {

  createInvestor,
  getAllInvestors,
  getInvestorById

} from "./investor.service";

import {
  createInvestorSchema
} from "./investor.validation";

export const create =
async (
  req: Request,
  res: Response
) => {

  try {

    const validatedData =
      createInvestorSchema.parse(
        req.body
      );

    const investor =
      await createInvestor(
        validatedData
      );

    res.status(201).json({

      success: true,

      data: investor

    });

  } catch (error: any) {

    res.status(400).json({

      success: false,

      message: error.message

    });

  }

};

export const getAll =
async (
  req: Request,
  res: Response
) => {

  try {

    const investors =
      await getAllInvestors();

    res.json({

      success: true,

      data: investors

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

export const getById =
async (
  req: Request,
  res: Response
) => {

  try {

    const investor =
      await getInvestorById(
        req.params.id
      );

    res.json({

      success: true,

      data: investor

    });

  } catch (error: any) {

    res.status(404).json({

      success: false,

      message: error.message

    });

  }

};

