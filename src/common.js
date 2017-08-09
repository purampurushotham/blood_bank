/**
 * Created by purushotham on 8/8/17.
 */
import moment from 'moment'
let common = {
  setValueToStore: function (path, value) {
    let donorArray = []
    if (Array.isArray(value)) {
      console.log('value')
      console.log(value)
      console.log('value')
      common.setter(path, value)
      donorArray = donorArray.concat(common.getter(path))
    } else {
      donorArray = donorArray.concat(common.getter(path))
      donorArray.push(value)
    }
    common.setter(path, donorArray)
    console.log('setter')
    console.log(donorArray)
    console.log('set value to store')
  },
  setSearchOptions: function (data, bloodgroups, cities) {
    console.log('set search optiomns')
    data.map((eachDonor, index) => {
      if (!bloodgroups.includes(eachDonor.bloodGroup)) {
        bloodgroups.push(eachDonor.bloodGroup)
      }
      if (!cities.includes(eachDonor.city)) {
        cities.push(eachDonor.city)
      }
    })
    console.log(window.bb.blood_groups)
    console.log('set search optiomns')
  },
  searchDonor: function (data, bloodGroup, city) {
    let searchedDonors = []
    console.log(bloodGroup, city.length)
    if ((bloodGroup === '' || bloodGroup === null) && (city === '' || city === null)) {
      return data
    } else {
      data.map((object, index) => {
        if ((object.bloodGroup === bloodGroup && object.city === city) && (!object.recentDonor.exists)) {
          searchedDonors.push(object)
        } else if (object.bloodGroup === bloodGroup && (city === '' || city === null)) {
          searchedDonors.push(object)
        } else if ((bloodGroup === '' || bloodGroup === null) && city === object.city) {
          searchedDonors.push(object)
        }
      })
    }
    return searchedDonors
  },
  getter: function (type) {
    return JSON.parse(localStorage.getItem(type))
  },
  setter: function (type, data) {
    localStorage.setItem(type, JSON.stringify(data))
  },
  updateRecentDonor: function (data) {
    if (data.recentDonor.exists) {
      common.getter('donors').map((object, index) => {
        console.log('show Modal')
        console.log(object.id, data.id)
        console.log('show Modal')
        if (object.id === data.id) {
          object.recentDonor.exists = data.recentDonor.exists
          data.recentDonor.recentDonorTime = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
          data.recentDonor.reachedTime = moment().add(2, 'minutes').format('YYYY-MM-DD HH:mm:ss')
        }
      })
      common.checkDonorStatus(data)
    }
    return data
  },
  checkDonorStatus: function (data) {
    let donorsStatus = []
    donorsStatus = donorsStatus.concat(common.getter('donors'))
    console.log('before donor')
    console.log(donorsStatus)
    console.log('before donor')
    donorsStatus.map((object, index) => {
      console.log('checkDonorStatus', index)
      if (object.id === data.id) {
        donorsStatus[index].recentDonor = {}
        donorsStatus[index].recentDonor = data.recentDonor
      }
    })
    common.setter('donors', donorsStatus)
  }
}
export default common
