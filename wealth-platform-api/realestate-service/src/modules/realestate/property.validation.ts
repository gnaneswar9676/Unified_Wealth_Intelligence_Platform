import { z } from "zod";

export const createPropertySchema =
  z.object({

    investor_id:
      z.string().uuid(),

    property_name:
      z.string().optional(),

    property_type:
      z.string().optional(),

    purchase_price:
      z.number().optional()

  });