/**
 * Created by purushotham on 8/8/17.
 */
let common = {
  setValueToStore: function (data, path, value) {
    if (Array.isArray(value)) {
      console.log('value')
      console.log(value)
      console.log('value')
      data[path] = data[path].concat(value)
    } else {
      console.log('object value')
      console.log(value)
      console.log('object value')
      data[path].push(value)
    }
    console.log(data[path])
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
  }
}
export default common
