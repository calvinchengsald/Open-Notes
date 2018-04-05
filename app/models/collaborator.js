

module.exports = (sequelize, DataTypes) => {

  var Collaborator = sequelize.define('Collaborator', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "User",
          key: "id",
          as: "userId",
      },
    },
    wikiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "Wikis",
          key: "id",
          as: "wikiId",
      },
    }

  } ,{
  });


  Collaborator.associate = function(models) {
    // associations can be defined here
    Collaborator.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Collaborator.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      onDelete: "CASCADE"
    });
    Collaborator.addScope("allCollabWikis", (userId) => {
      return {
        include: [{
          model: models.Wiki
        }],
        where: { userId: userId},
        order: [["createdAt", "ASC"]]
      }
    });
  };

  return Collaborator;
};
