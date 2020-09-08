import http from '../http'
import qs from 'qs'


/*=================个人/个人中心==================*/

/**
 * [获取员工个人信息]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getAccountDetail = (parameter) => {
  return http.fetchGet('/user/detail', parameter)
}

/**
 * [重置自身密码]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const resetAccountPwd = (parameter) => {
  return http.fetchPost('/user/password/reset', qs.stringify(parameter))
}

/**
 * [重置自身手机]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const updateAccountMobile = (parameter) => {
  return http.fetchPost('/user/mobile/update', qs.stringify(parameter))
}

/**
 * [账户对应权限]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getAccountPermissions = (parameter) => {
  return http.fetchGet('/user/menu', parameter)
}
