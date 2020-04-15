'use strict'

const { User } = require('@sopa/db')
const { comparePassword } = require('@sopa/crypto')

module.exports = {
  async authenticate (username, password) {
    const user = await User.findOne({ where: { username } })
    if (!user) return false

    const hashed = user.password

    if (await comparePassword(password, hashed)) {
      return user
    }

    return null
  }
}
