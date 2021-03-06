import * as Sequelize from 'sequelize'
import * as R from 'ramda'

import {models, sequelize} from '~/server/db'
import {PostInstance} from '~/server/db/models/post'
import {MockPostService} from './post.mock'
import {UserInstance} from '~/server/db/models/user'
import {IterationInstance} from '~/server/db/models/iteration'
import Hermes from '~/../utils/hermes'

const logger = new Hermes({name: 'server'})

const sequelizeFailure = (reject: Function) => (
  error: Sequelize.ValidationError
) => {
  logger.warn(error.toString()) // Log full error
  reject(error) // Return only the descriptive .errors array
  // reject(error.errors[0]) // Return only the descriptive .errors array
}

type IIteration = {body?: string; title: string}

const validateIteration = (
  iteration: IIteration,
  reject: Function,
  cb: Function
) => {
  if (R.isEmpty(iteration.title)) {
    return reject('Please provide a title.')
  }
  if (R.isEmpty(iteration.body)) {
    return reject('Please write something.')
  }
  cb()
}

const initPost = (
  resolve: Function,
  userId: number,
  iteration: IIteration
) => async (t: Sequelize.Transaction) => {
  const post: PostInstance = await models.Post.create({userId}, {transaction: t})
  await models.Iteration.create({...iteration, postId: post.get('id')})
  resolve(post)
}

export class PostService extends MockPostService {
  create(user: UserInstance, iteration: IIteration) {
    return new Promise<PostInstance>((resolve: Function, reject: Function) => {
      if (!user || !user.get('id')) {
        return reject('Please provide a user.')
      }
      validateIteration(iteration, reject, () => {
        return sequelize
          .transaction(initPost(resolve, user.get('id'), iteration))
          .then((post: PostInstance) => resolve(post))
          .catch((err: Error) => reject(err))
      })
    })
  }

  all() {
    return new Promise<PostInstance[]>((resolve: Function, reject: Function) => {
      return models.Post
        .findAll()
        .then((posts: PostInstance[]) => resolve(posts))
        .catch(sequelizeFailure(reject))
    })
  }

  ownedBy(user: UserInstance) {
    return new Promise<PostInstance[]>((resolve: Function, reject: Function) => {
      return models.Post
        .findAll({where: {userId: user.get('id')}})
        .then((posts: PostInstance[]) => resolve(posts))
        .catch(sequelizeFailure(reject))
    })
  }

  iterations(postId: number) {
    return new Promise<IterationInstance[]>((resolve, reject) => {
      return models.Iteration.findAll({where: {postId}}).then(resolve).catch(reject)
    })
  }

  iterate(postId: number, data: IIteration) {
    return new Promise<IterationInstance>((resolve, reject) => {
      validateIteration(data, reject, () => {
        return models.Iteration.create({postId, ...data}).then(resolve).catch(reject)
      })
    })
  }

  comments(iterationId: number) {
    return new Promise<IterationInstance[]>((resolve, _reject) => {
      iterationId
      resolve([])
    })
  }
}

export const postService = new PostService()
