import fs from 'fs'

export const writeFile = async (content) => {
  const { FILE_NAME } = process.env

  if (!fs.existsSync(FILE_NAME)) {
    await fs.promises.appendFile(FILE_NAME, '')
  }

  await fs.promises.writeFile(FILE_NAME, 'Complete the following issues:\n')
  await fs.promises.appendFile(FILE_NAME, content)

  return Promise.resolve()
}