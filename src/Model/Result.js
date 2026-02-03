import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const Result = sequelize.define("Result", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  semester: DataTypes.STRING,
  gpa: DataTypes.FLOAT,
  result_file: DataTypes.STRING
});
