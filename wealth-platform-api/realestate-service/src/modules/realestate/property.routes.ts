import { Router }
from "express";

import {

  create,
  getByInvestor

} from "./property.controller";

import {
  authMiddleware
} from "../../../../api-gateway/src/middlewares/auth.middleware";

import {
  authorizeRoles
} from "../../../../api-gateway/src/middlewares/rbac.middleware";

const router = Router();

router.post(

  "/",

  authMiddleware,

   authorizeRoles("admin",
    "investor"),

  create

);

router.get(

  "/:investorId",

  authMiddleware,

  getByInvestor

);

export default router;