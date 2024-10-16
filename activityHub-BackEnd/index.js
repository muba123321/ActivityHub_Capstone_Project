import express from "express";
import dbConnection from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import activityRoutes from "./routes/activity.route.js";

const app = express();

dbConnection();

const port = 3000;
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/activities", activityRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

// activityCapstone
// chambas
