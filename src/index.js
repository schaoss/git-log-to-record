import consola from 'consola'

import { getGitCommits } from './get-git-commits.js'
import { getRecordContent } from './get-record-content.js'
import { writeFile } from './write-file.js'

export const genRecord = async () => {
  consola.info(`Getting git logs...`)
  const commits = await getGitCommits()

  consola.info(`Fetching jira issues...`)
  const content = await getRecordContent(commits)

  consola.info(`Writing file...`)
  await writeFile(content)

  consola.success(`Done!`)

  return Promise.resolve()
}
export default {
  genRecord
}