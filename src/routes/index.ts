import { Express } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";
import auth from "../middleware/auth";
import superadmin from "../middleware/superadmin";

const routes = (app: Express) => {

  //Login route
  app.post("/login", userController.login);

  //CRUD users
  app.post("/auth/users", auth, superadmin, userController.create);
  app.get("/auth/users", auth, userController.findAll);
  app.get("/auth/users/:id", auth, userController.findById);
  app.put("/auth/users/:id", auth, userController.update);
  app.delete("/auth/users/:id", auth, userController.delete);
  
  //CRUD groups
  app.post("/auth/groups", auth, groupController.create);
  app.get("/auth/groups", auth, groupController.findAll);
  app.get("/auth/groups/:id", auth, groupController.findById);
  app.put("/auth/groups/:id", auth, groupController.update);
  app.delete("/auth/groups/:id", auth, groupController.delete);

  //Add and remove user from groups
  app.post("/auth/groups/:id/users", auth, groupController.addUserToGroup);
  app.delete("/auth/groups/:id/users/:userId", auth, groupController.deleteUserFromGroup);
  
  //Find users in groups, and  fird user's groups
  app.get("/auth/groups/:id/users/", auth, groupController.findUsersInGroup); 
  app.get("/auth/users/:id/groups/", auth, userController.findUserGroups);

};

export default routes;