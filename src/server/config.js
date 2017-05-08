/**
 * Load environment variables from .env for local development.
 * If no .env file is to be found at
 */
const path  = require('path')
const chalk = require('chalk')
const env   = require('dotenv').config({ path: path.resolve('.env') })

if (env.error) {
  console.warn(chalk.yellow(`No config file was found at ${env.error.path}`))
} else {
  console.info(chalk.green('Environment variables loaded from .env:'))
  console.info(chalk.grey(JSON.stringify(env, null, 2)))
}

module.exports = {
  port:         process.env.PORT || 4000,
  host:         process.env.HOST || 'localhost',
  env:          process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  sentry_dsn:   process.env.SENTRY_DSN,
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    dialect:  'postgres',
    logging:  process.env.NODE_ENV !== 'test' && console.log,
    timezone: '+00:00',
  }
}
