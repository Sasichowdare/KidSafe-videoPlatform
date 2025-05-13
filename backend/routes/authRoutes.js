import express from "express";
import { registerUser,loginUser } from "../controllers/authController.js"


const router = express.Router();

router.post("/register",registerUser); //Register route to create a new user.

router.post("/login",loginUser);    //Login route to authenticate the user.

export default router; //Exporting the router to use in the server.js file.