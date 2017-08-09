import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../styles/main.css'
import DatePicker from 'vuejs-datepicker'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import actions from '../src/actions'
import common from '../src/common'
import grid from 'vue2-bootstrap-table'
import Multiselect from 'vue-multiselect'
import './data'
Vue.use(VueRouter)
window.bb = {
  donors: [],
  blood_groups: [],
  cities: []
}
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
          bb: window.bb
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
  },
  {
    path: '/search',
    component: {
      template: '#search-template',
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
Vue.component('donor-registration', {
  template: '#donor-registration-template',
  components: {
    DatePicker
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
  mounted () {
    console.log('created registration')
    console.log('created registration')
  },
  methods: {
    donorRegistration () {
      common.setValueToStore(window.bb, 'donors', this.donor)
    }
  }
})
Vue.component('search-donor', {
  template: '#search-donor-template',
  components: {
    grid,
    Multiselect
  },
  created () {
    console.log('created search')
    console.log(window.bb.donors)
    common.setSearchOptions(window.bb.donors, window.bb.blood_groups, window.bb.cities)
    console.log('created search')
  },
  data () {
    return {
      bb: window.bb,
      bloodGroup: '',
      city: '',
      blood_groups: window.bb.blood_groups,
      cities: window.bb.cities,
      columns: ['firstName', 'lastName', 'bloodGroup', 'city', 'occupation', 'dob', 'martial_status', 'edit'],
      headers: [
        {
          title: 'First Name',
          path: 'firstName'
        }, {
          title: 'Blood Group',
          path: 'bloodGroup'
        }, {
          title: 'Last Name',
          path: 'lastName'
        }, {
          title: 'Date Of Birth',
          path: 'dob'
        }, {
          title: 'City',
          path: 'city'
        }
      ],
      tableData: window.bb.donors
    }
  },
  methods: {
    searchDonor () {
      console.log('search donor')
    },
    rowClick (row) {
      console.log(row)
    },
    reset () {
      this.bloodGroup = ''
      this.city = ''
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
    console.log(window.remoteController)
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
