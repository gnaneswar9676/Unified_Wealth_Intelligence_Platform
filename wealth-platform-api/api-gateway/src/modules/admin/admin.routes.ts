import {
  Router
} from "express";

import {
  stats
} from "./admin.controller";

const router =
  Router();

router.get(
  "/stats",
  stats
);

export default router;