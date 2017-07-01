import * as passport from 'passport'
import * as Facebook from 'passport-facebook'

import {userService} from '~/server/service/user'
import {UserInstance} from '~/server/db/models/user'
const Mock = require('~/server/service/authentication/strategy.mock')

export interface IPassportConfig {
  clientID: string
  clientSecret: string
  callbackURL: string
}

export const setupStrategy = (c: IPassportConfig) => {
  passport.use(
    new Facebook.Strategy(c, (_token, _refreshToken, profile, done) => {
      const facebookId = profile.id
      userService
        .signIn(facebookId)
        .then((_u: UserInstance) => done(null, profile))
        .catch((e: any) => done(JSON.stringify(e)))
    })
  )

  passport.use(
    // TODO: any
    new Mock.Strategy(
      c,
      (_token: string, _refreshToken: string, profile: any, done: Function) => {
        const facebookId = profile.id
        userService
          .signIn(facebookId)
          .then((_u: UserInstance) => done(null, profile))
          .catch((e: any) => done(JSON.stringify(e)))
      }
    )
  )

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
}