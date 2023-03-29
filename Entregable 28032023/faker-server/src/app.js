import express from "express";
import {userRouter} from "./routes/user.routes.js";

const app = express();
const PORT = 8080;

app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));

app.use("/api/users", userRouter);