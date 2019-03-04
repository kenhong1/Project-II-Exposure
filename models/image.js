'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    cloudinaryUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    timeOfDay: DataTypes.DATE
  }, {});
  image.associate = function(models) {
    // associations can be defined here
    models.image.belongsTo(models.user)
    models.image.belongsTo(models.location)

  };
  return image;
};