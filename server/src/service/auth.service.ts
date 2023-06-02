import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import Auth from "../model/Auth";
import { EditDetails, LoginDetails, UserDetails } from "../types/auth.dto";
import { resolve } from "path"
import { config } from "dotenv";
config({ path: resolve("./server/src/.env") })

class AuthService {

    private auth;
    constructor() {
        this.auth = Auth;
    }

    async getUser(userId: string) {
        try {
            const userData = await this.auth.findById(userId);
            if (userData) return userData;
            return 0;
        } catch (error) {
            console.log("Get Controller Error : " + error)
        }
    }

    async signUpUser(data: UserDetails) {
        try {
            const password = data.userPassword as string;
            const newPassword = await hash(password, 12);
            const newUser = await this.auth.create({
                ...data,
                userPassword: newPassword
            })
            const user = await newUser.save();
            return user;
        } catch (error) {
            console.log("Signup Controller Error : " + error)
        }
    }

    async loginUser(data: LoginDetails) {
        try {
            const { userEmail, userPassword } = data;
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            if (regex.test(userEmail as string)) {
                const isUserExist = await this.auth.findOne({ userEmail });
                if (!isUserExist) return -1;

                const isPasswordMatch = await compare(userPassword as string, isUserExist.userPassword as string);
                if (!isPasswordMatch) return 0;

                const token: string = sign({ userEmail }, process.env.JWT_SECRET as string);
                return token;
            } else {
                const isUserExist = await this.auth.findOne({ userName: userEmail });
                if (!isUserExist) return -1;

                const isPasswordMatch = await compare(userPassword as string, isUserExist.userPassword as string);
                if (!isPasswordMatch) return 0;

                const token: string = sign({ id: isUserExist._id }, process.env.JWT_SECRET as string);
                return token;
            }
        } catch (error) {
            console.log("Login Controller Error : " + error)
        }
    }

    async editUserDetails(userId: string, data: EditDetails) {
        try {
            const password = data.userPassword as string;
            const newPassword = await hash(password, 12);
            const resp = await this.auth.updateOne({ _id: userId }, {
                ...data,
                userPassword: newPassword
            })
            if (resp.modifiedCount == 1) return "User Detail Updated !!!"
            return "User Details Not Updated !!!"
        } catch (error) {
            console.log("Edit Controller Error : " + error)
        }
    }

    //? Admin Services 

    async getAllUsers() {
        try {
            const usersInDb = await this.auth.find({ userRole: "User" });
            return usersInDb;
        } catch (error) {
            console.log("Get All Controller Error : " + error)
        }
    }

    async deleteUser(userId: any) {
        try {
            const resp = await this.auth.deleteOne({_id:userId});
            if (resp.deletedCount == 1) return "User Deleted !!!"
            return "User Not Deleted !!!"
        } catch (error) {
            console.log("Delete Controller Error : " + error);
        }
    }
}

export default AuthService;