import express from "express";
import dbConnection from "./config/db.js";
import authRouter from "./routes/auth.route.js";

const app = express();

dbConnection();
const port = 3000;
app.use(express.json());
app.use("/auth", authRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));

// activityCapstone
// chambas
