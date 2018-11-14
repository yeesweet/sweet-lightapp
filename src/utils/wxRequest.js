import wepy from 'wepy';
import tip from './tip'
const wxRequest = async(params = {}, url, loadingNoShow) => {
    if(!loadingNoShow){
        tip.loading();
    }
    let data = params.query || {};
    let header = params.header || {'Content-Type': 'application/json'};
    // data.sign = SIGN;
    // data.time = TIMESTAMP;
    try {
      let res = await wepy.request({
          url: url,
          method: params.method || 'POST',
          data: data,
          header: header
      });
      if(!loadingNoShow){
        tip.loaded();
      }
      return res;
    } catch (err) {
      tip.loaded();
      var getErr=err.errMsg;
      getErr=getErr.replace('request:fail','');
      await tip.confirm(getErr,false);
      wx.navigateBack({
        delta: 1
      })
      return err;
    }

};


module.exports = {
    wxRequest
}
