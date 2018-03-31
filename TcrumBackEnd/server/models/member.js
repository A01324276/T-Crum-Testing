module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {

    department_major: {

      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {

      type: DataTypes.STRING,
      allowNull: false,
    },
    photo_URL: {

      type: DataTypes.STRING,
      defaultValue: "",
    },
    password: {

      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Member.associate = function (models) {
    // associations can be defined here

    //TODO: establish the required links to the cross tables member-task
    //      and member-project
  };

  Member.associate = function (models) {

    // Member.belongsToMany(models.Project, {through: 'member_task'})
  }

  return Member;
};