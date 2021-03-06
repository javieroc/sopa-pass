const { Command } = require('@oclif/command')
const { CLIError } = require('@oclif/errors')
const { userServices } = require('@sopa/services')
const { cli } = require('cli-ux')

class UsersCreateCommand extends Command {
  async run () {
    const { args: { username } } = this.parse(UsersCreateCommand)

    const fullname = await cli.prompt('Enter your full name')
    const password = await cli.prompt('Enter your password', { type: 'hide' })
    try {
      const newUser = await userServices.createUser(username, password, fullname)
      this.log(`User ${newUser.username} created!`)
    } catch (err) {
      this.log(err)
      throw new CLIError('Cannot create user')
    } finally {
      this.exit(0)
    }
  }
}

UsersCreateCommand.description = 'Creates a new user'

UsersCreateCommand.flags = {}
UsersCreateCommand.args = [
  {
    name: 'username',
    required: true
  }
]

module.exports = UsersCreateCommand
