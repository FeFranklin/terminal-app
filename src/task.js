export default class Task {
  constructor({ id, description, budget, stores, from, to }) {
    ;(this.id = id),
      (this.description = description),
      (this.budget = budget),
      (this.stores = stores),
      (this.from = from),
      (this.to = to)
  }

  formatted(language) {
    const mapDate = (date) => {
      const [year, month, day] = date.split('-').map(Number)

      return new Date(year, month - 1, day)
    }

    return {
      id: Number(this.id),
      description: this.description,
      budget: new Intl.NumberFormat(language, {
        style: 'currency',
        currency: 'BRL',
      }).format(this.budget),
      stores: new Intl.ListFormat(language, {
        style: 'long',
        type: 'conjunction',
      }).format(this.stores),
      from: new Intl.DateTimeFormat(language, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      }).format(mapDate(this.to)),
    }
  }

  static generateInstanceFromString(text) {
    const FIELDS_SEPARATOR = ';'
    const [id, description, budget, stores, from, to] = text.split(FIELDS_SEPARATOR)
    const person = new Task({
      id,
      description,
      budget,
      stores: stores.split(','),
      from,
      to,
    })

    return person
  }
}
