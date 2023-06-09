'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Empresa.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    registro: DataTypes.STRING,
    logo: DataTypes.STRING,
    telefone: DataTypes.STRING,
    endereco: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};