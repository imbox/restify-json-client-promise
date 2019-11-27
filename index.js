const restify = require('restify-clients')
const { promisify, inspect } = require('util')

module.exports = function (opts) {
  const client = restify.createJsonClient({
    requestTimeout: 10000,
    connectTimeout: 10000,
    ...opts
  })

  const throwRestErrors = opts.throwRestErrors !== false
  const shouldThrow = res => {
    if (throwRestErrors) {
      return true
    } else {
      const statusCode = res && res.statusCode
      return !statusCode
    }
  }

  const get = promisify((url, cb) => {
    const e = new Error()
    client.get(url, (err, req, res, obj) => {
      if (err && shouldThrow(res)) {
        e.message =
          `${err.name}\n` +
          `    statusCode: ${res && res.statusCode}\n` +
          `    url: ${req.path}\n` +
          '    method: GET\n' +
          `    response: ${inspect(err.body)}\n`
        e.code = err.code
        e.body = err.body
        e.statusCode = err.statusCode
        return cb(e)
      }
      if (res.statusCode === 204) {
        obj = null
      }
      cb(null, { err, req, res, obj })
    })
  })
  const post = promisify((url, body, cb) => {
    const e = new Error()
    client.post(url, body, (err, req, res, obj) => {
      if (err && shouldThrow(res)) {
        e.message =
          `${err.name}\n` +
          `    statusCode: ${res && res.statusCode}\n` +
          `    url: ${req.path}\n` +
          '    method: GET\n' +
          `    response: ${inspect(err.body)}\n`
        e.code = err.code
        e.body = err.body
        e.statusCode = err.statusCode
        return cb(e)
      }
      if (res.statusCode === 204) {
        obj = null
      }
      cb(null, { err, req, res, obj })
    })
  })
  const put = promisify((url, body, cb) => {
    const e = new Error()
    client.put(url, body, (err, req, res, obj) => {
      if (err && shouldThrow(res)) {
        e.message =
          `${err.name}\n` +
          `    statusCode: ${res && res.statusCode}\n` +
          `    url: ${req.path}\n` +
          '    method: GET\n' +
          `    response: ${inspect(err.body)}\n`
        e.code = err.code
        e.body = err.body
        e.statusCode = err.statusCode
        return cb(e)
      }
      if (res.statusCode === 204) {
        obj = null
      }
      cb(null, { err, req, res, obj })
    })
  })
  const del = promisify((url, cb) => {
    const e = new Error()
    client.del(url, (err, req, res, obj) => {
      if (err && shouldThrow(res)) {
        e.message =
          `${err.name}\n` +
          `    statusCode: ${res && res.statusCode}\n` +
          `    url: ${req.path}\n` +
          '    method: GET\n' +
          `    response: ${inspect(err.body)}\n`
        e.code = err.code
        e.body = err.body
        e.statusCode = err.statusCode
        return cb(e)
      }
      if (res.statusCode === 204) {
        obj = null
      }
      cb(null, { err, req, res, obj })
    })
  })
  const close = () => client.close()

  return { get, post, put, del, close }
}
