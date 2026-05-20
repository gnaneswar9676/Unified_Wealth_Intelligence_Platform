import {
  Router
} from "express";

import {

  getAllLogs

} from "./audit.controller";

import {
  authMiddleware
} from "../../../../api-gateway/src/middlewares/auth.middleware";

import {
  authorizeRoles
} from "../../../../api-gateway/src/middlewares/rbac.middleware";

const router =
  Router();

router.get(

  "/",

  authMiddleware,

  authorizeRoles("admin"),

  getAllLogs

);

export default router;