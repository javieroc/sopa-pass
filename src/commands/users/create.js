const { Command } = require('@oclif/command')
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
      throw new Error('Cannot create user')
    }
  }
}

UsersCreateCommand.description = `Create a new User
...
Extra documentation goes here
`

UsersCreateCommand.flags = {}
UsersCreateCommand.args = [
  {
    name: 'username',
    required: true
  }
]

module.exports = UsersCreateCommand
