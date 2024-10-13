import { dbConnection } from "./DAL/database";
import dotenv from "dotenv"
import express from "express"; 
import cookieparser from "cookie-parser";
import registerRouter from "./routes/registerRoutes"

const app = express();

dotenv.config();

dbConnection()

app.use(express.json());
app.use(cookieparser());
app.use('/register', registerRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("listening at port", PORT)
});