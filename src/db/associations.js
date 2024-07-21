const User = require("../user/model");
const Profile = require("../profile/model");
const sequelize = require("./connection");

User.hasOne(Profile, { foreignKey: "userId" });
Profile.belongsTo(User, { foreignKey: "userId" });

//automatically create and update tables based on models
// this will prevent a missmatch with the database
async () => {
  try {
    //updates the table without dropping them
    await sequelize.sync({ alter: true }); 
    console.log("synchronization successful");
  } catch (error) {
    console.error("error synchronizing database", error);
  }
};

module.exports = { User, Profile };
