import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken, setToken} from '@/utils/auth'
import {ErrorMessage} from "@/shared/messages"; // get token from cookie


NProgress.configure({showSpinner: false}) // NProgress Configuration

// login olmayanlarında girebileceği sayfalar..
const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  /*
  * sayfaya başlık eklemek istiyorsan buradan atayacaksın. bunun için routerda title vermen lazım.
  * yada direk name olarakta verebilirsin.. getPageTitle(to.name) gibi..
  */
  //document.title = getPageTitle(to.meta.title)

  // bak bakalım adam giriş yapmışmı daha önce, token var mı?
  const hasToken = getToken()

  //debugger
  if (!hasToken) {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // whiteList her
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
    return;
  }

  if (to.path === '/login') {
    // adam giriş yaptıysa direk anasayfaya yönlendir..
    next({path: '/'})
    NProgress.done()
  } else {
    // determine whether the user has obtained his permission roles through getInfo
    const hasRoles = store.getters.role && store.getters.role.length > 0

    if (!hasRoles) {
      try {
        /*
         *  Role JWT token içindeyse getMe yapmaya gerek yok. direk login action'ında role ataması yapılacak.
         *  JWT'de değilse getMe yapılıp role alınacak burada atama yapılacak.
         *  Role'e göre de route'lar belirlenecek ve router'a eklenecek
         */
        //const { roles } = await store.dispatch('user/getMe')

        /*
         *  Varasayılan  static olarak role atanıyor.
         */
        await store.dispatch('user/setRole')

      } catch (error) {
        console.log("routePermssionda bi hata oluştu: ", error)
        ErrorMessage(router.app, error)
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')

        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
    if (!to.meta || !to.meta.roles){
      console.log('yetki YOK')
      next()
      return
    }

    if(to.meta.roles.includes(store.getters.role)){
      console.log('yetki var')
      next()
    }else {
      next({path: '/404'})
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
