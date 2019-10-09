<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
<!--      LOGO BURAYA EKLENEBİLİR
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo">
      </b-link>
-->
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen='true' />

<!--   NAVBARA LİNK EKLENEBİLİR
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">Settings</b-nav-item>
      </b-navbar-nav>
-->

      <b-navbar-nav class="ml-auto">

      <!-- AVATARIN SOLUNA ICON EKLENEBILIR
      <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item>
        -->
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
<!--      <AsideToggler class="d-none d-lg-block" />-->
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
<!--        <Breadcrumb :list="list"/>-->
        <div class="container-fluid pt-1">
          <router-view></router-view>
        </div>
      </main>
<!--

      <AppAside fixed>
        &lt;!&ndash;aside&ndash;&gt;
        <DefaultAside/>
      </AppAside>
-->

    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <span class="ml-1">&copy; 2019 </span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a>hhp</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import {constantRoutes, roleBasedRoutes} from '@/router'

export default {
  name: 'DefaultContainer',
  components: {
    AppHeader,
    AppSidebar,
    TheFooter,
    Breadcrumb,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {

    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label)
    },
    nav: function () {
      let roleBasedAccess = this.filterHiddenRoutes(roleBasedRoutes);
      let constantAccess = this.filterHiddenRoutes(constantRoutes);

      return constantAccess.concat(this.filterRoleBasedRoutes(roleBasedAccess, this.$store.getters.role))
    }
  },
  methods: {
    hasPermission(role, route) {
      if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(role)
      } else {
        return true
      }
    },
    filterRoleBasedRoutes(routes, role) {
      const res = [];

      routes.forEach(route => {
        const tmp = {...route}
        if (this.hasPermission(role, tmp)) {
          if (tmp.children) {
            tmp.children = this.filterRoleBasedRoutes(tmp.children, role)
          }
          res.push(tmp)
        }
      });

      return res
    },
    filterHiddenRoutes(routes) {
      /*
       * routes ağaç yapısında olduğundan recursive kullanıldı.
       * eğer bir node hidden ise onun childrenları o node seviyesine çıkmalı.
       *
       * //
       * burası biraz karışık oldu. baktın anlamıyorsun fazla zorlama.. oturup kendin yazsan daha kolay olabilir.
       * bilgi için hasan hüseyin pay (05515524294) - 17.09.2019 ( Not: 1 yıldan fazla süre geçtiyse lütfen arama otur yeniden yaz! (STT: 17.09.2021))
       */
      const res = [];
      routes.forEach(route => {
        let tmp = {...route}

        if (tmp.children) {
          if (tmp.hidden === true) {
            // node hidden olduğu için childrenlar node seviyesine çıkarıldı.
            tmp = this.filterHiddenRoutes(tmp.children)
          } else {
            tmp.children = this.filterHiddenRoutes(tmp.children)
          }
        }
        if (Array.isArray(tmp)) {
          // childrenlar node seviyesine çıkacaksa tmp dizi olmuştur.
          tmp.forEach(x => {
            if (x.hidden !== true)
              res.push(x)
          })
        } else if (tmp.hidden !== true)
          res.push(tmp)
      });

      return res
    }
  },
}
</script>
