import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../styles/main.css'
import actions from '../src/actions'
import './data'
Vue.use(VueRouter)
window.bb = {}
// import { EventBus } from './components/eventBus'
window.bb.routes = [
  {
    path: '/register',
    component: {
      template: '#register-template',
      mounted () {
        console.log('register')
        console.log(this)
        console.log('register')
      },
      data () {
        return {
          bb: window.bb,
          donor: {
            id: '',
            firstName: '',
            lastName: '',
            occupation: '',
            bloodGroup: '',
            city: '',
            dob: '',
            martial_status: '',
            p_phone: '',
            p_email: '',
            e_email: '',
            e_phone: '',
            recentDonor: {
              recentDonorTime: '',
              reachedTime: '',
              exists: false
            }
          }
        }
      },
      methods: {
        donorRegistration () {
          console.log('this')
        }
      }
    }
  },
  {
    path: '/',
    component: {
      template: '#home-template',
      data () {
        return { bb: window.bb }
      }
    }
  }
]
Vue.component('donor-app', {
  template: '#donor-app-template',
  created () {
    console.log(window.bb)
    console.log('header')
    /*   EventBus.on('logged', (logs) => {
     this.logged = logs
     }) */
  },
  data () {
    return {
      logged: false,
      bb: window.bb
    }
  },
  methods: {
    logout () {
      console.log('logout')
      this.logged = false
    }
  }
})
Vue.component('sample', {
  template: '#sample-template',
  data () {
    return {
      bb: window.bb
    }
  }
})
let router = new VueRouter({
  mode: 'history',
  routes: window.bb.routes
})
window.blood_donor = new Vue({
  router: router,
  mounted () {
    console.log('mounted')
    console.log(window)
    actions.populateDonors(function () {
      console.log('populate Donors')
    })
    console.log('mounted')
    // vm.$router.replace({path: window.bb.basePath + '/home'})
  },
  data () {
    return {
      bb: window.bb
    }
  }
}).$mount('#app')
