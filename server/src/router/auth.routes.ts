import { Request, Response, Router } from "express";
import AuthController from "../controller/auth.controller";
import authenticate from "../middleware/auth.middleware";
const authRouter = Router();

//? User Routes
authRouter.get("/details", authenticate, async (req: Request, res: Response) => {
    try {
        const authController = new AuthController(req, res);
        await authController.getUserDetails();
    } catch (error) {
        console.log("Global Get Error " + error);
    }
})

authRouter.put("/update", authenticate, async (req: Request, res: Response) => {
    try {
        const authController = new AuthController(req, res);
        await authController.editUserDetails();
    } catch (error) {
        console.log("Global Update Error " + error);
    }
})

//* Common Routes
authRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const authController = new AuthController(req, res);
        await authController.signUpUser();
    } catch (error) {
        console.log("Global Sign Up Error " + error);
    }
})
authRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const authController = new AuthController(req, res);
        await authController.loginUser();
    } catch (error) {
        console.log("Global Login Error " + error);
    }
})

//? Admin Routes

authRouter.get("/allDetails", authenticate, async (req:Request, res) => {
    try {
        const authController = new AuthController(req,res);
        await authController.getAllUsers();
    } catch (error) {
         console.log("Global Get All Error " + error);
    }
})

authRouter.delete("/delete/:id", authenticate, async (req:Request, res) => {
    try {
        const authController = new AuthController(req,res);
        await authController.deleteUser();
    } catch (error) {
         console.log("Global Delete Error " + error);
    }
})

export default authRouter