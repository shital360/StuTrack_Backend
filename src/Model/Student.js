import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  studentClass: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

export default Student;
