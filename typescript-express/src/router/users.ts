import express from "express";

import { deleteUser, getAllUsers, updateUser } from "../controllers/users.ts";
import { isAuthenticated, isOwner } from "../middlewares/index.ts";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
