<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="cui-settings" style="font-size: 1.7em; font-weight: bold;"></i>
<!--
    <img
        src="img/avatars/6.jpg"
        class="img-avatar"
        alt="admin@bootstrapmaster.com"/>
-->
    </template>

    <template slot="dropdown">
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Ayarlar</strong>
      </b-dropdown-header>
<!--
      <b-dropdown-item><i class="fa fa-user"/> Profil</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench"/> Ayarlar</b-dropdown-item>
      <b-dropdown-divider/>
-->
      <b-dropdown-item @click="cikisYap()"><i class="fa fa-lock"/> Çıkış</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
    import {HeaderDropdown as AppHeaderDropdown} from '@coreui/vue'

    export default {
        name: 'DefaultHeaderDropdownAccnt',
        components: {
            AppHeaderDropdown
        },
        data: () => {
            return {itemsCount: 42}
        },
        methods: {
            async cikisYap() {
                await this.$store.dispatch('user/logout')
                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
            }
        }
    }
</script>
