
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  } ,{
    freezeTableName: true
  });

  User.associate = function(models) {
    // associations can be defined here
    User.beforeCreate((user) => {

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      user.password = hashedPassword;
      return user;

    });

  };

  return User;
};
