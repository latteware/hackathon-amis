// node tasks/load add-user --email archr@app.com --password foobar
const parseArgs = require('minimist')
const co = require('co')

const { User } = require('models')

const argv = parseArgs(process.argv.slice(2))

module.exports = co.wrap(function *(){
  if (!argv.password || !argv.email) {
    throw new Error('email and password are required')
  }

  const user = new User({
    email: argv.email,
    password: argv.password
  })

  yield user.save()

  console.log('User created:', user.email)
})