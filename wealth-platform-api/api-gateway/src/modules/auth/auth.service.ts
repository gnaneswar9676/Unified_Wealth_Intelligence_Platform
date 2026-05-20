import prisma from "../../../../src/config/db";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

type RegisterInput = {
  full_name: string;
  email: string;
  password: string;
  investor_id?: string;
};

export const registerUser =
async (
  data: RegisterInput
) => {

  /*
  ===================================
  CHECK EXISTING USER
  ===================================
  */

  const existingUser =
    await prisma.users.findUnique({

      where: {
        email: data.email
      }

    });

  if (existingUser) {

    throw new Error(
      "User already exists"
    );

  }

  /*
  ===================================
  HASH PASSWORD
  ===================================
  */

  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10
    );

  /*
  ===================================
  CREATE USER
  ===================================
  */

  const user =
    await prisma.users.create({

      data: {

        full_name:
          data.full_name,

        email:
          data.email,

        password_hash:
          hashedPassword,

        investor_id:
          data.investor_id || null

      }

    });

  return user;

};

export const loginUser = async (
  email: string,
  password: string
) => {

  const user =
    await prisma.users.findUnique({

      where: {
        email
      }

    });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password_hash
    );

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  /*
  ===================================
  GET ROLE
  ===================================
  */

  const role =
    await prisma.user_roles.findFirst({

      where: {
        user_id: user.id
      },

      include: {
        role: true
      }

    });

  /*
  ===================================
  GET INVESTOR ID
  ===================================
  */

  const investorData =
    await prisma.$queryRawUnsafe<
      { investor_id: string | null }[]
    >(`
      SELECT investor_id
      FROM users
      WHERE id = '${user.id}'
    `);

  const investor_id =
    investorData?.[0]?.investor_id || null;

  /*
  ===================================
  GENERATE TOKEN
  ===================================
  */

  const token = jwt.sign(

    {

      userId: user.id,

      investor_id,

      email: user.email,

      role: role?.role.role_name

    },

    process.env.JWT_SECRET!,

    {
      expiresIn: "1d"
    }

  );

  return {

    token,

    user: {

      id: user.id,

      investor_id,

      full_name: user.full_name,

      email: user.email,

      role: role?.role.role_name

    }

  };

};