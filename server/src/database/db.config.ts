import { connect } from "mongoose";
import {resolve} from "path"
import { config } from "dotenv";
config({path:resolve("./src/.env")})

const connectToDb = async()=>{
    try {
        await connect(process.env.DB_URI as string)
        console.log("Database Connected !!!")
    } catch (error) {
        console.log("Database Error "+ error);
    }
}

export default connectToDb;
