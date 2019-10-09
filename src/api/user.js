import request from './request'

export function login(data) {
  return request({
    url: '/jwt/create',
    method: 'post',
    data
  })
}

export function getMe() {
  return request({
    url: '/user/me',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
