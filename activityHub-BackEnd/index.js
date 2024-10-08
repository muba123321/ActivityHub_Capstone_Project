import express from "express";
import dbConnection from "./config/db.js";

const app = express();
dbConnection();
const port = 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

// activityCapstone
// chambas
