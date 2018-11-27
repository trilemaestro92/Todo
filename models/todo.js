module.exports = function(sequelize, DataTypes) {

  var List = sequelize.define("list", {
    
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,100]
    }
  },

    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
    
  });
  
  return List;
};
