import {
  wxRequest
} from '../utils/wxRequest';

let env = "-dev" //-dev 或者 -test
const bridge ='http://dev.naisb.cn';//测试开发环境
//const bridge ='https://wx.naisb.cn';//线上环境
//const bridgeTest ='http://10.19.1.8:8888';
/**
 * 接口
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
//获取页面模块
const getModuleList = (params) => wxRequest(params, bridge + "/getPageManager");


//首页获取视频列表
const videoList = (params) => wxRequest(params, bridge + "/video/list");
//const videoList = bridge + "/video/list";
//添加会员收获地址接口
const addAddress = (params) => wxRequest(params, bridge + "/address/addAddress");
//更新会员收获地址接口
const updateAddress = (params) => wxRequest(params, bridge + "/address/updateAddress");
//删除会员收获地址接口
const deleteAddress = (params) => wxRequest(params, bridge + "/deleteAddress");
//获取会员收获地址接口
const addressList = (params) => wxRequest(params, bridge + "/address/addressList");
//获取会员收获详情地址接口
const addressDetail = (params) => wxRequest(params, bridge + "/address/addressDetail");
//获取有会员列表
const couponList = (params) => wxRequest(params, bridge + "/coupon/couponList");
//根据优惠券状态获取优惠券列表
const couponListByStatus = (params) => wxRequest(params, bridge + "/coupon/couponListByStatus");
//创建订单接口
const addOrder = (params) => wxRequest(params, bridge + "/order/addOrder");
//修改订单状态接口
const updateOrder = (params) => wxRequest(params, bridge + "/order/updateOrder");
//删除订单状态接口
const deleteOrder = (params) => wxRequest(params, bridge + "/order/deleteOrder");
//查询订单状态接口
const searchOrderStatus = (params) => wxRequest(params, bridge + "/order/searchOrderStatus");
//获取会员订单列表接口
const orderList = (params) => wxRequest(params, bridge + "/order/orderList");
//获取会员订单列表接口
const orderDetail = (params) => wxRequest(params, bridge + "/order/orderDetail");
//支付回调接口
const weChatPay = (params) => wxRequest(params, bridge + "/weChatPay");
//首页商品列表接口
const hotList = (params) => wxRequest(params, bridge + "/commodity/getCommodityList");
//获取商品详情接口
const hotDetail = (params) => wxRequest(params, bridge + "/commodity/detail");
//增加商品分享数接口
const addGoodShareCount = (params) => wxRequest(params, bridge + "/comodity/addCount");
//获取商品尺码列表接口
const getSize = (params) => wxRequest(params, bridge + "/commoditysku/size");
//获取规格详情接口
const getDetail = (params) => wxRequest(params, bridge + "/commoditysku/detail");
//上传视频接口
const addVideo = (params) => wxRequest(params, bridge + "/video/add");
//增加分享次数，浏览次数，点赞次数接口
const addShareCount = (params) => wxRequest(params, bridge + "/video/addCount");

module.exports = {
  videoList,
  addAddress,
  updateAddress,
  deleteAddress,
  addressList,
  addressDetail,
  couponList,
  couponListByStatus,
  addOrder,
  updateOrder,
  deleteOrder,
  searchOrderStatus,
  orderList,
  orderDetail,
  weChatPay,
  hotList,
  hotDetail,
  addGoodShareCount,
  getSize,
  getDetail,
  addVideo,
  addShareCount
}
