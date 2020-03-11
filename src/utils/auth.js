import Cookies from 'js-cookie'

const TokenKey = 'pro_manage_sys_token'
const UserKey = 'pro_manage_sys_userType'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserType() {
  return Cookies.get(UserKey)
}

export function setUserType(userType) {
  return Cookies.set(UserKey, userType)
}

export function removeUserType() {
  return Cookies.remove(UserKey)
}
