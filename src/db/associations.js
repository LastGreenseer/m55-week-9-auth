const User = require("../user/model");
const Profile = require("../profile/model");
const sequelize = require("./connection");

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

//automatically create and update tables based on models to prevent a missmatch with the database
async () => {
  try {
    await sequelize.sync({ alter: true }); //updates the table without dropping them
    console.log("synchronization successful");
  } catch (error) {
    console.error("error synchronizing database", error);
  }
};

module.exports = { User, Profile };
