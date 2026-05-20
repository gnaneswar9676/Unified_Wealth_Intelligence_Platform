import { Router }
from "express";

import {
  getPortfolio
} from "./portfolio.controller";

import {
  authMiddleware
} from "../../../../api-gateway/src/middlewares/auth.middleware";

const router = Router();

router.get(

  "/:investorId",

  authMiddleware,

  getPortfolio

);

export default router;