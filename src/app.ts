import { dbConnection } from "./DAL/database";
import dotenv from "dotenv"
import express from "express"; 
import cookieparser from "cookie-parser";

const app = express();

dotenv.config();

dbConnection()

app.use(express.json());
app.use(cookieparser());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("listening at post", PORT)
});