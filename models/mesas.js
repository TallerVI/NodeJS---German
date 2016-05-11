/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mesas', {
    mesaid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maquinaestadoid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'maquinaestados',
        key: 'maquinaestadoid'
      }
    }
  }, {
    tableName: 'mesas',
    freezeTableName: true,
    timestamps: false
  });
};
