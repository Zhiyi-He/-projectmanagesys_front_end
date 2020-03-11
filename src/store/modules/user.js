// import { login, logout, getInfo } from '@/api/user'
import { login, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserType, setUserType, removeUserType } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        loginName: '',
        loginParam: '',
        username: '',
        token: getToken(),
        userType: getUserType(),
    }
}

const state = getDefaultState()
// const state = {
//     loginName: '',
//     loginParam: '',
//     username: '',
//     token: getToken(),
//     userType: getUserType(),
// }
const mutations = {
    SET_LOGIN: (state, data) => {
        state.loginName = data.loginName
        state.loginParam = data.loginParam
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_TYPE: (state, userType) => {
        state.userType = userType
    },
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
}
// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }
const actions = {
    setLogin({ commit }, data) {
        commit('SET_LOGIN', data)
    },

    login({ commit, state }, userInfo) {
        return new Promise((resolve, reject) => {
            login({ userInfo: userInfo, loginParam: state.loginParam }).then(response => {
                const { username, token, userType } = response
                commit('SET_USERNAME', username)
                commit('SET_TYPE', userType)
                commit('SET_TOKEN', token)
                setToken(token)
                setUserType(userType)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getUserInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getUserInfo().then(response => {
                const { username } = response

                if (!username) {
                    reject('Verification failed, please Login again.')
                }

                commit('SET_USERNAME', username)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    //remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            removeUserType()
            commit('RESET_STATE')
            resolve()
        })
    }
}
// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   
// }

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

