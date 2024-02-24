import sequelize from "../database.js";
import { DataTypes } from "sequelize";

const categorySchema = sequelize.define('Category',  {
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

export const Category = sequelize.model('Category', categorySchema)