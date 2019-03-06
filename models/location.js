'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    name: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT
  }, {});
  location.associate = function(models) {
    // associations can be defined here
    models.location.hasMany(models.image)
    models.location.belongsToMany(models.user,{through: "usersLocations"})

  };
  return location;
};