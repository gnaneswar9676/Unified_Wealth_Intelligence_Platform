import { Router }
from "express";

import {

  create,
  getByInvestor

} from "./equity.controller";

const router = Router();

router.post(
  "/",
  create
);

router.get(
  "/:investorId",
  getByInvestor
);

export default router;