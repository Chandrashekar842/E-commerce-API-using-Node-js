import express from "express";
import sequelize from "./database.js";
import { authRouter } from "./routes/authRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js"; 
import { Product } from "./models/product.js"; 
import { productRouter } from "./routes/productRoutes.js"; 
import { Category } from "./models/category.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(authRouter)

app.use(categoryRouter)

app.use('/admin', productRouter)

Category.hasMany(Product)

sequelize
  .sync()
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

