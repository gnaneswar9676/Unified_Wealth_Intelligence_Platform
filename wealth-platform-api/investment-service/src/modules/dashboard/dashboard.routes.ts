import { Router }
from "express";

import {
  getDashboard
} from "./dashboard.controller";

import {
  authMiddleware
} from "../../../../api-gateway/src/middlewares/auth.middleware";

const router = Router();

router.get(

  "/:investorId",

  authMiddleware,

  getDashboard

);

export default router;