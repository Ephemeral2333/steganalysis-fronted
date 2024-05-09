import request from '@/utils/request'

export function getHistory(data) {
    return request({
        url: '/history/list',
        method: 'get',
        params: {
            query: data.query,
            pagenum: data.pagenum,
            pagesize: data.pagesize
        }
    })
}

export function getCompare() {
    return request({
        url: '/history/compare',
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

export function changeResult(id) {
    return request({
        url: '/history/change',
        method: 'put',
        data: {
            'id': id
        }
    })
}

export function getExcel() {
    return request({
        url: '/history/export',
        method: 'get',
        responseType: 'blob'
    })
}