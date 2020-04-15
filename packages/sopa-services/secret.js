'use strict'

const { User, Secret } = require('@sopa/db')
const { generateKey, encrypt, decrypt } = require('@sopa/crypto')

module.exports = {
  async createSecret (username, password, name, value) {
    const user = await User.findOne({ where: { username } })

    if (!user) throw new Error('User not found')

    const secretKey = generateKey(password)
    const randomKey = user.randomkey
    const encrypted = encrypt(value, secretKey, randomKey)

    return Secret.create({
      username: user.username,
      name,
      value: encrypted
    })
  },

  listSecrets (username) {
    return Secret.findAndCountAll({ where: { username } })
  },

  async getSecret (username, password, name) {
    const user = await User.findOne({ where: { username } })

    if (!user) throw new Error('User not found')

    const secretKey = generateKey(password)
    const randomKey = user.randomkey
    const secret = await Secret.findOne({
      where: {
        username: user.username,
        name
      }
    })

    if (!secret) return false

    const decrypted = decrypt(secret.value, secretKey, randomKey)

    return {
      ...secret.toJSON(),
      ...{
        value: decrypted
      }
    }
  },

  async updateSecret (username, password, name, value) {
    const user = await User.findOne({ where: { username } })

    if (!user) throw new Error('User not found')

    const secretKey = generateKey(password)
    const randomKey = user.randomkey
    const encrypted = encrypt(value, secretKey, randomKey)

    return Secret.update({
      value: encrypted
    }, { where: { username: user.username, name } })
  },

  deleteSecret (username, name) {
    return Secret.destroy({
      where: {
        username,
        name
      }
    })
  }
}
