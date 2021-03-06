'use strict'

const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { cli } = require('cli-ux')
const { authenticate } = require('@sopa/auth')
const { secretServices } = require('@sopa/services')

class SecretsGetCommand extends Command {
  async run () {
    try {
      const { args } = this.parse(SecretsGetCommand)
      const { username, name } = args

      const password = await cli.prompt('Enter your password', { type: 'hide' })

      const user = await authenticate(username, password)
      if (!user) throw new CLIError('Invalid user or password')

      const secret = await secretServices.getSecret(username, password, name)
      if (!secret) throw new CLIError(`secret ${name} not found`)

      cli.table([secret], {
        name: {
          minWidth: 10
        },
        value: {
          minWidth: 12
        }
      })
    } catch (err) {
      if (err instanceof CLIError) {
        throw err
      } else {
        throw new CLIError('Cannot get secret')
      }
    }
  }
}

SecretsGetCommand.description = 'Lists secrets by username'
SecretsGetCommand.flags = {}
SecretsGetCommand.args = [
  { name: 'username', required: true },
  { name: 'name', required: true }
]

module.exports = SecretsGetCommand
