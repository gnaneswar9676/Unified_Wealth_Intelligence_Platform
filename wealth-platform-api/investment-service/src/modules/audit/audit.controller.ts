import {

  Request,
  Response

} from "express";

import {

  getAuditLogs

} from "./audit.service";

export const getAllLogs =
async (

  req: Request,

  res: Response

) => {

  try {

    const logs =
      await getAuditLogs();

    res.status(200).json({

      success: true,

      data: logs

    });

  } catch (error: any) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};