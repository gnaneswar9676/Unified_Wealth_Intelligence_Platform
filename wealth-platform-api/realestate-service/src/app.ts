import express from "express";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";

import propertyRoutes
from "./modules/realestate/property.routes";

import valuationRoutes
from "./modules/realestate/valuation.routes";

import rentalRoutes
from "./modules/realestate/rental.routes";

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
REALESTATE ROUTES
====================================
*/

app.use(

  "/properties",

  propertyRoutes

);

app.use(

  "/property-valuations",

  valuationRoutes

);

app.use(

  "/rental-agreements",

  rentalRoutes

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
        "RealEstate Service Running 🚀"

    });

  }

);

export default app;