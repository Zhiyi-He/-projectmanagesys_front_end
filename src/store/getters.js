const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  loginName: state => state.user.loginName,
  userType: state => state.user.userType
}
export default getters
