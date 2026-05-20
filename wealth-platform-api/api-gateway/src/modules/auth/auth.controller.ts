import { Request, Response } from "express";

import {
  registerUser,
  loginUser
} from "./auth.service";

import {
  registerSchema
} from "./auth.validation";

export const register = async (
  req: Request,
  res: Response
) => {

  try {

    const validatedData =
      registerSchema.parse(req.body);

    const user =
      await registerUser(validatedData);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }

};

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const { email, password } = req.body;

    const result =
      await loginUser(email, password);

    res.json({
      success: true,
      data: result
    });

  } catch (error: any) {

    res.status(401).json({
      success: false,
      message: error.message
    });

  }

};