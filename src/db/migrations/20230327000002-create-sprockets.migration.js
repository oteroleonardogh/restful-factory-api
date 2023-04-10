const {DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sprockets', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4,
      },
      teeth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pitch_diameter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      outside_diameter: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      pitch: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        onUpdate: Sequelize.fn('NOW'),
      },
    });
    
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('sprockets');
  }
};
