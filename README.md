## Start
记录写后台管理系统时的一些想法和组件的二次封装，项目初期参考的是[花裤衩](https://github.com/PanJiaChen)大神的[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，后期根据业务进行了一些修改。

## 登录
登录问题的思路我们先屡清楚：
- 用户在登录页输入账号密码，将账号密码发送请求给后端
  + 将账号密码发送请求给后端的方法写在`vuex`里便于全局token的存取，而前端登录方法里只需要关注登录的结果，并根据结果跳转页面或提示错误，这样代码结构会清晰。
- 后端验证一下用户的账号和密码的信息，如果符合就发一个token返回给客户端，如果不符合就不发送token，返回验证错误信息。
- 如果登录成功，客户端将`token`存在`localStorage`里，之后要请求其他资源的时候，在请求头里带上这个token。
  + `service/http.js`中全局请求拦截器中：`config.headers['token'] = token`。
- 后端收到请求信息，先验证下token是否有效，有效则下发请求的资源，无效则返回验证错误。