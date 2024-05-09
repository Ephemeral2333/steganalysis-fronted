import request from '@/utils/request'

export function testUpload(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/test/upload',
    method: 'post',
    data: data
  })
}

export function getTestHistory(data) {
  return request({
      url: '/test/list',
      method: 'get',
      params: {
          query: data.query,
          pagenum: data.pagenum,
          pagesize: data.pagesize
      }
  })
}

export function getExcel() {
  return request({
    url: '/test/export',
    method: 'get',
    responseType: 'blob'
  })
}