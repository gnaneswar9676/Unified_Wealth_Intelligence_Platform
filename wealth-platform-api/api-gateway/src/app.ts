import express from "express";

import cors from "cors";

import helmet from "helmet";

import morgan from "morgan";

import adminRoutes
from "./modules/admin/admin.routes";
import {

  createProxyMiddleware,
  fixRequestBody

} from "http-proxy-middleware";

import authRoutes
from "./modules/auth/auth.routes";

import {
  authMiddleware
} from "./middlewares/auth.middleware";

const app = express();

/*
=====================================
GLOBAL MIDDLEWARES
=====================================
*/

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

/*
=====================================
AUTH ROUTES
=====================================
*/

app.use(

  "/auth",

  authRoutes

);

/*
=====================================
REALESTATE MICROSERVICE
=====================================
*/
app.use(
  "/admin",
  adminRoutes
);

app.use(

  "/realestate",

  authMiddleware,

  createProxyMiddleware({

    target:
      "http://localhost:5001",

    changeOrigin: true,

    pathRewrite: {

      "^/realestate": ""

    },

    on: {

      proxyReq:
        fixRequestBody

    }

  })

);

/*
=====================================
INVESTMENT MICROSERVICE
=====================================
*/

app.use(

  "/investments",

  authMiddleware,

  createProxyMiddleware({

    target:
      "http://localhost:5002",

    changeOrigin: true,

    pathRewrite: {

      "^/investments": ""

    },

    on: {

      proxyReq:
        fixRequestBody

    }

  })

);

/*
=====================================
HEALTH CHECK
=====================================
*/

app.get(

  "/",

  (_, res) => {

    res.json({

      success: true,

      message:
        "API Gateway Running 🚀"

    });

  }

);

/*
=====================================
PROTECTED TEST ROUTE
=====================================
*/

app.get(

  "/profile",

  authMiddleware,

  (req, res) => {

    res.json({

      success: true,

      message:
        "Protected route accessed"

    });

  }

);

export default app;