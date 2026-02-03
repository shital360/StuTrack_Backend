import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import CourseModel from "./course.model.js";
import UserModel from "./user.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Course = CourseModel(sequelize, Sequelize);
db.User = UserModel(sequelize, Sequelize);

export default db;
