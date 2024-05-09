// eslint-disable-next-line @typescript-eslint/no-var-requires
const { prompt } = require('enquirer')

async function prompter(cz, commit) {
  const { type } = await prompt([
    {
      type: 'select',
      name: 'type',
      message: 'Select the type of change:',
      choices: [
        { value: 'feat', name: 'feat: A new feature' },
        { value: 'fix', name: 'fix: A bug fix' },
        {
          value: 'test',
          name: 'test: Adding missing or correcting existing tests',
        },
        {
          value: 'chore',
          name: 'chore: related to tooling, configuration, or libraries, without impacting the production code',
        },
        {
          value: 'refactor',
          name: 'refactor: A code change that neither fixes a bug nor adds a feature',
        },
        {
          value: 'ci',
          name: 'ci: Changes to our CI configuration files and scripts',
        },
        {
          value: 'perf',
          name: 'perf: A code change that improves performance',
        },
        {
          value: 'build',
          name: 'build: Changes that affect the build system or external dependencies',
        },
        { value: 'revert', name: 'revert: Revert to a commit' },
      ],
      result(names) {
        return names.split(':')[0].trim()
      },
    },
  ])

  const { scope } = await prompt({
    type: 'input',
    name: 'scope',
    message:
      'Inform the scope of this change (home, cart, last-orders, etc) [optional]:',
  })

  const { ticketGITHUB } = await prompt({
    type: 'input',
    name: 'ticketGITHUB',
    message: 'Inform the GITHUB ticket (Sub-imp, sub-task, etc) Ex: 1234',
    validate(value) {
      return /^[0-9]+$/.test(value) ? true : 'Please enter only numbers'
    },
  })

  const { description } = await prompt({
    type: 'input',
    name: 'description',
    message: 'Enter a short description:',
  })

  const formattedParentGITHUB = ticketGITHUB ? `[PORT-${ticketGITHUB}]` : ''
  const formattedScope = scope ? `(${scope})` : ''

  const githubInfo = `${formattedParentGITHUB}`
  const lowercaseDescription = description.toLowerCase()
  const commitMessage = `${type}${formattedScope}: ${githubInfo ? githubInfo + ' ' : ''}${lowercaseDescription}`

  console.log(commitMessage)

  commit(commitMessage)
}

module.exports = {
  prompter,
}
