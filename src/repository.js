import { writeFile, readFile } from 'fs/promises'

export const save = async (data, path) => {
  const { pathname: databaseFile } = new URL(
    path || './../database.json',
    import.meta.url
  )
  const currentData = JSON.parse(await readFile(databaseFile))
  currentData.push(data)

  await writeFile(databaseFile, JSON.stringify(currentData))
}
