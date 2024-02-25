import sequelize from "../database.js";
import { DataTypes } from "sequelize";

export const CartItem = sequelize.define('cartitem',  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        defaultValue: 1
    }
}, {
    timestamps: false
})
