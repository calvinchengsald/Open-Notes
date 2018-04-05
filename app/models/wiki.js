

module.exports = (sequelize, DataTypes) => {

  const Wiki = sequelize.define('Wiki', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: "User",
          key: "id",
          as: "userId",
      },
    }
  } ,{
  });

  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Wiki.hasMany(models.Collaborator, {
      foreignKey: "wikiId",
      as: "collaborators"
    });
    Wiki.addScope("allAuthoredWikis", (userId) => {
      return {
        include: [{
          model: models.Collaborator, as: "collaborators",
        }],
        where: { userId: userId},
        order: [["createdAt", "ASC"]]
      }
    });

  };

  return Wiki;
};
