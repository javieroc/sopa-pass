const { Command } = require('@oclif/command')

class SecretsCommand extends Command {
  async run () {
    this._help()
  }
}

SecretsCommand.description = 'Manage secrets by users'

SecretsCommand.flags = {}

module.exports = SecretsCommand
