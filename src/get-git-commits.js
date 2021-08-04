import dayjs from 'dayjs'
import { gitlogPromise } from 'gitlog'
import { getPreviousMeetingTime } from './get-previous-meeting-time.js'

export const getGitCommits = async () => {
  const { REPO_PATH, GIT_AUTHOR } = process.env

  const previousMeetingTime = getPreviousMeetingTime()

  const gitLogOptions = {
    repo: REPO_PATH,
    number: 100,
    author: GIT_AUTHOR,
    after: previousMeetingTime,
    fields: ['subject', 'authorName', 'authorDate', 'hash', 'abbrevHash',],
    execOptions: { maxBuffer: 1000 * 1024 },
  }
  const commits = await gitlogPromise(gitLogOptions)
  
  return commits.filter(c => dayjs(c.authorDate).isAfter(previousMeetingTime))

}