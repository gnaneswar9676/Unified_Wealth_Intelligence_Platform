import { Router }
from "express";

import {
  create
} from "./valuation.controller";

import {
  authMiddleware
} from "../../../../api-gateway/src/middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  create
);

export default router;