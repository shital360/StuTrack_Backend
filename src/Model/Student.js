import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  rollNo: {  
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,  
  },

  className: {  
    type: DataTypes.STRING,
    allowNull: false,
  },

  attendance: {  
    type: DataTypes.STRING,
    defaultValue: "0%",
  },

  results: {  
    type: DataTypes.JSON,  
    defaultValue: {},
  }
});

export default Student;