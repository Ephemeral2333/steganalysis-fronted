import request from '@/utils/request'

export function getHistory() {
    return request({
        url: '/history/list',
        method: 'get'
    })
}

export function delHistory(id) {
    return request({
        url: '/history/delete',
        method: 'delete',
        data: {
            'id': id
        }
    })
}