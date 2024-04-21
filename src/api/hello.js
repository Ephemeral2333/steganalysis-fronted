import request from '@/utils/request'

export function getHello() {
    return request({
        url: '/api/data',
        method: 'get'
    })
}