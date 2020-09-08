const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  addRouters: state => state.permission.addRouters,
  avatar: state => state.user.userInfo?state.user.avatar:'',
  name: state => state.user.userInfo?state.user.name:'',
  userInfo: state => state.user,
  roles: state => state.user.roles,
  // 从后台获取的用户 按钮权限
  buttons: state => state.user.buttons,
  userId: state => state.user.userId
}

export default getters