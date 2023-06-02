import express, { json, urlencoded } from 'express';
import connectToDb from './database/db.config';
import authRouter from './router/auth.routes';
const app = express();

app.use(json())
app.use(urlencoded({extended:true}))

connectToDb();

app.use("/auth",authRouter)

app.listen(3000)
