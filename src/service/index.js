import http from './http'
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

/*=================评论模块/帮助==================*/

/**
 * [获取帮助问题列表]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getFaqList = (parameter) => {
  return http.fetchGet('/faq/list', parameter)
}

/**
 * [帮助类型接口]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getFaqTypeList = (parameter) => {
  return http.fetchGet('/faq/type/list', parameter)
}

/**
 * [删除帮助问题接口]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const delFaq = (parameter) => {
  return http.fetchPost('/faq/delete', qs.stringify(parameter))
}

/**
 * [更新保存帮助问题]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const saveFaq = (parameter) => {
  return http.fetchPost('/faq' + (parameter.id > 0 ? '/update' : '/save'), parameter)
}



/*=================发布模块/文本配置==================*/

/**
 * [获取文本列表]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getDocList = (parameter) => {
  return http.fetchGet('/doc/list', parameter)
}


/**
 * [更新保存文本]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const saveDoc = (parameter) => {
  return http.fetchPost('/doc' + (parameter.id > 0 ? '/update' : '/save'), parameter)
}


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

/**
 * [获取app用户列表]
 */
export const getAppUserList = (parameter) => {
  return http.fetchGet('/app/user/list/search', parameter, { timeout: 200000 })
}

/**
 * [更换用户头像]
 */
export const changeAvatar = (parameter) => {
  return http.fetchPost('/app/user/update_avatar', parameter)
}

/**
 * [获取用户详情]
 */
export const getAppUserDetail = (parameter) => {
  return http.fetchGet('/app/user/detail', parameter)
}

/**
 * [更改用户备注]
 */
export const changeRemark = (parameter) => {
  return http.fetchPost('/app/user/update_remark', qs.stringify(parameter))
}

/**
 * [更改用户白名单状态]
 */
export const changeWhiteList = (parameter) => {
  return http.fetchPost('/app/user/white_list/update', qs.stringify(parameter))
}

/**
 * [更改用户手机号]
 */
export const changeMobile = (parameter) => {
  return http.fetchPost('/app/user/update_mobile', parameter)
}

/**
 * [资产转移]
 */
export const transferProperty = (parameter) => {
  return http.fetchPost('/app/user/asset', parameter)
}

/**
 * [导入app用户]
 */
export const importAppUser = (parameter) => {
  return http.fetchPost('/app/user/import', parameter)
}

/**
 * [获取app用户续费明细]
 */
export const getUserVipSource = (parameter) => {
  return http.fetchGet('/app/user/list_vip_bought', parameter)
}

/**
 * [获取app用户优惠券明细]
 */
export const getUserConponCount = (parameter) => {
  return http.fetchGet('/app/user/list_coupon', parameter)
}

/**
 * [获取app用户积分明细]
 */
export const getUserPoints = (parameter) => {
  return http.fetchGet('/app/user/list_point', parameter)
}

/**
 * [获取app用户邀请记录]
 */
export const getUserVisiteVip = (parameter) => {
  return http.fetchGet('/app/user/list_vip_invite', parameter)
}

/**
 * [获取app用户已听记录]
 */
export const getUserDuration = (parameter) => {
  return http.fetchGet('/app/user/list_listen_serial', parameter)
}

/**
 * [获取app用户已听记录详情]
 */
export const getUserDurationDetail = (parameter) => {
  return http.fetchGet('/app/user/list_listen_episode', parameter)
}

/**
 * [获取反馈列表]
 */
export const getFeedbackList = (parameter) => {
  return http.fetchGet('/feedback/list', parameter)
}

/**
 * [获取反馈详情]
 */
export const getFeedbackDetail = (parameter) => {
  return http.fetchGet('/feedback/detail', parameter)
}

/**
 * [关闭反馈]
 */
export const closeFeedback = (parameter) => {
  return http.fetchGet('/feedback/close', parameter)
}

/**
 * [回复反馈]
 */
export const feedbackReply = (parameter) => {
  return http.fetchPost('/feedback/reply', parameter)
}

/*=================内容/人物==================*/
/**
 * [人物列表]
 */
export const getPersonList = (parameter) => {
  return http.fetchGet('/person/list', parameter)
}

/**
 * [人物详情]
 */
export const getPersonDetail = (parameter) => {
  return http.fetchGet('/person/detail', parameter)
}

