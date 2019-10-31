const restify = require('restify-clients')
const { promisify, inspect } = require('util')
const Verror = require('verror')

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
    client.get(url, (err, req, res, obj) => {
      if (err && shouldThrow(res)) {
        const context = new Verror({
          name:
            'ApiError\n' +
            `    statusCode: ${res && res.statusCode}\n` +
            `    url: ${req.path}\n` +
            '    method: GET\n' +
            `    response: ${inspect(err.body)}\n`,
          cause: err
        })
        return cb(new Error(Verror.fullStack(context)))
      }
      if (res.statusCode === 204) {
        obj = null
      }
      cb(null, { err, req, res, obj })
    })
  })
  const post = promisify((url, body, cb) => {
    client.post(url, body, (err, req, res, obj) => {
      if (err && shouldThrow(res)) {
        const context = new Verror({
          name:
            'ApiError\n' +
            `    statusCode: ${res && res.statusCode}\n` +
            `    url: ${req.path}\n` +
            '    method: POST\n' +
            `    response: ${inspect(err.body)}\n`,
          cause: err
        })
        return cb(new Error(Verror.fullStack(context)))
      }
      if (res.statusCode === 204) {
        obj = null
      }
      cb(null, { err, req, res, obj })
    })
  })
  const put = promisify((url, body, cb) => {
    client.put(url, body, (err, req, res, obj) => {
      if (err && shouldThrow(res)) {
        const context = new Verror({
          name:
            'ApiError\n' +
            `    statusCode: ${res && res.statusCode}\n` +
            `    url: ${req.path}\n` +
            '    method: PUT\n' +
            `    response: ${inspect(err.body)}\n`,
          cause: err
        })
        return cb(new Error(Verror.fullStack(context)))
      }
      if (res.statusCode === 204) {
        obj = null
      }
      cb(null, { err, req, res, obj })
    })
  })
  const del = promisify((url, cb) => {
    client.del(url, (err, req, res, obj) => {
      if (err && shouldThrow(res)) {
        const context = new Verror({
          name:
            'ApiError\n' +
            `    statusCode: ${res && res.statusCode}\n` +
            `    url: ${req.path}\n` +
            '    method: DELETE\n' +
            `    response: ${inspect(err.body)}\n`,
          cause: err
        })
        return cb(new Error(Verror.fullStack(context)))
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
