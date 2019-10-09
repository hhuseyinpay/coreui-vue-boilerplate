import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const DefaultContainer = () => import('@/containers/DefaultContainer')


export const roleBasedRoutes = [
  {
    path: '/talebe',
    redirect: '/talebe/liste',
    name: 'Talebe',
    icon: 'icon-people',
    component: DefaultContainer,
    children: [
      {
        path: 'liste',
        url: '/talebe/liste',
        name: 'Talebe Listesi',
        icon: 'icon-list',
        component: () => import('@/views/talebe/liste'),
        meta: {
          roles: ['admin']
        }
      },
      {
        path: 'ekle',
        url: '/talebe/ekle',
        name: 'Yeni Talebe Ekle',
        icon: 'icon-user-follow',
        component:  () => import('@/views/talebe/ekleDuzenle'),
        meta: {
          roles: ['admin']
        }
      }
    ]
  }
];

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    name: 'Home',
    component: DefaultContainer,
    hidden:true,
    children: [
      {
        path: 'dashboard',
        url: '/dashboard',
        name: 'Dashboard',
        icon: 'icon-speedometer',
        component: () => import('@/views/dashboard/Dashboard')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login'),
    hidden: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/pages/Register'),
    hidden: true,
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/pages/Page404'),
    hidden: true,
  },
  {
    path: '/500',
    name: 'Page500',
    component: () => import('@/views/pages/Page500'),
    hidden: true,
  },
  {path: '*', redirect: '/404', hidden: true}
];

const createRouter = () => new Router({
  //mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: roleBasedRoutes.concat(constantRoutes)
});

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
