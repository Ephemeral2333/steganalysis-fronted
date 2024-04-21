import axios from 'axios'
import { Message, MessageBox } from 'element-ui'

// 1.创建axios实例
const service = axios.create({
    // 公共接口--这里注意后面会讲,url = base url + request url
    baseURL: "http://localhost:5000",
    timeout: 5 * 1000
})

// 2.请求拦截器request interceptor
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 设置cross跨域 并设置访问权限 允许跨域携带cookie信息,使用JWT可关闭
service.defaults.withCredentials = false

service.interceptors.response.use(
    // 接收到响应数据并成功后的一些共有的处理，关闭loading等
    response => {
        const res = response
        return res
    },
    error => {
        Message({
            showClose: true,
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
export default service
