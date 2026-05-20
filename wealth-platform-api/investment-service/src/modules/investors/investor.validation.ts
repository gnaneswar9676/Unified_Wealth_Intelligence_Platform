import { z } from "zod";

export const createInvestorSchema =
  z.object({

    investor_code:
      z.string().min(3),

    full_name:
      z.string().min(3),

    pan_number:
      z.string().optional(),

    risk_profile:
      z.string().optional()

  });