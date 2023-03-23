import { readFileSync } from 'fs'
const fileUrl = new URL('./../database.json', import.meta.url)
const database = JSON.parse(readFileSync(fileUrl))
import Task from './task.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'

const DEFAULT_LANG = 'pt-br'
const STOP_TERMINAL_KEY = ':q'

const terminalController = new TerminalController()
terminalController.initialiseTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question(
      'Would you like to add another task to the list?'
    )
    if (answer === STOP_TERMINAL_KEY) {
      terminalController.closeTerminal()
      console.log('process finished!')
      return
    }
    const person = Task.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANG))
    await save(person)

    return mainLoop()
  } catch (e) {
    console.log('Error:', e)
    return mainLoop()
  }
}

;(async () => {
  await mainLoop()
})()
