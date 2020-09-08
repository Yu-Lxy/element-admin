/*
* @Author: huanghanzhilian
* @Date:   2019-12-04 13:21:41
* @Last Modified by:   huanghanzhilian
* @Last Modified time: 2020-04-03 10:09:22
*/
let webAppVisitPath = "http://test.micro.api.cheerspublishing.com/"

if (process.env.NODE_CURRENT_ENV == 'dev') {
	// 开发环境
	webAppVisitPath = "http://test.micro.api.cheerspublishing.com/"
}else if(process.env.NODE_CURRENT_ENV == 'test'){
	//测试环境
	webAppVisitPath = "http://test.micro.api.cheerspublishing.com/"
}else if(process.env.NODE_CURRENT_ENV == 'pre'){
	//预发布
	webAppVisitPath = "http://test.micro.api.cheerspublishing.com/"
}else if(process.env.NODE_CURRENT_ENV == 'prod'){
	//正式环境（慎用）
	webAppVisitPath = "http://h5.api.app.cheerspublishing.com/"
}
export {
  webAppVisitPath
}


