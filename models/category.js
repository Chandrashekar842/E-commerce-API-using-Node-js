import sequelize from "../database.js";
import { DataTypes } from "sequelize";

export const Category = sequelize.define('category',  {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false, 
    }
}, {
    timestamps: false
})
