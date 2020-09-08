'use strict'
const current_env=process.env.NODE_CURRENT_ENV||'"dev"'
console.log('============编译环境s==============')
console.log(current_env)
console.log('============编译环境e==============')
module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  NODE_CURRENT_ENV: `'${current_env}'`
}
