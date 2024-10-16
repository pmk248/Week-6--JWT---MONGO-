import express from "express"; 
import dotenv from "dotenv"
import userRouter from "./routes/registerRoutes"
import registerRouter from "./routes/registerRoutes"
import loginRouter from "./routes/loginRoutes"
import teacherRouter from "./routes/teacherRoutes"
import studentRouter from "./routes/studentRoutes"
import { dbConnection } from "./DAL/database";
import cookieparser from "cookie-parser";
import swaggerUI from "swagger-ui-express"
//import { specs } from "./services/swagger";

const app = express();

dotenv.config();

dbConnection()

//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(cookieparser());
app.use('/register', registerRouter);
app.use('/login', loginRouter)
app.use('/users', userRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("listening at post", PORT)
});