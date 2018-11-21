//util.js
import wepy from 'wepy';
import api from '../api/api';
import tip from './tip';
import {
  API,
} from "./constant"
import {
  USER_TOKEN,
  APP_ID,
} from "./constant";
function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽
  var originalHeight = e.detail.height;//图片原始高
  var originalScale = originalHeight/originalWidth;//图片高宽比
  // console.log('originalWidth: ' + originalWidth)
  // console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight/windowWidth;//屏幕高宽比
      // console.log('windowWidth: ' + windowWidth)
      // console.log('windowHeight: ' + windowHeight)
      if(originalScale < windowscale){//图片高宽比小于屏幕高宽比
        //图片缩放后的宽为屏幕宽
         imageSize.imageWidth = windowWidth;
         imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      }else{//图片高宽比大于屏幕高宽比
        //图片缩放后的高为屏幕高
         imageSize.imageHeight = windowHeight;
         imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  // console.log('缩放后的宽: ' + imageSize.imageWidth)
  // console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}
const checkToken = async(codeType,runFunction) => {
  console.log('checkToken token',wepy.getStorageSync('token'))

  let login = function () {
    wx.login({
      success: function(res) {
        console.log('checkToken code',res.code)
        //return false;
        if (res.code) {
          wepy.request({
            url: API+'/login', //仅为示例，并非真实的接口地址
            data: {
              code:res.code
            },
            method:'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function(res) {
              let getData=res.data;
              if(getData.message == 'success'){
                let token = getData.data.token || '';
                // let openid=getData.data.openId || '';
                // let avatar=getData.data.avatar || '';
                // let nickName=getData.data.nickName || '';
                // let mobile=getData.data.mobile || '';
                wepy.setStorageSync('token',token);
                // wepy.setStorageSync('openid',openid);
                // wepy.setStorageSync('avatar',avatar);
                // wepy.setStorageSync('nickName',nickName);
                // wepy.setStorageSync('mobile',mobile);
                runFunction();
              }else{
                tip.confirm(getVideo.info.returnMessage,false);
              }
            },
            fail:function(){
              tip.confirm('登录接口',false);
            }
          })
        } else {
          tip.confirm('登录信息出错',false);
        }
      }
    });
  }
  if(wepy.getStorageSync('token') == '' || codeType === 1003){
    login();
  }else{
    wx.checkSession({
      success:function(res){
        console.log(res,'登录未过期')
        runFunction();
      },
      fail:function(res){
        //再次调用wx.login()
        login();
      }
    })
  }
};
const goToOtherProgram = async(pagePath) => {
  const json=await api.goToOtherProgram({
    method:'get',
    query: {
      configModule: pagePath,
    },
    header:{
      'Content-Type': 'application/json',
      Token:wepy.getStorageSync(USER_TOKEN)
    }
  })
  if(json.data.code === 0){
    var getData=json.data.data;
    console.log(getData);
    getData=JSON.parse(getData);
    wx.navigateToMiniProgram({
      appId:getData.appId,
      path: getData.page,
      extraData: {
        foo: 'bar'
      },
      envVersion:getData.env,
      success(res) {
        console.log(res)
      },
      fail(res){
        tip.confirm('跳转出错',false);
      }
    })
  }else if(json.data.code === 1003){
    checkToken(json.data.code,function(){
      goToOtherProgram(pagePath);
    })
  }else{
    await tip.confirm('跳转出错',false);
  }
}


function getCurrentTime(oldTime) {
  var keep = '';
  var date = new Date();
  date.setTime(oldTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var rand = Math.round(Math.random() * 899 + 100);
  keep = y + '-' + m + '-' + d;
  return keep; //20160614134947
}


function paramData(data,callBackFun){
  let code = data.code;
  let message = data.message;
  let temp = true;
  if(code==1001){
    tip.confirm(message,false);
  }else if(code==1002){
    tip.confirm(message,false);
  }else if(code==1003){
    if(typeof callBackFun == 'function'){
      wepy.setStorageSync('token','');
      callBackFun();
    }
  }else if(code==1004){
    tip.confirm(message,false);
  }else{
    temp = false;
  }
  return temp;
}

function httpRequest(option){
  let getDataAction = function(){
    checkToken(0,function(){
      wepy.request({
        url: option.url, //仅为示例，并非真实的接口地址
        data: option.data,
        method:(option.method=='POST' || option.method=='post')?'POST':'GET',
        header: {
          'content-type': 'application/json', // 默认值
          'Token': wepy.getStorageSync('token'),
        },
        success: function(res) {
          let getData=res.data;
          console.log('success',res);
          if(getData.code == 0){
            if(typeof option.success == 'function'){
              option.success(getData);
            }
          }else if(paramData(getData,getDataAction)){
          }else{
            tip.confirm('获取失败',false);
          }
        },
        fail:function(){
          if(typeof option.fail == 'function'){
            option.fail();
          }else{
            tip.confirm('获取失败',false);
          }

        }
      })
    })
  }
  getDataAction();
}

module.exports = {
  imageUtil:imageUtil, ////图片的自适应
  getCurrentTime:getCurrentTime,
  upDateToken:checkToken,
  goToOtherProgram:goToOtherProgram,
  paramData:paramData,
  httpRequest:httpRequest,
}
