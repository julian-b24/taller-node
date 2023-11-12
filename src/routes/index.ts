import { Express } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";

const routes = (app: Express) => {
  //CRUD users
  app.post("/users", userController.create);
  app.get("/users", userController.findAll);
  app.get("/users/:id", userController.findById);
  app.put("/users/:id", userController.update);
  app.delete("/users/:id", userController.delete);

  //Login route
  app.post("/login", userController.login);
  
  //CRUD groups
  app.post("/groups", groupController.create);
  app.get("/groups", groupController.findAll);
  app.get("/groups/:id", groupController.findById);
  app.put("/groups/:id", groupController.update);
  app.delete("/groups/:id", groupController.delete);

  //Add and remove user from groups
  app.post("/groups/:id/users/", groupController.addUserToGroup);
  app.delete("/groups/:id/users/", groupController.deleteUserFromGroup);
  
  //Find users in groups, and  fird user's groups
  app.get("/groups/:id/users/", groupController.findUsersInGroup); 
  app.get("/users/:id/groups/", userController.findUserGroups);

};

export default routes;