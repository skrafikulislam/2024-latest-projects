import express from "express";
import { createUser, getUserByEmail } from "../db/users.ts";
import { authenticationUser, random } from "../helpers/index.ts";

// ! Login Controller


export const login = async (req: express.Request, res: express.Response) => {
  try { 
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authenticationUser(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();

    user.authentication.sessionToken = authenticationUser(
      salt,
      user._id.toString()
    );
    
    await user.save();

    res.cookie("RAFIKUL-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

// ! Register Controller

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: { 
        salt,
        password: authenticationUser(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
