const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Profile = sequelize.define("Profile", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Profile