/**
 * [人物角色列表接口]
 */
export const getPersonRoleList = (parameter) => {
  return http.fetchGet('/person/role/list', parameter)
}

/**
 * [保存更新人物]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const savePerson = (parameter) => {
  return http.fetchPost('/person' + (parameter.id > 0 ? '/update' : '/save'), parameter)
}

/**
 * [删除人物接口]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const delPerson = (parameter) => {
  return http.fetchPost('/person/delete', qs.stringify(parameter))
}

/*=================内容/分类==================*/
/**
 * [分类列表]
 */
export const getCategoryList = (parameter) => {
  return http.fetchGet('/category/list', parameter)
}
/**
 * [保存更新分类]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const saveCategory = (parameter) => {
  return http.fetchPost('/category' + (parameter.id > 0 ? '/update' : '/save'), parameter)
}

/**
 * [删除分类接口]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const delCategory = (parameter) => {
  return http.fetchPost('/category/delete', qs.stringify(parameter))
}

/**
 * [分类排序接口]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const sortCategoryList = (parameter) => {
  return http.fetchPost('/category/order', parameter)
}

/**
/*
 * [书籍列表]
 */
export const getBookList = (parameter) => {
  return http.fetchGet('/book/list', parameter)
}

/**
 * [保存书籍]
 */
export const saveBook = (parameter) => {
  return http.fetchPost('/book/save', parameter)
}

/**
 * [更新书籍]
 */
export const updateBook = (parameter) => {
  return http.fetchPost('/book/update', parameter)
}

/**
 * [删除书籍]
 */
export const deleBook = (parameter) => {
  return http.fetchPost('/book/delete', qs.stringify(parameter))
}

/**
 * [上下线书籍]
 */
export const onOffBook = (parameter) => {
  return http.fetchPost('/book/status', qs.stringify(parameter))
}

/**
 * [定时上线书籍]
 */
export const timingOnlineBook = (parameter) => {
  return http.fetchPost('/book/timing/online', qs.stringify(parameter))
}

/**
 * [专辑列表]
 */
export const getSerialList = (parameter) => {
  return http.fetchGet('/serial/list', parameter)
}

/**
 * [保存专辑]
 */
export const serialSave = (parameter) => {
  return http.fetchPost('/serial/save', parameter)
}

/**
 * [更新专题]
 */
export const serialUpdate = (parameter) => {
  return http.fetchPost('/serial/update', parameter)
}

/**
 * [专辑详情]
 */
export const serialDetail = (parameter) => {
  return http.fetchGet('/serial/detail', parameter)
}

/**
 * [专辑上下线]
 */
export const serialOnOff = (parameter) => {
  return http.fetchPost('/serial/status', qs.stringify(parameter))
}

/**
 * [专辑定时上线]
 */
export const serialTimingOnline = (parameter) => {
  return http.fetchPost('/serial/timing/online', qs.stringify(parameter))
}

/**
 * [专辑管理（阶段）]
 */
export const serialManage = (parameter) => {
  return http.fetchPost('/serial/stage/update', parameter)
}

/**
 * [删除专辑]
 */
export const serialDelete = (parameter) => {
  return http.fetchPost('/serial/delete', qs.stringify(parameter))
}

/**
 * [专辑音频关联列表]
 */
export const getSerialEpisodeList = (parameter) => {
  return http.fetchGet('/serial/episode/list', parameter)
}

/*=================内容/电子书==================*/
/**
 * [电纸书列表]
 */
export const getEbookList = (parameter) => {
  return http.fetchGet('/ebook/list', parameter)
}
/**
 * [保存更新电纸书]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const saveEbook = (parameter) => {
  // return http.fetchPost('/ebook' + (parameter.get('serialId') > 0 ? '/update' : '/save'), parameter, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data;charset=UTF-8'
  //   }
  // })
  return http.fetchPost('/ebook' + (parameter.serialId > 0 ? '/update' : '/save'), parameter)
}
/**
 * [获取是否已经存在、对应书籍信息]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getCheckEbookInfo = (parameter) => {
  return http.fetchGet('/ebook/check', parameter)
}

export const getEbookDetail = (parameter) => {
  return http.fetchGet('/ebook/detail', parameter)
}
/**
 * [上下线书籍]
 */
