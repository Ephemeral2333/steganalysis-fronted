import request from '@/utils/request'

export function getCaptcha(email) {
    return request({
        url: '/login/getcap',
        method: 'post',
        data: {
            email: email
        }
    })
}

export function login(email, captcha) {
    return request({
        url: '/login/valid',
        method: 'post',
        data: {
            email: email,
            captcha: captcha
        }
    })
}