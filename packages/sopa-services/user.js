'use strict'

const db = require('@sopa/db')
const { comparePassword } = require('@sopa/crypto')

module.exports = {
  async createUser (username, password, fullname = '') {
    return db.User.create({
      username,
      password,
      fullname
    })
  },

  listUsers () {
    return db.User.findAndCountAll()
  },

  async authenticate (username, pass) {
    const user = await db.User.findOne({ where: { username } })
    if (!user) return false

    const hashed = user.password

    if (await comparePassword(pass, hashed)) {
      return user
    }

    return null
  }
}
