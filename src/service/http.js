import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import qs from 'qs'
import { resolveBlob } from '@/utils/download'

const baseURL = '/web/v1'
const service = axios.create({
  baseURL: baseURL,
  timeout: 16000
})

const pureAxios = axios.create({
  baseURL: baseURL,
  timeout: 16000
})

const err = (error) => {
  Message({
    message: error.message || error.response.data.message || '系统异常',
    type: 'error',
    duration: 5 * 1000
  })
  if (error.response && (error.response.status === 403 || error.response.status === 401)) {
    router.push('/401')
  }
  return Promise.reject(error)
}

service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['token'] = token
  }
  return config
}, err)

pureAxios.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['token'] = token
  }
  return config
}, err)

service.interceptors.response.use(response => {
  const res = response.data
  if (res && res.event !== 0) {
    Message({
      message: res.message || '出现异常',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(new Error(res.message))
  }
  return response
}, err)

export default {
  fetchGet(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      service.get(url, Object.assign({ params: params }, config)).then(res => {
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
  },
  downloadXlsx(url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      pureAxios({
        url,
        method: 'get',
        params,
        timeout: 600000,
        responseType: 'blob',
        ...headers
      }).then(res => {
        resolveBlob(res, 'xlsx')
        console.log('res', res)
        resolve({'event': 0, 'message': 'ok', 'data': ''})
      }).catch(error => {
        console.log('error', error)
        reject(error)
      })
    })
  },
  downloadXlsxPost(url, params = {}, headers) {
    return new Promise((resolve, reject) => {
      pureAxios({
        url,
        method: 'post',
        data: params,
        timeout: 600000,
        responseType: 'blob',
        ...headers
      }).then(res => {
        resolveBlob(res, 'xlsx')
        console.log('res', res)
        resolve({'event': 0, 'message': 'ok', 'data': ''})
      }).catch(error => {
        console.log('error', error)
        reject(error)
      })
    })
  }
}
