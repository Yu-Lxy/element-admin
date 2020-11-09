## Start
记录写后台管理系统时的一些想法和组件的二次封装，项目初期参考的是[花裤衩](https://github.com/PanJiaChen)大神的[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)，后期根据业务进行了一些修改。


## 登录
登录流程的思路我们先屡清楚：
- 用户在登录页输入账号密码，将账号密码发送请求给后端
  + 将账号密码发送请求给后端的方法写在`vuex`里便于全局token的存取，而前端登录方法里只需要关注登录的结果，并根据结果跳转页面或提示错误，这样代码结构会清晰。
  ``` js
  <!-- action: -->

  Login ({commit}, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(res => {
          if (res.event !== 0) {
            reject(res)
          }
          Vue.ls.set(ACCESS_TOKEN, res.data.token, 12 * 60 * 60 * 1000)
          commit('SET_TOKEN', res.data.token)
          resolve()
        })
        .catch ((error) => {
          reject(error)
        })
    })
  }
  ```
    ``` js
   <!-- Login页面: -->

  import { mapActions } from 'vuex'

  methods: {
    ...mapActions(['Login']),
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.Login(this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' }).catch(err => {})
              this.loading = false
            }).catch((err) => {
              this.$message.error(err.message);
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
  ```
- 后端验证一下用户的账号和密码的信息，如果符合就发一个token返回给客户端，如果不符合就不发送token，返回验证错误信息。
- 如果登录成功，客户端将`token`存在`localStorage`里，之后要请求其他资源的时候，在请求头里带上这个token。
  + `service/http.js` 中全局请求拦截器中：`config.headers['token'] = token`。
- 后端收到请求信息，先验证下token是否有效，有效则下发请求的资源，无效则返回验证错误。


### 获取用户信息
登录成功之后，在全局路由钩子`router.beforeEach`中拦截路由，判断如果有token，就去获取用户信息
``` js
<!-- router.beforeEach -->

if (Vue.ls.get(ACCESS_TOKEN)) {
  store.dispatch('GetInfo')
  .then((infoRes) => {
    const roles = res.data.role;
    next()
  })
}
```

## 权限
权限控制是很常见的需求，我们的业务要求控制到按钮级别。
> 页面级权限的实现方式是通过获取当前用户的权限去对比路由表，生成当前用户具有权限可访问的路由表，通过 `router.addRouters` 挂载到 `router` 上。

**具体步骤如下：**
1. 判断是否有`token`，如果没有就去登录，有就第二步。
2. 获取用户信息 `store.dispatch('GetInfo')`。
3. 获取信息成功之后，调用`store.dispatch('GenerateRoutes')`，这个方法里会调用/router/index.js里的 `generatorDynamicRouter` 方法，并返回一个根据用户信息构建好权限的路由结构。（generatorDynamicRouter方法里将后台返回的一个平级的menu信息，通过递归的方式生成层级结构，再递归生成层级路由）
4. 将构建的路由结构信息利用 `Vue-Router` 提供的动态增加路由方法 `router.addRoutes` 加入到路由表中。
5. 加入路由表后将页面跳转到用户原始要访问的页面,如果没有 `redirect` 则进入默认页面。

> 我们把 `登录` 和 `获取用户信息` 分成了两个接口，原因是当用户刷新页面时，可以根据登录时获取到的token去获取用户信息，避免了刷新还要调用登录接口。

整体流程可以看这个图：
![promission](https://yu-lxy.github.io/2020/09/08/element-admin/permission.png)

### 前端控制权限
旧版本后台的路由表是后端同学根据权限生成的，这使得前端小伙伴每开发一个页面就需要让后端同学配一下路由和权限，光听着就开始皱眉了🤦‍♀️。

于是我们采用了在前端页面配置路由和权限，之后将这份路由表存到后端。

权限/菜单：
![](https://yu-lxy.github.io/2020/09/08/element-admin/permission1.png)

权限/角色：
![](https://yu-lxy.github.io/2020/09/08/element-admin/permission2.png)

> **一角色对应多权限，一用户对应多角色**

> 当用户登录后得到 `roles`，前端根据 roles 去向后端请求可访问的路由表，从而动态生成可访问页面，之后就是 `router.addRoutes` 动态挂载到 `router` 上，和原来是相同的。

### 按钮级权限
在配置菜单权限页面也可以添加配置按钮的权限，登录之后的 `store.dispatch('GetInfo')` 中能拿到对应权限的按钮，并存储在 `vuex` 中。

判断按钮是否展示是写了一个公用方法 `checkPermission` ，没有用指令是因为无法适用于所有组件。

将提前设置好的 `唯一键` 传入方法，就可以从vuex里 `store.getters.buttons` 拿到所有按钮权限，对比后返回 `true 或 false`，来控制按钮的展示。

``` js
<!-- 引入方法 -->
import { checkPermission } from '@/utils/permissions'

<!-- data中定义变量 -->
addEnable: checkPermission('system:role:add')

<!-- v-if判断 -->
<el-button v-if="addEnable">添加角色</el-button>
```

### 总结
登录权限相关的一些记录就是这样，希望能帮到一些有类似业务功能的小伙伴。
占坑：table组件的二次封装，可以看[这里](https://github.com/Yu-Lxy/element-admin/tree/master/src/components/table)
还有，后台长这样：
![](https://yu-lxy.github.io/2020/09/08/element-admin/login.png)
![](https://yu-lxy.github.io/2020/09/08/element-admin/home.png)