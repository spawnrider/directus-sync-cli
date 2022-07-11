import * as chalk from 'chalk'

const keywordsMap = new Map<string, chalk.Chalk>([
  ['ok', chalk.green],
  ['warn', chalk.yellow],
  ['err', chalk.red],
])

const getChalkForKeyword = (keyword: string): chalk.Chalk => {
  return keywordsMap.has(keyword) ? keywordsMap.get(keyword)! : chalk.green
}

export default {
  getChalkForKeyword,
}

