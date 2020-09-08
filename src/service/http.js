import vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const baseURL = '/web/v1'

const service = axios.create({
  baseURL: baseURL,
  timeout: 6000
})

service.interceptors.request.use(
  config => {
    const token = vue.ls.get(ACCESS_TOKEN)
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.data && response.data.event === 500) {
      Message({
        message: response.data.msg || '出现异常',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return response
  },
  error => {
    if (error.response && (error.response.status === 403 || error.response.status === 404)) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      if (error.response.status === 403) {
        router.push('/401')
      }
    }
    return Promise.reject(error)
  }
)

export default {
  fetchGet(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      service.get(url, Object.assign({params: params}, config)).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost(url, params = {}, headers) {
    return new Promise((resolve, reject) => {
      service.post(url, params, headers).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}