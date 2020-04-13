const {Command, flags} = require('@oclif/command')

class UsersCommand extends Command {
  async run() {
  }
}

UsersCommand.description = `Describe the command here
...
Extra documentation goes here
`

UsersCommand.flags = {}

module.exports = UsersCommand
