import express from "express";
import sequelize from "./database.js";
import { authRouter } from "./routes/authRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js"; 

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(authRouter)

app.use(categoryRouter)

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .then(() => {
    app.listen(PORT, () => {
        console.log(`connected to server at ${PORT}`);
      });      
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

