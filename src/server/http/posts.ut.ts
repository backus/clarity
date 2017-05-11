import * as express from 'express'
import * as supertest from 'supertest'
import {initSession} from '../../../utils/test/session'
import {MockUserService} from '../service/user.mock'
import {MockPostService} from '../service/post.mock'

jest.mock('../service/user', () => ({
  userService: new MockUserService(),
}))
jest.mock('../service/post', () => ({
  postService: new MockPostService(),
}))

import PostsRouter from './posts'

const app = express()
initSession(app)
app.use('/api/posts', PostsRouter)

describe('Posts HTTP', () => {
  describe('GET /api/posts', () => {
    it('retrieves list of posts', () => {
      supertest(app)
        .get('/api/posts') // ?username=foobar')
        .then((res) => expect(res.body).toEqual([
          {dataValues: {userId: 1}},
          {dataValues: {userId: 2}},
          {dataValues: {userId: 2}},
        ]))
    })
  })
  describe('/api/posts/create', () => {
    it('returns a created post', () => {
      supertest(app)
        .post('/api/posts/create?username=baz')
        .then((res) => expect(res.body.dataValues).toEqual({userId: 123}))
    })
  })

  describe('/api/posts/:id', () => {
    const [existentId, nonexistentId] = [1, 2]

    const getIterations = async (id: number) =>
      (await supertest(app).get(`/api/posts/${id}`)).body

    it(`retrieves the post's iterations`, async () => {
      expect(await getIterations(existentId)).toEqual([
        {dataValues: {postId: '1', title: 'Post 1, with no body'}},
        {dataValues: {postId: '1', title: 'Post 2, with body', body: 'Body of post 2'}},
      ])
    })

    it(`error message when id doesn't correspond to a post`, async () => {
      expect(await getIterations(nonexistentId)).toEqual({message: 'Cannot find post with id 2'})
    })
  })
})


