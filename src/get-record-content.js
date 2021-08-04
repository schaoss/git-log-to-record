import axios from 'axios'

export const getRecordContent = async (commits) => {
  const { JIRA_WEB_BASE_URL, JIRA_API_BASE_URL, JIRA_BASIC_AUTH_STRING } = process.env

  axios.defaults.headers.common['Authorization'] = `Basic ${JIRA_BASIC_AUTH_STRING}`;
  
  const issueMap = new Map()
  for (const c of commits) {
    const issues = [...c.subject.matchAll(/\[(.*?)\]/g)].map(res => res[1])

    for (const i of issues) {
      const jiraIssue = await axios.get(`${JIRA_API_BASE_URL}${i}`)
      const issueSummary = jiraIssue.data.fields.summary
      issueMap.set(i, issueSummary)
    }
  }

  const content = [...issueMap.entries()]
    .map(([k, v]) => `- [\[${k}\] ${v}](${JIRA_WEB_BASE_URL}${k})`)
    .sort()
    .join('\n')

  return content
}