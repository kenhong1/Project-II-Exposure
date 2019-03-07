'use strict';
module.exports = (sequelize, DataTypes) => {
  const collection = sequelize.define('collection', {
    locationName: DataTypes.STRING
  }, {});
  collection.associate = function(models) {
    // associations can be defined here
    // models.collection.hasMany(models.user)
    // models.collection.belongsToMany(models.user,{through:"usersCollections"})
  };
  return collection;
};

