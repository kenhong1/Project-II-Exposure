'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    description: DataTypes.STRING,
    place: DataTypes.INTEGER
  }, {});
  location.associate = function(models) {
    // associations can be defined here
    models.location.hasMany(models.image)
    models.location.belongsToMany(models.user,{through: "usersLocations"})
  };
  return location;
};