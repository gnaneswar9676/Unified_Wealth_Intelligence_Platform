import {

  Request,
  Response

} from "express";

import {

  getAdminStats

} from "./admin.service";

export const stats =
async (

  req: Request,

  res: Response

) => {

  try {

    const data =
      await getAdminStats();

    res.status(200).json({

      success: true,

      data

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};