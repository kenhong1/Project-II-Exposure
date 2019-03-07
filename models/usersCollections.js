'use strict';
module.exports = (sequelize, DataTypes) => {
  const usersCollections = sequelize.define('usersCollections', {
    userId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER
  }, {});
  usersCollections.associate = function(models) {
    // associations can be defined here
  };
  return usersCollections;
};