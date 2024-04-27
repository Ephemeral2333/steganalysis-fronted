import request from '@/utils/request'

export function insertInfo(data) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/steganography/insertInfo',
    method: 'post',
    data: data
  })
}