const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map((r) => r.title)
  expect(titles).toContain('Title B')
})

test('existing of ID property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid note can be added', async () => {
  const newBlog = {
    title: 'Title C',
    author: 'Author C',
    url: 'www.c.com',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map((n) => n.title)

  expect(titles).toContain('Title C')
})

test('Default likes property = 0', async () => {
  const newBlog = {
    title: 'Title C',
    author: 'Author C',
    url: 'www.c.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blog = blogsAtEnd.find((blog) => blog.title === newBlog.title)

  expect(blog.likes).toBe(0)
})

test('error for missing title and author property', async () => {
  const newBlog = {
    url: 'www.c.com',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('delete blog', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blog = blogsAtStart.find(
    (blog) => blog.title === helper.initialBlogs[1].title
  )

  await api.delete(`/api/blogs/${blog.id}`)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).not.toContain(blog.title)
})

test('update blog', async () => {
  const blogsAtEnd = await helper.blogsInDb()

  const updatedBlog = blogsAtEnd.find(
    (blog) => blog.title === helper.initialBlogs[0].title
  )

  updatedBlog.likes = 10

  const response = await api
    .put(`/api/blogs/${updatedBlog.id}`)
    .send(updatedBlog)
  expect(response.body.likes).toBe(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})