export const onOffEbook = (parameter) => {
  return http.fetchPost('/ebook/status', qs.stringify(parameter))
}
/**
 * [删除电子书]
 */
export const delEbook = (parameter) => {
  return http.fetchPost('/ebook/delete', qs.stringify(parameter))
}

/**
 * [定时上线书籍]
 */
export const timingOnlineEbook = (parameter) => {
  return http.fetchPost('/ebook/timing', qs.stringify(parameter))
}

/*=================音频/批量上传==================*/
/**
 * [音频批量创建接口]
 */
export const saveEpisodeUpload = (parameter) => {
  return http.fetchPost('/episode/save', parameter)
}

/**
 * [删除音频]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const delEpisode = (parameter) => {
  return http.fetchPost('/episode/delete', qs.stringify(parameter))
}

/**
 * [音频列表接口]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getEpisodeList = (parameter) => {
  return http.fetchGet('/episode/list', parameter)
}

/**
 * [添加音频]
 */
export const serialAddEpisode = (parameter) => {
  return http.fetchPost('/serial/episode/add', parameter)
}
/**
 * [专辑删除音频]
 */
export const serialDeleteEpisode = (parameter) => {
  return http.fetchPost('/serial/episode/delete', qs.stringify(parameter))
}

/**
 * [专辑音频置顶]
 */
export const serialEpisodeTop = (parameter) => {
  return http.fetchPost('/serial/episode/roof', qs.stringify(parameter))
}

/**
 * [音频详情]
 */
export const getEpisodeDetail = (parameter) => {
  return http.fetchGet('/episode/detail', parameter)
}

/**
 * [修改音频]
 */
export const episodeUpdate = (parameter) => {
  return http.fetchPost('/episode/update', parameter)
}

/**
 * [音频上下线]
 */
export const episodeOnOff = (parameter) => {
  return http.fetchPost('/serial/episode/status', parameter)
}

/**
 * [音频定时上下线]
 */
export const episodeTimingOnline = (parameter) => {
  return http.fetchPost('/serial/episode/timing/online', qs.stringify(parameter))
}

/**
 * [音频批量处理属性、分享]
 */
export const episodeInfoUpdate = (parameter) => {
  return http.fetchPost('/serial/episode/info', parameter)
}

/**
 * [音频关联表排序]
 */
export const serialEpisodeSort = (parameter) => {
  return http.fetchPost('/serial/episode/order', parameter)
}

/**
 * [虚拟数列表]
 */
export const virtualList = () => {
  return http.fetchGet('/virtual/list')
}
/**
 * [虚拟配置系数修改]
 */
export const virtualUpdate = (parameter) => {
  return http.fetchPost('/virtual/update', parameter)
}

/*=================素材==================*/
/**
 * [素材列表]
 */
export const getMaterialList = (parameter) => {
  return http.fetchGet('/material/list', parameter)
}

/**
 * [保存素材]
 */
export const materialSave = (parameter) => {
  return http.fetchPost('/material/save', parameter)
}

/**
 * [更新素材]
 */
export const materialUpdate = (parameter) => {
  return http.fetchPost('/material/update', parameter)
}

/**
 * [素材详情]
 */
export const materialDetail = (parameter) => {
  return http.fetchGet('/material/detail', parameter)
}

/**
 * [素材删除]
 */
export const materialDelete = (parameter) => {
  return http.fetchPost('/material/delete', qs.stringify(parameter))
}

/*=================评论==================*/
/**
 * [评论列表]
 */
export const getCommentList = (parameter) => {
  return http.fetchGet('/comment/list', parameter)
}

/**
 * [批量更新评论状态]
 */
export const commentUpadte = (parameter) => {
  return http.fetchPost('/comment/status/update', parameter)
}

/**
 * [获取评论回复列表]
 */
export const getCommentReplyList = (parameter) => {
  return http.fetchGet('/comment/content/list', parameter)
}

/**
 * [回复评论]
 */
export const replyComment = (parameter) => {
  return http.fetchPost('/comment/content/reply', parameter)
}

/*=================延伸阅读==================*/
/**
 * [获取延伸阅读列表]
 */
export const getExtendList = (parameter) => {
  return http.fetchGet('/extend/list', parameter)
}

/**
 * [延伸阅读上下线]
 */
