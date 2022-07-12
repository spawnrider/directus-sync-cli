import * as chalk from 'chalk'

/**
 * Keyword map used for colorizing specific keywords
 */
const keywordsMap = new Map<string, chalk.Chalk>([
  ['ok', chalk.green],
  ['warn', chalk.yellow],
  ['err', chalk.red],
])

/**
 * Get Chalk instance for a specific keyword
 * @param keyword A string keyword
 * @returns A Chalk instance
 */
const getChalkForKeyword = (keyword: string): chalk.Chalk => {
  return keywordsMap.has(keyword) ? keywordsMap.get(keyword)! : chalk.green
}

/**
 * Get Chalk string for a specific keyword
 * @param keyword A string keyword
 * @returns A Chalk styled string
 */
const getChalkStringForKeyword = (keyword: string): string => {
  return keywordsMap.has(keyword) ? keywordsMap.get(keyword)!(keyword) : chalk.green(keyword)
}

export default {
  getChalkForKeyword,
  getChalkStringForKeyword,
}

