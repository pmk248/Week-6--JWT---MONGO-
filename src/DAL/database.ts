import mongoose from "mongoose"

export const dbConnection = async () => {
    const connString = process.env.CONN_STR;
    mongoose.connect(connString!);
}