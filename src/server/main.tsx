import * as R from 'ramda'
import * as Chalk from 'chalk'

import Hermes from '~/../utils/hermes'
import {newApp} from '~/../utils/http/newApp'

import http from './http'
import * as Passport from './http/authentication'
import {runHotMiddleware} from './middleware'
import {listen} from './listen'
import {monitorExceptions} from './exceptionMonitoring'
import {serveFrontend} from './serveFrontend'
import {sequelize} from './db'
import {setupSession} from './session'

const {LOCAL_ENVS} = require('./config/environments')
const config = require('./config/index.js')
const logger = new Hermes({name: 'server'})

const app = newApp([
  a => a.use(require('helmet')()),
  monitorExceptions(config),
  setupSession, // Must happen before initializing the API
  http,
  Passport.setup(config),
])

if (R.contains(config.env, LOCAL_ENVS)) {
  logger.print(Chalk.bgBlue.black(`\n\n  Running HMR...  \n`))
  runHotMiddleware(app)
}

serveFrontend(app)

sequelize.sync().then(() => listen(app, config))
