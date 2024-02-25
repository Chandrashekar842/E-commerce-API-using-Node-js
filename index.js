import express from "express";
import sequelize from "./database.js";
import { authRouter } from "./routes/authRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js"; 
import { Product } from "./models/product.js"; 
import { productRouter } from "./routes/productRoutes.js"; 
import { Category } from "./models/category.js";
import { Cart } from "./models/cart.js"; 
import { CartItem } from "./models/cart-items.js"; 
import { User } from "./models/user.js"; 
import { cartRouter } from "./routes/cartRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(authRouter)

app.use(categoryRouter)

app.use('/admin', productRouter)

app.use(cartRouter)

Category.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

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