export const extendOnOff = (parameter) => {
  return http.fetchPost('/extend/status', qs.stringify(parameter))
}

/**
 * [删除延伸阅读]
 */
export const extendDelete = (parameter) => {
  return http.fetchPost('/extend/delete', qs.stringify(parameter))
}

/**
 * [延伸阅读保存]
 */
export const extendSave = (parameter) => {
  return http.fetchPost('/extend/save', parameter)
}

/**
 * [延伸阅读更新]
 */
export const extendUpdate = (parameter) => {
  return http.fetchPost('/extend/update', parameter)
}



/*=================内容/专题==================*/
/**
 * [专题列表]
 */
export const getTopicList = (parameter) => {
  return http.fetchGet('/topic/list', parameter)
}
/**
 * [保存更新专题]
 */
export const saveTopic = (parameter) => {
  return http.fetchPost('/topic' + (parameter.id > 0 ? '/update' : '/save'), parameter)
}

/**
 * [删除专题]
 */
export const delTopic = (parameter) => {
  return http.fetchPost('/topic/delete', qs.stringify(parameter))
}

/**
 * [专题详情]
 */
export const getTopicDetail = (parameter) => {
  return http.fetchGet('/topic/detail', parameter)
}
/**
 * [上下线专题]
 */
export const onOffTopic = (parameter) => {
  return http.fetchPost('/topic/status', qs.stringify(parameter))
}

/**
 * [定时上线书籍]
 */
export const timingOnlineTopic = (parameter) => {
  return http.fetchPost('/topic/timing/online', qs.stringify(parameter))
}




/*=================作业回答相关 ==================*/
/**
 * [作业回答列表]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getHomeworkAnswerList = (parameter) => {
  return http.fetchGet('/homework/answer/list', parameter)
}

/**
 * [批量更新回答状态]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const setHomeworkAnswerUpdate = (parameter) => {
  return http.fetchPost('/homework/answer/update', parameter)
}

/**
 * [获取回答点评列表接口]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const getHomeworkAnswerContentList = (parameter) => {
  return http.fetchGet('/homework/answer/content/list', parameter)
}

/**
 * [小庐后台回答]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const confHomeworkAnswerReply = (parameter) => {
  return http.fetchPost('/homework/answer/content/reply', parameter)
}

/**
 * [导入回复]
 * @param  {[type]} parameter [description]
 * @return {[type]}           [description]
 */
export const importHomeworkAnswerFile = (parameter) => {
  return http.fetchPost('/homework/answer/import', parameter, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  })
  // return http.fetchPost('/ebook' + (parameter.serialId > 0 ? '/update' : '/save'), parameter)
}

/*=================会员==================*/

export const getDiscount = (parameter) => {
  return http.fetchGet('/vip/discount/list', parameter)
}

export const discountSave = (parameter) => {
  return http.fetchPost('/vip/discount/update', parameter)
}

export const getRightList = (parameter) => {
  return http.fetchGet('/vip/rights/list', parameter)
}

export const rightDelete = (parameter) => {
  return http.fetchPost('/vip/rights/delete', qs.stringify(parameter))
}

export const rightSave = (parameter) => {
  return http.fetchPost('/vip/rights/save', parameter)
}

export const rightUpdate = (parameter) => {
  return http.fetchPost('/vip/rights/update', parameter)
}

export const rightChangeSort = (parameter) => {
  return http.fetchPost('/vip/rights/order', parameter)
}

export const getVipShareList = (parameter) => {
  return http.fetchGet('/vip/share/list', parameter)
}

export const vipShareDelete = (parameter) => {
  return http.fetchPost('/vip/share/delete', qs.stringify(parameter))
}

export const vipShareSave = (parameter) => {
  return http.fetchPost('/vip/share/save', parameter)
}

export const vipShareUpdate = (parameter) => {
  return http.fetchPost('/vip/share/update', parameter)
}

export const vipShareChangeSort = (parameter) => {
  return http.fetchPost('/vip/share/order', parameter)
}

export const getVipDayList = (parameter) => {
  return http.fetchGet('/vip_day/activity/list', parameter)
}

export const vipDayDelete = (parameter) => {
  return http.fetchPost('/vip_day/activity/delete', qs.stringify(parameter))
}

