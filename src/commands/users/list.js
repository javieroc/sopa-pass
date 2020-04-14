const { Command, flags } = require('@oclif/command')

class UsersListCommand extends Command {
  async run () {
    const { args } = this.parse(UsersListCommand)
    this.log(args)
  }
}

UsersListCommand.description = `Create a new User
...
Extra documentation goes here
`

UsersListCommand.flags = {}
UsersListCommand.args = [
  { name: 'username' }
]

module.exports = UsersListCommand
