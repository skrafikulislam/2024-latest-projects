import express from "express";
import { get, identity, merge } from "lodash";

import { getUserBySessionToken } from "../db/users.ts";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    // ? Below Line Is Full TypeScript ConCept - Connected to Below merge TypeScript Concept
    const currentUserId = get(req, "identity._id") as string;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["RAFIKUL-AUTH"];
    if (!sessionToken) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }

    // ? Below Line Is Full TypeScript ConCept - Connected To Upper get TypeScript Concept
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