export const vipDaySave = (parameter) => {
  return http.fetchPost('/vip_day/activity/save', parameter)
}

export const vipDayUpdate = (parameter) => {
  return http.fetchPost('/vip_day/activity/update', parameter)
}

export const vipDayOnline = (parameter) => {
  return http.fetchPost('/vip_day/activity/status', qs.stringify(parameter))
}

/*=================优惠券==================*/

export const getCouponList = (parameter) => {
  return http.fetchGet('/coupon/list', parameter)
}

export const couponSave = (parameter) => {
  return http.fetchPost('/coupon/save', parameter)
}

export const couponDetail = (parameter) => {
  return http.fetchGet('/coupon/detail', parameter)
}

export const couponStatusUpdate = (parameter) => {
  return http.fetchPost('/coupon/status', qs.stringify(parameter))
}

export const couponSend = (parameter) => {
  return http.fetchPost('/coupon/send', parameter)
}

export const couponSendStatus = (parameter) => {
  return http.fetchGet('/coupon/send/status', parameter)
}

/*=================优惠券活动==================*/

export const getCouponActivityList = (parameter) => {
  return http.fetchGet('/couponActivity/list', parameter)
}

export const couponActivitySave = (paramter) => {
  return http.fetchPost('/couponActivity/save', paramter)
}

export const couponActivityUpdate = (paramter) => {
  return http.fetchPost('/couponActivity/update', paramter)
}

export const couponActivityStatus = (paramter) => {
  return http.fetchPost('/couponActivity/status', qs.stringify(paramter))
}

export const couponActivityDetail = (paramter) => {
  return http.fetchGet('/couponActivity/detail', paramter)
}

/*================= 兑换码 ==================*/
/**
 * 兑换码列表
 */
export const getRedeemList = (parameter) => {
  return http.fetchGet('/redeem/list', parameter)
}

/**
 * 兑换码详情
 */
export const getRedeemDetailData = (parameter) => {
  return http.fetchGet('/redeem/detail', parameter)
}



/**
 * [作废兑换码]
 */
export const invalidRedeem = (parameter) => {
  return http.fetchPost('/redeem/delete', qs.stringify(parameter))
}

export const saveRedeem = (parameter) => {
  return http.fetchPost('/redeem/save', parameter, { timeout: 100000})
}

export const exportRedeemDownloadXlsx = (parameter) => {
  return http.downloadXlsx('/redeem/export', parameter)
}




/*================= 活动 ==================*/
/**
 * [充值活动保存]
 */
export const rechargeEventsUpdate = (parameter) => {
  return http.fetchPost('/activity/line_save_recharge', parameter)
}
/**
 * [充值活动详情]
 */
export const rechargeEventsDetail = (parameter) => {
  return http.fetchGet('/activity/line_detail_recharge', parameter)
}



/*================= 通知 ==================*/
/**
 * 通知列表
 */
export const getNotificationList = (parameter) => {
  return http.fetchGet('/notification/list', parameter)
}

/**
 * 通知详情
 */
export const getNotificationDetail = (parameter) => {
  return http.fetchGet('/notification/detail', parameter)
}

/**
 * 通知删除
 */
export const delNotification = (parameter) => {
  return http.fetchPost('/notification/delete', qs.stringify(parameter))
}

/**
 * 通知创建
 */
export const saveNotification = (parameter) => {
  return http.fetchPost('/notification/add', parameter)
}


/**
 * 发送通知
 */
export const sendNotification = (parameter) => {
  return http.fetchPost('/notification/send', parameter)
}

/**
 * [音频列表（对应专辑）]
 */
export const getEpisodeRelatedSerialList = (parameter) => {
  return http.fetchGet('/episode/list_serial', parameter)
}


/*================= 每日推荐 ==================*/
/**
 * [每日推荐列表]
 */
export const getHomeList = (parameter) => {
  return http.fetchGet('/home/list', parameter)
}

/**
 * [新建每日推荐]
 */
export const createHome = (parameter) => {
  return http.fetchPost('/home/save', parameter)
}

/**
 * [每日推荐详情列表]
 */
export const getHomeDetailList = (parameter) => {
  return http.fetchGet('/home/detail', parameter)
}

/**
 * [每日推荐保存]
 */
export const homeSave = (parameter) => {
  return http.fetchPost('/home/save_product', parameter)
}

