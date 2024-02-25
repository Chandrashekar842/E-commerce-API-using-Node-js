import sequelize from "../database.js";
import { DataTypes } from "sequelize";

export const Cart = sequelize.define('cart',  {
    cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }
}, {
    timestamps: true
})
