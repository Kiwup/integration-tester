'use strict'

const Promise = require('bluebird')
const { MongoClient } = require('mongodb')

/* DATABASES */
const FAST_STATS_URI = 'mongodb://mongodb-test:27017/fast-stats-test'
const STATS_URI = 'mongodb://mongodb-test:27017/stats-test'
const MAIN_URI = 'mongodb://mongodb-test:27017/reelevant-test'

const getConnexionFactory = (uri) => () => MongoClient.connect(uri, {
  promiseLibrary: Promise
}).disposer((db) => db.close())

const clearDatabaseFactory = (uri) => () => Promise.using((getConnexionFactory(uri))(), (db) => {
  return db.collections().map((col) => col.deleteMany({}))
})

const getFastStatsConnexion = getConnexionFactory(FAST_STATS_URI)
const getStatsConnexion = getConnexionFactory(STATS_URI)
const getMainConnexion = getConnexionFactory(MAIN_URI)
const clearFastStatsDatabase = clearDatabaseFactory(FAST_STATS_URI)
const clearStatsDatabase = clearDatabaseFactory(STATS_URI)
const clearMainDatabase = clearDatabaseFactory(MAIN_URI)

/* OTHERS */
function binaryParser (res, callback) {
  res.setEncoding('binary')
  res.data = ''
  res.on('data', function (chunk) {
    res.data += chunk
  })
  res.on('end', function () {
    callback(null, Buffer.from(res.data, 'binary'))
  })
}

module.exports = {
  getFastStatsConnexion,
  getStatsConnexion,
  getMainConnexion,
  clearFastStatsDatabase,
  clearStatsDatabase,
  clearMainDatabase,
  binaryParser
}