/**
 * [每日推荐保存]
 */
export const homeUpdate = (parameter) => {
  return http.fetchPost('/home/update_product', parameter)
}

/**
 * [每日推荐-珍藏历]
 */
export const recommendCalendar = (parameter) => {
  return http.fetchGet('/episode/detail_zcl', parameter)
}

/**
 * [每日推荐复制]
 */
export const homeCopy = (parameter) => {
  return http.fetchPost('/home/copy_product', parameter)
}

/**
 * [每日推荐删除]
 */
export const homeDelete = (parameter) => {
  return http.fetchPost('/home/delete_product', qs.stringify(parameter))
}

/**
 * [每日推荐拖动]
 */
export const homeDrag = (parameter) => {
  return http.fetchPost('/home/order_product', parameter)
}

/*================= banner ==================*/
/**
 * [banner列表]
 */
export const getBannerList = (parameter) => {
  return http.fetchGet('/banner/list', parameter)
}

/**
 * [banner删除]
 */
export const bannerDelete = (parameter) => {
  return http.fetchPost('/banner/delete', qs.stringify(parameter))
}

/**
 * [创建banner]
 */
export const bannerSave = (parameter) => {
  return http.fetchPost('/banner/save', parameter)
}

/**
 * [更新banner]
 */
export const bannerUpdate = (parameter) => {
  return http.fetchPost('/banner/update', parameter)
}

/**
 * [banner排序]
 */
export const bannerSort = (parameter) => {
  return http.fetchPost('/banner/order', parameter)
}

/**
 * [banner上下线]
 */
export const bannerStatus = (parameter) => {
  return http.fetchPost('/banner/status', parameter)
}

/**
 * [banner定时上下线]
 */
export const bannerTiming = (parameter) => {
  return http.fetchPost('/banner/timing', parameter)
}

/**
 * [弹框列表]
 */
export const getDialogList = (parameter) => {
  return http.fetchGet('/dialog/list', parameter)
}

/**
 * [弹框删除]
 */
export const dialogDelete = (parameter) => {
  return http.fetchPost('/dialog/delete', qs.stringify(parameter))
}

/**
 * [创建弹框]
 */
export const dialogSave = (parameter) => {
  return http.fetchPost('/dialog/save', parameter)
}

/**
 * [更新弹框]
 */
export const dialogUpdate = (parameter) => {
  return http.fetchPost('/dialog/update', parameter)
}

/**
 * [弹框上下线]
 */
export const dialogStatus = (parameter) => {
  return http.fetchPost('/dialog/status', parameter)
}

/**
 * [订单列表]
 */
export const getOrderList = (paramter) => {
  return http.fetchGet('/order/list', paramter)
}

/**
 * [获取订单详情详情]
 */
export const getOrderDetail = (parameter) => {
  return http.fetchGet('/order/detail', parameter)
}

/**
 * [删除订单]
 */
export const delOrder = (parameter) => {
  return http.fetchPost('/order/delete', qs.stringify(parameter))
}

/**
 * [订单退款]
 */
export const refundOrder = (parameter) => {
  return http.fetchPost('/order/refund', qs.stringify(parameter))
}

/**
 * [订单导出]
 */
export const exportOrderXlsx = (parameter) => {
  return http.downloadXlsx('/order/export', parameter)
}

/**
 * [订单导入]
 */
export const importOrder = (parameter) => {
  return http.fetchPost('/order/import', parameter)
}

/**
 * [订单导入状态查询]
 */
export const importOrderStatus = (parameter) => {
  return http.fetchGet('/order/import_log', parameter)
}



/*================= 直播 ==================*/
/**
 * [直播列表]
 */
export const getLiveList = (parameter) => {
  return http.fetchGet('/live/list', parameter)
}
/**
 * [直播详情]
 */
export const getLiveDetail = (parameter) => {
  return http.fetchGet('/live/detail', parameter)
}
/**
 * [保存或更新直播]
 */
export const saveLive = (parameter) => {
  return http.fetchPost('/live' + (parameter.id > 0 ? '/update' : '/save'), parameter)
}
/**
 * [首页显示]
 */
export const setIndexShow = (parameter) => {
  return http.fetchPost('/live/index_show', qs.stringify(parameter))
}
/**
 * [预约用户导出]
 */
