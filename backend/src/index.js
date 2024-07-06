import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/db.js";
import healtRoute from "./routes/health.routes.js";
import photographerRoutes from "./routes/photographer.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());

// Route 1
app.use("/health", healtRoute);
// Route 2 - Photographer CRUD
app.use("/user/photographer", photographerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);

  // when server is started then connect to database
  dbConnect();
})