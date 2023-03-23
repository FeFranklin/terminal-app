import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Task from '../src/task.js'

describe('Task', () => {
  it('should return a task instance from a string', () => {
    const task = Task.generateInstanceFromString(
      '1;description;2000;Bike,Car;2020-01-01;2020-02-01'
    )

    const expected = {
      id: '1',
      description: 'description',
      budget: '2000',
      stores: ['Bike', 'Car'],
      from: '2020-01-01',
      to: '2020-02-01',
    }

    expect(task).to.be.deep.equal(expected)
  })

  it('should return an instance from the constructor', () => {
    const task = new Task({
      id: '1',
      description: 'description',
      budget: '2000',
      stores: ['Bike', 'Car'],
      from: '2020-01-01',
      to: '2020-02-01',
    })

    const expected = {
      id: '1',
      description: 'description',
      budget: '2000',
      stores: ['Bike', 'Car'],
      from: '2020-01-01',
      to: '2020-02-01',
    }

    expect(task).to.be.deep.equal(expected)
  })

  it('should format the values', () => {
    const task = Task.generateInstanceFromString(
      '1;description;2000;Bike,Car;2020-01-01;2020-02-01'
    ).formatted('pt-BR')

    const expected = {
      id: 1,
      description: 'description',
      budget: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format('2000'),
      stores: 'Bike e Car',
      from: '01 de janeiro de 2020',
      to: '01 de fevereiro de 2020',
    }

    expect(task).to.be.deep.equal(expected)
  })
})