export const exportLivePreUser = (parameter) => {
  return http.downloadXlsx('/live/export_reserve', parameter)
}
/**
 * [直播用户导出]
 */
export const exportLiveUser = (parameter) => {
  return http.downloadXlsx('/live/export_live', parameter)
}


/*================= 频道 ==================*/
/**
 * [频道列表]
 */
export const getChanneList = (parameter) => {
  return http.fetchGet('/discover/list_channel', parameter)
}

/**
 * [保存或更新频道]
 */
export const saveChanne = (parameter) => {
  return http.fetchPost('/discover' + (parameter.id > 0 ? '/update_channel' : '/save_channel'), parameter)
}
/**
 * [删除频道]
 */
export const delChanne = (parameter) => {
  return http.fetchPost('/discover/delete_channel', qs.stringify(parameter))
}
/**
 * [频道排序接口]
 */
export const sortChanneList = (parameter) => {
  return http.fetchPost('/discover/order_channel', parameter)
}

/*================= 发布模块 ==================*/
/**
 * [模块列表]
 */
export const getModuleList = (parameter) => {
  return http.fetchGet('/discover/list_module', parameter)
}
/**
 * [模块详情]
 */
export const getModuleDetail = (parameter) => {
  return http.fetchGet('/discover/detail_module', parameter)
}
/**
 * [保存或更新模块]
 */
export const saveModule = (parameter) => {
  return http.fetchPost('/discover' + (parameter.id > 0 ? '/update_module' : '/save_module'), parameter)
}
/**
 * [删除模块]
 */
export const delModule = (parameter) => {
  return http.fetchPost('/discover/delete_module', qs.stringify(parameter))
}
/**
 * [模块排序接口]
 */
export const sortModuleList = (parameter) => {
  return http.fetchPost('/discover/order_module', parameter)
}


/**
 * [榜单列表]
 */
export const getPopListData = (parameter) => {
  return http.fetchGet('/discover/lists', parameter)
}

/**
 * [榜单排序接口]
 */
export const sortPopListData = (parameter) => {
  return http.fetchPost('/discover/lists/order', parameter)
}






/*
 * [弹框定时上下线]
 */
export const dialogTiming = (parameter) => {
  return http.fetchPost('/dialog/timing', parameter)
}

/**
 * [广告列表]
 */
export const getAdList = (parameter) => {
  return http.fetchGet('/ad/list', parameter)
}

/**
 * [广告删除]
 */
export const adDelete = (parameter) => {
  return http.fetchPost('/ad/delete', qs.stringify(parameter))
}

/**
 * [创建广告]
 */
export const adSave = (parameter) => {
  return http.fetchPost('/ad/save', parameter)
}

/**
 * [更新广告]
 */
export const adUpdate = (parameter) => {
  return http.fetchPost('/ad/update', parameter)
}

/**
 * [广告上下线]
 */
export const adStatus = (parameter) => {
  return http.fetchPost('/ad/status', parameter)
}

/**
 * [广告定时上下线]
 */
export const adTiming = (parameter) => {
  return http.fetchPost('/ad/timing', parameter)
}

/**
 * [首页配置详情]
 */
export const homeConfigDetail = (parameter) => {
  return http.fetchGet('/home/detail_config', parameter)
}

/**
 * [首页配置保存]
 */
export const homeConfigSave = (parameter) => {
  return http.fetchPost('/home/save_config', parameter)
}

/**
 * [版本列表]
 */
export const getVersionList = (parameter) => {
  return http.fetchGet('/version/list', parameter)
}

/**
 * [版本详情]
 */
export const getVersionDetail = (parameter) => {
  return http.fetchGet('/version/detail', parameter)
}

/**
 * [版本删除]
 */
export const versionDelete = (parameter) => {
  return http.fetchPost('/version/delete', qs.stringify(parameter))
}

/**
 * [版本保存]
 */
export const versionSave = (parameter) => {
  return http.fetchPost('/version/save', parameter)
}

/**
 * [版本更新]
 */
export const versionUpdate = (parameter) => {
  return http.fetchPost('/version/update', parameter)
}

/**
 * [刷新索引]
 */
export const searchRefresh = (parameter) => {
  return http.fetchGet('/search/refresh', parameter, { timeout: 200000 })
}

