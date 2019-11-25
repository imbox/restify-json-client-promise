/* eslint-env mocha */
const restify = require('restify')
const should = require('should')
const jsonClient = require('../')

describe('Client', function () {
  let server
  let client

  beforeEach(function (done) {
    server = restify.createServer()
    server.listen(0, done)
  })

  afterEach(function () {
    server.close()
    client && client.close()
  })

  it('GET', async function () {
    server.get('/', (req, res, next) => {
      res.send(200, { data: [1] })
      next()
    })

    client = jsonClient({
      url: `http://localhost:${server.address().port}`
    })
    const { err, obj, res, req } = await client.get('/')
    obj.should.deepEqual({ data: [1] })
    res.should.containDeep({ statusCode: 200 })
    req.should.containDeep({ path: '/' })
    should.not.exist(err)
  })

  it('GET InternalServerError', async function () {
    server.get('/', (req, res, next) => {
      res.send(500)
      next()
    })

    client = jsonClient({
      url: `http://localhost:${server.address().port}`
    })

    let e
    try {
      await client.get('/')
    } catch (err) {
      e = err
    }
    e.should.containDeep({ statusCode: 500, code: 'InternalServer', body: {} })
    e.message.should.containEql('InternalServerError')

    // OBS!
    // This will break on changes to this file, but I want it here in order to
    // verify that the stack trace includes the calling line.
    e.stack.should.containEql('client.spec.js:48')
  })
})
