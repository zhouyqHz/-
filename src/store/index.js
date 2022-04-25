import Vue from 'vue'
import Vuex from 'vuex'
//导入main模块
import main from './modules/main'
//导入admin模块
import admin from './modules/admin'
import report from './modules/report'
//maintenance模块
import maintenance from './modules/maintenance'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      isLoaded:false,
      isLoading:false,//是否显示加载动画
      loadText:'',//显示的加载文字
      permissionInfo:{}
  },
  getters: {
      isLoading:state=>state.isLoading,
      loadText:state=>state.loadText,
      permissionInfo:state=>(state.permissionInfo ? JSON.parse(sessionStorage.getItem("permission")) : state.permissionInfo)
  },
  mutations: {
      //更新权限
      updatePermissionInfo(state,obj){
          state.permissionInfo = obj;
      },
      //地图加载完成
      updateMapLoaded(state,flag){
        state.isLoaded=flag;
      },
    //loading遮罩
      updateIsLoading(state, payload) {
        state.isLoading = payload;
      },
    //loading文字
      updateLoadText(state, payload) {
        state.loadText = payload;
      },
  },
  actions: {
  },
  modules: {
      main:main(),
      admin:admin(),
      report:report(),
      maintenance:maintenance(),
  }
})
