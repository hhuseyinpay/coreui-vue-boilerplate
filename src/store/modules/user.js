import {login, logout, getMe} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  role: ''
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, role) => {
    state.role = role
  }
};

const actions = {
  // user login
  login({commit}, body) {
    return new Promise((resolve, reject) => {
      /*
      * TOKEN İŞLEMLERİ BURADA YAPILACAK.
      * Username role vs jwt token içindeyse getMe'ye gerek yok. jwt parse edilip burada commit edilirler..
      */

      login(body).then(response => {
        commit('SET_TOKEN', response.access)
        setToken(response.access)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getMe().then(response => {
        /*
         * PROFİL VE ROL İŞLEMLERİ BURADA YAPILACAK
         */
        if (!response) {
          reject('Doğrulama başarısız, lütfen tekrar giriş yapın.')
        }

        const {role, name} = response;

        // roles must be a non-empty array
        if (!role || role.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', role);
        commit('SET_NAME', name);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit}) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '');
      commit('SET_ROLE', '');
      removeToken()
      resetRouter()
      resolve()
      return

      logout().then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', '')
      removeToken()
      resolve()
    })
  },

  setRole({commit}) {
    return new Promise(resolve => {
      commit('SET_ROLES', 'admin')
      resolve()
    })
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
