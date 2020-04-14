'use strict'
const { hashPassword, generateRandomKey } = require('@sopa/crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    randomkey: DataTypes.STRING,
    fullname: DataTypes.STRING
  }, {
    tableName: 'users',
    underscored: true,
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = await hashPassword(user.password)
        user.randomkey = await generateRandomKey()
      }
    }
  })
  User.associate = function (models) {
    User.hasMany(models.Secret, {
      sourceKey: 'username',
      foreignKey: 'username',
      as: 'secrets'
    })
  }
  return User
}
