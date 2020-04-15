'use strict'

const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { cli } = require('cli-ux')
const { authenticate } = require('@sopa/auth')
const { secretServices } = require('@sopa/services')

class SecretsCreateCommand extends Command {
  async run () {
    try {
      const { args } = this.parse(SecretsCreateCommand)
      const { username, name } = args

      const password = await cli.prompt('Enter your password', { type: 'hide' })
      const user = await authenticate(username, password)

      if (!user) throw new CLIError('Invalid user or password')

      const value = await cli.prompt('Enter your secret', { type: 'mask' })
      const secret = await secretServices.createSecret(username, password, name, value)

      this.log(`secret: ${secret.name} created for user '${username}'`)
    } catch (err) {
      if (err instanceof CLIError) {
        throw err
      } else {
        throw new CLIError('Cannot create secret')
      }
    }
  }
}

SecretsCreateCommand.description = 'Creates a secret by name'
SecretsCreateCommand.flags = {}
SecretsCreateCommand.args = [
  { name: 'username', required: true },
  { name: 'name', required: true }
]
module.exports = SecretsCreateCommand
