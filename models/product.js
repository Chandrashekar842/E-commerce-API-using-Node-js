import sequelize from "../database.js";
import { DataTypes, STRING } from "sequelize";
import { Category } from "./category.js"; 

export const Product = sequelize.define('product',  {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false
    },
    itemsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
})

