import dotenv from 'dotenv'
import { genRecord } from './src/index.js'

const isProd = process.env.NODE_ENV !== 'development'

dotenv.config()

await genRecord()

if (isProd) {
  process.exit()
}