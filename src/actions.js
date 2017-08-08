/**
 * Created by purushotham on 8/8/17.
 */
import common from './common'
let actions = {
  responseInterceptor: function (result, event, cb) {
    cb()
  },
  populateDonors: function (afterPopulate) {
    window.remoteController.getDonors(function (result, event, cb) {
      console.log('populate User infor')
      console.log(result)
      console.log('populate User infor')
      actions.responseInterceptor(result, event, function () {
        common.setValueToStore(window.bb, 'donors', result)
        afterPopulate()
      })
    })
  }
}
export default actions
