import axios from 'axios'
import Qs from 'qs'
//设置全局请求取消项
// window.axiosCancel = [];
// import * as api from './api.js'
//测试服务器地址
//const SERVER_ADDRESS='//113.106.54.32:21193/tp_platform_view_jn/';
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
  for(let p in pending){
    if(pending[p].u === config.url + '&' + config.method+ '&' + Qs.stringify(config.data)) { //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
};
//请求的配置项
var config={
  url: '',
  // baseURL: globalConfig.SERVICE_ADDRESS,
  baseURL: '',
  method: 'POST',
  //请求数据的处理
  transformRequest: [
    function(data) {
      //将根据contentType的不同，使用不用的方法对params进行序列化
      // return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
      return data
    }
  ],
  //处理返回数据
  transformResponse: [
    function(data) {
      return data;
    }
  ],
  //设置header请求方式
  headers: {
   'Content-Type':'application/json;charset=utf-8',
  //  'token':sessionStorage.token
  },
  //设置params,这个选项会直接用字符串拼接在请求接口后方
  params: {
  },
  //设置data会直接与传入的参数进行结合
  data: null,
  //请求超过20秒钟中断
  timeout: 30000,
  //是否进行跨域请求
  withCredentials: false, // default
  //返回信息体类型
  responseType: 'json', // default
  //允许处理上传的进度事件（用来检测上传进度）
  // onUploadProgress: function(progressEvent) {
  // 	// Do whatever you want with the native progress event
  // },
  //允许处理下载的进度事件（用来检测下载进度）
  // onDownloadProgress: function(progressEvent) {
  // 	// Do whatever you want with the native progress event
  // },
  //定义允许的http响应内容的最大大小
  //maxContentLength: 2000,
  //validateStatus: function(status) {
  //  return status >= 200 && status < 300; // default
  //},
  //定义在node.js中要遵循的重定向的最大数量。如果设置为0，则不会遵循重定向。
  maxRedirects: 5, // default
};

//创建axios带config的实例
var axiosInstance = axios.create(config);
//添加请求拦截器
axiosInstance.interceptors.request.use(config=>{
  removePending(config); //在一个ajax发送前执行一下取消操作
  // if (sessionStorage.getItem("token") != null) {
  //   config.headers["token"] = sessionStorage.getItem("token");
  // }
  // config.cancelToken = new cancelToken((c)=>{
  //   // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
  //   pending.push({ u: config.url + '&' + config.method + '&' + Qs.stringify(config.data), f: c });
  //   //如果参数中有cancel标记，可以手动取消请求
  //   // if(config.data.cancel){
  //   //   window.axiosCancel.push({u: config.url,f: c });
  //   // }
  // });
  return config;
},error => {
  return Promise.reject(error);
});

//添加响应拦截器
axiosInstance.interceptors.response.use(response=>{
  removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
  return response;
},error =>{
  // return { data: { } };
});
export default axiosInstance
