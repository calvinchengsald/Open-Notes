
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
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
    },
    activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //0 member
      //1 premium
      //2 admin
    }
  } ,{
    freezeTableName: true
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Wiki, {
      foreignKey: "userId",
      as: "wikis"
    });
    User.hasMany(models.Collaborator, {
      foreignKey: "userId",
      as: "collaborators"
    });

    User.beforeCreate((user) => {

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      user.password = hashedPassword;
      return user;

    });

    User.addScope("withToken", (Token) => {
      return {
        where: { token: Token},
        limit: 1,
        order: [["createdAt", "ASC"]]
      }
    });


  };

  return User;
};
