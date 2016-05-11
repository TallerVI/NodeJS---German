/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiposarticulo', {
    tipoarticuloid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fechacreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    cocina: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'tiposarticulo',
    freezeTableName: true,
    timestamps: false
  });
};
