const {Command, flags} = require('@oclif/command')
const {cli} = require('cli-ux')

class UsersCreateCommand extends Command {
  async run() {
    const {args} = this.parse(UsersCreateCommand)
    const password = await cli.prompt('Enter your password', {type: 'hide'})
    this.log(args)
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
    required: true,
  },
]

module.exports = UsersCreateCommand
