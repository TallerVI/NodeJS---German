/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('articulos', {
    articuloid: {
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
      defaultValue: sequelize.NOW
    },
    maquinaestadoid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'maquinaestados',
        key: 'maquinaestadoid'
      }
    },
    tipoarticuloid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tiposarticulo',
        key: 'tipoarticuloid'
      }
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'articulos',
    freezeTableName: true,
    timestamps: false
  });
};
