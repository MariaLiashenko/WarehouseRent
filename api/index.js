import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import warehousesRoute from "./routes/warehouses.js";
import reservationsRoute from "./routes/reservations.js";
import deviceRoute from "./routes/device.js";

import cookieParser from "cookie-parser";

const app = express();

mongoose
    .connect(
        "mongodb+srv://mariialiashenko:wzMISCY0zHERNQ7Z@coursework3.dkpqpxy.mongodb.net/coursework3?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

//middleware
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/warehouses", warehousesRoute);
app.use("/reservations", reservationsRoute);
app.use("/devices", deviceRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(8000, () => {
    console.log("connected to backend.");
});
