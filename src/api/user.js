import request, {requestUnauth} from './request'

export function login(data) {
  return requestUnauth({
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
