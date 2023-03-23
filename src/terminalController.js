import readline from 'readline'
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import Task from './task.js'

export default class TerminalController {
  constructor() {
    this.print = {}
    this.initialisationData = {}
  }

  initialiseTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    this.initialiseTable(database, language)
  }

  closeTerminal() {
    this.terminal.close()
  }

  initialiseTable(database, language) {
    const initialisationData = database.map((item) =>
      new Task(item).formatted(language)
    )
    const table = chalkTable(this.getTableOptions(), initialisationData)
    this.print = console.draft(table)
    this.initialisationData = initialisationData
  }

  updateTable(item) {
    this.initialisationData.push(item)
    this.print(chalkTable(this.getTableOptions(), this.initialisationData))
  }
  question(msg = '') {
    return new Promise((resolve) => this.terminal.question(msg, resolve))
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: 'id', name: chalk.cyan('ID') },
        { field: 'description', name: chalk.magenta('Description') },
        { field: 'budget', name: chalk.red('Budget') },
        { field: 'stores', name: chalk.green('Stores') },
        { field: 'from', name: chalk.yellow('From') },
        { field: 'to', name: chalk.yellow('To') },
      ],
    }
  }
}
