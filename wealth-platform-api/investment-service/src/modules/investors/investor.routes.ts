import { Router }
from "express";
import {
  authorizeRoles
} from "../../../../api-gateway/src/middlewares/rbac.middleware";
import {

  create,
  getAll,
  getById

} from "./investor.controller";

import {
  authMiddleware
} from "../../../../api-gateway/src/middlewares/auth.middleware";

const router = Router();

router.post(

  "/",

  authMiddleware,

  authorizeRoles("admin"),

  create

);

router.get(
  "/",
  authMiddleware,
  getAll
);

router.get(
  "/:id",
  authMiddleware,
  getById
);

export default router;