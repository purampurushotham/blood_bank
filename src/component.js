import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../styles/main.css'
import SimpleVueValidation from 'simple-vue-validator'
Vue.use(SimpleVueValidation)
Vue.use(VueRouter)
window.bb = {}
// import { EventBus } from './components/eventBus'
const Validator = SimpleVueValidation.Validator
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
        validators: {
          'donor.firstName': function (value) {
            return Validator.value(value).required('First Name is required')
          },
          'donor.lastName': function (value) {
            return Validator.value(value).required('Last Name is required')
          },
          'donor.occupation': function (value) {
            return Validator.value(value).required('Occupation is required')
          },
          'donor.bloodGroup': function (value) {
            return Validator.value(value).required('Blood Group is required')
          },
          'donor.city': function (value) {
            return Validator.value(value).required('City is required')
          },
          'donor.dob': function (value) {
            return Validator.value(value).required('Date Of Birth is required')
          },
          'donor.martial_status': function (value) {
            return Validator.value(value).required('Martial Status is required')
          },
          'donor.p_email': function (value) {
            return Validator.value(value).required('Email is required').email()
          },
          'donor.p_phone': function (value) {
            return Validator.value(value).required('Phone is required').digit('only digits').length(10)
          },
          'donor.e_email': function (value) {
            return Validator.value(value).required('Email is required').email()
          },
          'donor.e_phone': function (value) {
            return Validator.value(value).required('Phone is required').digit('only digits').length(10)
          }
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
    console.log('')
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
    console.log(window.bb.routes)
    console.log('mounted')
    // vm.$router.replace({path: window.bb.basePath + '/home'})
  },
  data () {
    return {
      bb: window.bb
    }
  }
}).$mount('#app')
