/**
 * 提示与加载工具类
 */
export default class Tips {
  constructor() {
    this.isLoading = false;
  }
  /**
   * 弹出提示框
   */

  static success(title, duration = 500) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: "success",
        mask: true,
        duration: duration
      });
    }, 300);
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, duration);
      });
    }
  }

  /**
   * 弹出确认窗口
   * var getAwait=await tip.confirm('登录信息出错',true);
      console.log(getAwait);
      if(getAwait){
        wepy.switchTab({
          url: '/pages/index'
        })
      }
   */
  static confirm(text,showCancle,title = "") {
    return new Promise((resolve, reject) => {
      let payload = {confirm:true,cancel:false,fail:'reject'};
      wx.showModal({
        title: title,
        content: text,
        showCancel: showCancle,
        cancelColor: '#999999',
        confirmColor: '#e11616',
        success: res => {
          if (res.confirm) {
            resolve(payload.confirm);
          } else if (res.cancel) {
            resolve(payload.cancel);
          }
        },
        fail: res => {
          reject(payload.fail);
        }
      });
    });
  }

  static toast(title, onHide, icon = "success") {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: icon,
        mask: true,
        duration: 500
      });
    }, 300);

    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 500);
    }
  }

  /**
   * 警告框
   */
  static alert(title) {
    wx.showToast({
      title: title,
      icon:'none',
      mask: true,
      duration: 1500
    });
  }

  /**
   * 错误框
   */

  static error(title, onHide) {
    wx.showToast({
      title: title,
      icon:'none',
      mask: true,
      duration: 500
    });
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 500);
    }
  }

  /**
   * 弹出加载提示
   */
  static loading(title = "") {
    if (Tips.isLoading) {
      return;
    }
    Tips.isLoading = true;
    wx.showLoading({
      title: title,
      mask: true
    });
  }

  /**
   * 加载完毕
   */
  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false;
      wx.hideLoading();
    }
  }

  static share(title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function(res) {
        Tips.toast("分享成功");
      }
    };
  }
}

/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false;
