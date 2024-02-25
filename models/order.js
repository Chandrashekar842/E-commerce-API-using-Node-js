import sequelize from "../database.js";
import { DataTypes } from "sequelize";

export const Order = sequelize.define('order',  {
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }, totalAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
})
