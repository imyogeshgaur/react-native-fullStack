import { Request, Response } from "express";
import decodeUser from "../helper/decodeUser.helper";
import AuthService from "../service/auth.service";
import { EditDetails, LoginDetails, UserDetails } from "../types/auth.dto";

class AuthController {
    private req: Request;
    private res: Response;
    private service: AuthService;
    constructor(request: Request, response: Response) {
        this.req = request;
        this.res = response;
        this.service = new AuthService();
    }

    //? User Controller
    async getUserDetails() {
        try {
            const token: any = this.req.headers.authorization;
            const userId: any = decodeUser(token);
            const user = await this.service.getUser(userId);
            return this.res.status(200).send({ user });
        } catch (error) {
            console.log("Get Controller Error : " + error)
        }
    }

    async editUserDetails() {
        try {
            const token = this.req.headers.authorization;
            const userId: any = decodeUser(token);
            const data: EditDetails = this.req.body;
            const message = await this.service.editUserDetails(userId, data);
            return this.res.status(200).send({ message })
        } catch (error) {
            console.log("Edit Controller Error : " + error)
        }
    }

    //* Common Controller
    async signUpUser() {
        try {
            const userData: UserDetails = this.req.body;
            const user = await this.service.signUpUser(userData);
            return this.res.status(201).send({ message: "User Created Successfully !!!", user })
        } catch (error) {
            console.log("Signup Controller Error : " + error)
        }
    }

    async loginUser() {
        try {
            const loginData: LoginDetails = this.req.body;
            const token = await this.service.loginUser(loginData)
            if (token == -1 || token == 0) return this.res.status(400).send({ message: "Invalid Credentials !!!", token: 0 })
            return this.res.status(200).send({ message: "Logged In Successfully !!!", token })
        } catch (error) {
            console.log("Login Controller Error : " + error)
        }
    }

    //? Admin Controller 

    async getAllUsers() {
        try {
            const allUsers: any = await this.service.getAllUsers();
            if (allUsers.length === 0) return this.res.status(200).send({ message: "No User Found" })
            return this.res.status(200).send({ allUsers })
        } catch (error) {
            console.log("Get All Controller Error : " + error)
        }
    }

    async deleteUser() {
        try {
            const id = this.req.params.id;
            const message = await this.service.deleteUser(id);
            return this.res.status(200).send({ message })
        } catch (error) {
            console.log("Delete Controller Error : " + error);
        }
    }
}

export default AuthController;