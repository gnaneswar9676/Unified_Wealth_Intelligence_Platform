import {
  Request,
  Response
} from "express";

import {
  getDashboardData
} from "./dashboard.service";

export const getDashboard =
async (
  req: Request,
  res: Response
) => {

  try {

    const dashboard =
      await getDashboardData(
        req.params.investorId
      );

    res.json({

      success: true,

      data: dashboard

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};