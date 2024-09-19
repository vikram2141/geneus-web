import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { readdirSync } from "fs";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

const app = express();

mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.log("DB Connection err =>", err));

app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(express.static(__dirname));

const routes = readdirSync("./routes");
routes.forEach(async (r) => {
    const routePath = `./routes/${r}`;
    const router = (await import(routePath)).default;
    app.use("/", router);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
    console.log(`Server is running successfully on PORT ${PORT}`)
);
