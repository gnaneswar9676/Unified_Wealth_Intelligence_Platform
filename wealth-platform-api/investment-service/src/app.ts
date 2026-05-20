import express from "express";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";
import mfRoutes
from "./modules/mutualfunds/mf.routes";
import portfolioRoutes
from "./modules/portfolio/portfolio.routes";
import auditRoutes
from "../src/modules/audit/audit.routes";
import dashboardRoutes
from "./modules/dashboard/dashboard.routes";
import equityRoutes
from "./modules/equity/equity.routes";
import investorRoutes
from "../src/modules/investors/investor.routes"

const app = express();

/*
====================================
MIDDLEWARES
====================================
*/

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

/*
====================================
INVESTMENT ROUTES
====================================


*/
app.use(

  "/investors",

  investorRoutes

);
app.use(

  "/equities",

  equityRoutes

);
app.use(

  "/audit-logs",

  auditRoutes

);
app.use(

  "/mutualfunds",

  mfRoutes

);
app.use(

  "/portfolio",

  portfolioRoutes

);

app.use(

  "/dashboard",

  dashboardRoutes

);

/*
====================================
HEALTH CHECK
====================================
*/

app.get(

  "/",

  (_, res) => {

    res.json({

      success: true,

      message:
        "Investment Service Running 🚀"

    });

  }

);

export default app;