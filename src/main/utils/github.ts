import { Http } from './request'
import { Common } from '../common'

const github = Common.GITHUB

const githubUrl = (path: string) =>
  `https://gitee.com/api/v5/repos/${github.name}/${github.repo}/contents/${path}`
// `https://gitee.com/${github.name}/${github.repo}/raw/${github.branch}/${path}`
// `https://fastly.jsdelivr.net/gh/${github.name}/${github.repo}@${github.branch}/${path}`
// `https://raw.githubusercontent.com/${github.name}/${github.repo}/${github.branch}/${path}`
// `https://raw.githubusercontent.com/${github.name}/${github.repo}/${github.branch}/${path}`

export async function getGithubFile(path): Promise<Buffer> {
  const res = await Http.GET(githubUrl(path))
  const { content } = JSON.parse(res.toString()) || ''
  return Buffer.from(content, 'base64')
}
