import request from '@/utils/request'


export function login(data) {
  const { userInfo, loginParam } = data;
  const res = request({
    url: 'user/login/' + loginParam,
    // url: 'user/login/' + loginParam,
    method: 'post',
    data: userInfo
  });
  // const res = request.post('http://192.168.1.4:8080/user/login/' + loginParam, userInfo);
  // console.log(res);
  return res;
}

export function getUserInfo() {
  const res = request({
    url: 'user/userInfo',
    method: 'get'
  });

  return res;
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