/*================= 小程序 ==================*/
/**
 * [获取湛庐珍藏历列表]
 */
export const getCalendarList = (parameter) => {
  return http.fetchGet('/mini/list', parameter)
}

/**
 * [湛庐珍藏历更新]
 */
export const calendarRefresh = (parameter) => {
  return http.fetchGet('/mini/refresh', parameter)
}

/**
 * [湛庐珍藏历保存]
 */
export const calendarSave = (parameter) => {
  return http.fetchPost('/mini/save', parameter)
}

/**
 * [湛庐珍藏历编辑]
 */
export const calendarUpdate = (parameter) => {
  return http.fetchPost('/mini/update', parameter)
}

/**
 * [获取湛庐图书列表]
 */
export const getMiniBookList = (parameter) => {
  return http.fetchGet('/mini/book/list', parameter)
}

/**
 * [删除湛庐图书]
 */
export const nimiBookDelete = (parameter) => {
  return http.fetchPost('/mini/book/delete', qs.stringify(parameter))
}

/**
 * [湛庐图书上下线]
 */
export const nimiBookOnOff = (parameter) => {
  return http.fetchPost('/mini/book/onOff', qs.stringify(parameter))
}

/**
 * [湛庐图书分类]
 */
export const getMiniCategoryList = (parameter) => {
  return http.fetchGet('/mini/book/categoryList', parameter)
}

/**
 * [湛庐图书保存]
 */
export const miniBookSave = (parameter) => {
  return http.fetchPost('/mini/book/save', parameter)
}

/**
 * [湛庐图书更新]
 */
export const miniBookUpdate = (parameter) => {
  return http.fetchPost('/mini/book/update', parameter)
}

/**
 * [湛庐图书书评显隐]
 */
export const miniCommentOnOff = (parameter) => {
  return http.fetchPost('/mini/comment/onoff', qs.stringify(parameter))
}

/**
 * [湛庐图书书评删除]
 */
export const miniCommentDelete = (parameter) => {
  return http.fetchPost('/mini/comment/delete', qs.stringify(parameter))
}

/**
 * [湛庐图书书评保存]
 */
export const miniCommentSave = (parameter) => {
  return http.fetchPost('/mini/comment/save', parameter)
}

/**
 * [湛庐图书书评更新]
 */
export const miniCommentUpdate = (parameter) => {
  return http.fetchPost('/mini/comment/update', (parameter))
}

/**
 * [湛庐珍藏历导出]
 */
export const exportCalendar = (parameter) => {
  return http.downloadXlsx('/mini/export', parameter)
}





/*================= 锦鲤活动 ==================*/
/**
 * 锦鲤活动列表
 */
export const getLuckListData = (parameter) => {
  return http.fetchGet('/luck/list', parameter, {timeout: 1000000,headers: {
    }
  })
}
/**
 * [锦鲤活动创建更新]
 */
export const savLuckData = (parameter) => {
  return http.fetchPost('/luck' + (parameter.id > 0 ? '/updateLuck' : '/saveLuck'), parameter, {
    timeout: 1000000,headers: {
    }
  })
}

/**
 * [锦鲤活动详情接口]
 */
export const getLuckDetail = (parameter) => {
  return http.fetchGet('/luck/detail', parameter, {timeout: 1000000,headers: {
    }
  })
}

/**
 * 报名者列表接口
 */
export const getLuckUserListData = (parameter) => {
  return http.fetchGet('/luck/userLuck/list', parameter, {headers: {
    }
  })
}

/**
 * 报名者禁用开启
 */
export const changLuckUserStatus = (parameter) => {
  return http.fetchPost('/luck/userLuck/black', parameter, {timeout: 1000000,headers: {
    }
  })
}

/**
 * 手动抽奖接口
 */
export const changLuckWin = (parameter) => {
  return http.fetchPost('/luck/win', parameter, {timeout: 1000000,headers: {
    }
  })
}
/**
 * 手动抽奖换人接口
 */
export const changeWinnerLuckWin = (parameter) => {
  return http.fetchPost('/luck/changeWinner', parameter, {timeout: 1000000,headers: {
    }
  })
}


/**
 * [删除锦鲤活动接口]
 */
export const delLuckData = (parameter) => {
  return http.fetchPost('/luck/delete', parameter, {timeout: 1000000})
}



