import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  rollNo: {  // ✅ ADD - Frontend ले यो चाहिन्छ
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
    allowNull: true,  // ✅ Optional बनायो
  },

  className: {  // ✅ RENAME: studentClass → className
    type: DataTypes.STRING,
    allowNull: false,
  },

  attendance: {  // ✅ ADD
    type: DataTypes.STRING,
    defaultValue: "0%",
  },

  results: {  // ✅ ADD
    type: DataTypes.JSON,  // JSON field for storing results object
    defaultValue: {},
  }
});

export default Student;