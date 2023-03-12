import { Http } from './request'
import { Common } from '../common'

const github = Common.GITHUB

const githubUrl = (path: string) =>
  `https://cdn.jsdelivr.net/gh/${github.name}/${github.repo}@${github.branch}/${path}`

export async function getGithubFile(path) {
  return Http.GET(githubUrl(path))
}
