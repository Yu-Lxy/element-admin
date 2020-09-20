import http from '../http'
import qs from 'qs'

/**
 * [登录接口]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const login = (data) => {
  return http.fetchPost('/login', data)
}

/**
 * [退出接口]
 * @return {[type]} [description]
 */
export const logout = () => {
  return http.fetchPost('/logout')
}

/**
 * [修改密码接口]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const resetPassword = (data) => {
  return http.fetchPost('/password/reset', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * [获取用户信息接口]
 * @return {[type]} [description]
 */
export const getInfo = () => {
  return http.fetchGet('/user/info')
}

/**
 * [获取用户菜单信息]
 * @return {[type]} [description]
 */
export const getRouterByUser = () => {
  return http.fetchGet('/menu/user')
}

/**
 * [获取root菜单列表]
 * @param  {[type]} parameter [查询规则]
 * @return {[type]}           [description]
 */
export const getPermissions = (parameter) => {
  return http.fetchGet('/menu/list', parameter)
}

/**
 * [保存或更新菜单]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const menuSavePerm = (parameter) => {
  return http.fetchPost('/menu' + (parameter.menuId > 0 ? '/update' : '/save'), parameter)
}
/**
 * [删除菜单]
 * @param  {[type]} deptId [description]
 * @return {[type]}        [description]
 */
export const menuDelPerm = (deptId) => {
  return http.fetchPost('/menu/remove/' + `${deptId}`)
}

/**
 * [获取权限角色列表]
 * @return {[type]} [description]
 */
export const getRoles = (parameter) => {
  return http.fetchGet('/role/list', parameter)
}

/**
 * [获取表格数据]
 * @return {[type]} [description]
 */
export const getTableData = (parameter) => {
  return new Promise ((resolve, reject) => {
    const res = {
      data: {
        currentPage: 1,
        list: [{
          id: '1',
          date: '2020-05-02',
          name: '王小虎'
        },{
          id: '2',
          date: '2016-05-02',
          name: '王小二'
        },{
          id: '3',
          date: '2019-05-02',
          name: '哈哈哈'
        }],
        totalElement: 10,
        totalPage: 1
      }
    }
    resolve(res)
  })
}

/**
 * [获取所有权限]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getRoleAll = () => {
  return http.fetchGet('/role/all')
}

/**
 * [角色删除]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const delRole = (parameter) => {
  return http.fetchPost('/role/remove', qs.stringify(parameter))
}

/**
 * [获取角色对应菜单权限数据]
 * @param  {[type]} roleId [description]
 * @return {[type]}        [description]
 */
export const getRolePermIds = (roleId) => {
  return http.fetchGet('/menu/role/' + `${roleId}`)
}

/**
 * [保存更新权限角色]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const saveRole = (parameter) => {
  return http.fetchPost('/role' + (parameter.roleId > 0 ? '/update' : '/save'), parameter)
}



/**
 * [获取用户列表]
 * @param  {[type]} pageNum  [description]
 * @param  {[type]} pageSize [description]
 * @return {[type]}          [description]
 */
export const getUserList = (parameter) => {
  return http.fetchGet('/user/list', parameter)
}

/**
 * [删除用户]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const delUser = (parameter) => {
  return http.fetchPost('/user/remove', qs.stringify(parameter))
}

/**
 * [重置用户密码]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const resetPwd = (parameter) => {
  return http.fetchPost('/user/resetPwd', parameter)
}

/**
 * [保存更新用户]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const saveUser = (parameter) => {
  return http.fetchPost('/user' + (parameter.userId > 0 ? '/update' : '/save'), parameter)
}

/**
 * [设置用户状态]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const changUserStatus = (parameter) => {
  return http.fetchPost('/user/status', parameter)
}