import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { InputUser } from "../types/data";
import prisma from "../utils/prisma";
import { expireDate, generateToken, generateUsername } from "../utils/service";

//  Sign up
async function signUp(req: Request, res: Response, next: NextFunction) {
  const { email, name, password, phone }: InputUser = req.body;
  // validate formdata
  if (!email || !name || !password) {
    return res.status(401).send({ message: "Invalid form data !" });
  }
  try {
    //  find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLocaleLowerCase() }, { phone }],
      },
    });
    if (user) {
      return res.status(401).send({ message: "User already exist !" });
    }
    // encrypt password
    const encrypt = bcrypt.hashSync(password, 10);

    // create new user
    await prisma.user.create({
      data: {
        email: email.toLocaleLowerCase(),
        name,
        password: encrypt,
        phone,
        username: generateUsername(name),
      },
    });
    return res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
}

// Sign in
async function signIn(req: Request, res: Response, next: NextFunction) {
  const { username, password }: InputUser = req.body;
  // validate formdata
  if (!password || !username) {
    return res.status(401).send({ message: "Invalid formdata !" });
  }
  try {
    //  find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: username.toLocaleLowerCase() },
          { username: username.toLocaleLowerCase() },
          { phone: username.toLocaleLowerCase() },
        ],
      },
    });
    //  validate user or password is empty
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .send({ message: "Invalid username or password !" });
    }

    res
      .cookie("access_token", generateToken(user.email, user.id), {
        httpOnly: true,
        expires: expireDate,
      })
      .status(200)
      .send({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          created_at: user.created_at,
          updated_at: user.updated_at,
          username: user.username,
        },
        token: generateToken(user.email, user.id),
        message: "Login Successfully !",
      });
  } catch (error) {
    next(error);
  }
}
async function oAuth(req: Request, res: Response, next: NextFunction) {
  try {
    // res
    //   .cookie("access_token", generateToken(user.email), {
    //     httpOnly: true,
    //     expires: expireDate,
    //   })
    //   .status(200)
    //   .send({ message: "Login Successfully !" });
  } catch (error) {
    next(error);
  }
}

const authController = { signUp, signIn, oAuth };
export default authController;
