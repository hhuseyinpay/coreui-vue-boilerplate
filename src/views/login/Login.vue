<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8" lg="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Giriş</h1>
                  <p class="text-muted">Hesabınıza giriş yapın</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model.trim="username" type="text" class="form-control" placeholder="Kullanıcı ad"/>
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model.trim="password" type="password" class="form-control" placeholder="Parola"/>
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" @click="girisYap()" class="px-4">Giriş</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Parolanızı mı unuttunuz?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>

            <!--
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
            -->
          </b-card-group>

        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
    import {ErrorMessage} from "@/shared/messages";

    export default {
        name: 'Login',
        data() {
            return {
                username: 'string',
                password: 'string',
                loading: false,
                otherQuery: {},
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query
                    if (query) {
                        this.redirect = query.redirect
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true
            }
        },
        methods: {
            async girisYap() {
                await this.$store.dispatch('user/login', {username: this.username, password: this.password})
                    .then(() => {

                        this.$router.push({path: this.redirect || '/', query: this.otherQuery})
                        this.loading = false
                    })
                    .catch((error) => {
                        this.loading = false
                        if(error.response || error.response.status === 400)
                          ErrorMessage("Kullanıcı adı veya parola yanlış.")
                    });

            },
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    return acc
                }, {})
            }
        }
    }
</script>
