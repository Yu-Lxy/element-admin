'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const current_env = process.env.NODE_CURRENT_ENV || '"dev"'

console.log('++++++++++++编译环境s++++++++++++++')
console.log(current_env)
console.log('++++++++++++编译环境e++++++++++++++')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_APP_BASE_API: '"http://localhost:3000"',
  NODE_CURRENT_ENV: `'${current_env}'`
})
