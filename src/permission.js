import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getUserType } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import jump from '@/utils/jump'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/home'] // no redirect whitelist


router.beforeEach(async (to, from, next) => {

  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  const userType = getUserType()

  if (hasToken) {
    const hasGetUserInfo = store.getters.username
    if (hasGetUserInfo) {
      if (whiteList[0].indexOf(to.path) !== -1 && to.query.loginParam == userType) {
        store.dispatch("user/setLogin", to.query);
        let jumpUrl = jump(userType)
        next(jumpUrl)
      }
      next()
    } else {
      try {
        await store.dispatch('user/getUserInfo')
        next()
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // next(`/login?redirect=${to.path}`)
      next("/")
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
