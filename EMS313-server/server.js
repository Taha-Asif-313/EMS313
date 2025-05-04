import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./Config/connectDb.js";
import adminRoutes from "./Routes/adminRoutes.js";
import employeeRoutes from "./Routes/employeeRoutes.js";

// Connect Db function
connectDb();

// Make a express app
const app = express();

// Declare the port for server
const port = process.env.PORT || 5000;

// Select cors for resolve cors policy issue
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// Middlewares to connect Client with Server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes middleware
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

// App listening
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
