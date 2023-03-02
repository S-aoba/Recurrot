import type { MAIN_URL, SUB_URL } from '../const'

export type MainUrlKeys = keyof typeof MAIN_URL
export type MainUrlVal = (typeof MAIN_URL)[MainUrlKeys]

export type SubUrlKeys = keyof typeof SUB_URL
export type SubUrlVal = (typeof SUB_URL)[SubUrlKeys]
