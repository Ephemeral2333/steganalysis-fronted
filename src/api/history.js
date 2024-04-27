import request from '@/utils/request'

export function getHistory() {
    return request({
        url: '/history/list',
        method: 'get'
    })
}