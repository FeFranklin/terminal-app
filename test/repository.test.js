import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import { save } from '../src/repository.js'
import { readFile } from 'fs/promises'

describe('Repository', () => {
  it('should save a json file', async () => {
    const filePath = './../.repository.test/test.json'
    const { pathname: testFile } = new URL(filePath, import.meta.url)
    const expected = JSON.parse(await readFile(testFile))
    expected.push({test: true})
    await save({ test: true }, filePath)

    const result = JSON.parse(await readFile(testFile))

    expect(result).to.be.deep.equal(expected)
  })
})
