/**
 *Created by Zhangyuanyuan ON 2019/3/11 16:37
 */
export default function(){
  return {
    state: {
      sub_nav_list: [], //二级导航
      //围栏、监控
      taskMonitoringLastData: null,
      singleGeofenceTrackTime: 0,
      lastTaskId: 0,
      curMonitor:null,
      adminBrand:[],
      adminMonitorStatus:[],
      adminIDName:[],
      adminModel: [],
      adminFenceType:[],
      adminYear:[],
      adminUpdate:[],
      adminGeofence:[],
      adminAlarmType:[],
      adminAllFleet: [],
      adminTypeFleet: [],
      adminAllType:[],
      adminAllSubscription: [],
      isShowNavMask:false,
      serTypeName:[],
      userTypeName:[],
      userCreated:[],
      serCreated:[],
      //焦澍新加
      searchAllFleet:[],
      searchAllGeo:[],
      //编辑围栏数据
      editGeoData:{}
    },
    getters: {
      sub_nav_list: state => state.sub_nav_list,
      taskMonitoringLastData: state => state.taskMonitoringLastData,
      singleGeofenceTrackTime: state => state.singleGeofenceTrackTime,
      lastTaskId: state => state.lastTaskId,
      curMonitor: state => state.curMonitor,
      adminBrand: state => state.adminBrand,
      adminMonitorStatus: state => state.adminMonitorStatus,
      adminIDName: state => state.adminIDName,
      adminModel: state => state.adminModel,
      adminFenceType: state => state.adminFenceType,
      serTypeName: state => state.serTypeName,
      userTypeName: state => state.userTypeName,
      userCreated: state => state.userCreated,
      adminYear: state => state.adminYear,
      adminUpdate: state => state.adminUpdate,
      adminGeofence: state => state.adminGeofence,
      adminAlarmType: state => state.adminAlarmType,
      adminAllFleet: state => state.adminAllFleet,
      adminTypeFleet: state => state.adminTypeFleet,
      adminAllType: state => state.adminAllType,
      serCreated: state => state.serCreated,
      adminAllSubscription: state => state.adminAllSubscription,
      isShowNavMask: state => state.isShowNavMask,
      //焦澍新加
      searchAllFleet : state => state.searchAllFleet,
      searchAllGeo : state => state.searchAllGeo,
      editGeoData : state => state.editGeoData,
    },
    mutations: {
      //焦澍新加
      updateSearchFleet(state, payload){
        state.searchAllFleet = payload;
      },
      updateSearchGeo(state, payload){
        state.searchAllGeo = payload;
      },
      updateEditGeoData(state, payload){
        state.editGeoData = payload;
      },
      updateSubNavList(state, payload) {
        state.sub_nav_list = payload;
      },
      setTaskMonitoringLastData(state, data) {
        state.taskMonitoringLastData = data;
      },
      setSingleGeofenceTrackTime(state, data) {
        state.singleGeofenceTrackTime = data;
      },
      setLastTaskId(state, id) {
        state.lastTaskId = id;
      },
      updateCurMonitor(state, data) {
        state.curMonitor = data;
      },
      updateAdminBrand(state, data) {
        state.adminBrand = data;
      },
      updateAdminStatus(state, data) {
        state.adminMonitorStatus = data;
      },
      updateAdminIDName(state, data) {
        state.adminIDName = data;
      },
      updateAdminModel(state, data) {
        state.adminModel = data;
      },
      updateFenceType(state, data) {
        state.adminFenceType = data;
      },
      updateSerCreated(state, data) {
        state.serCreated = data;
      },
      updateSerTypeName(state, data) {
        state.serTypeName = data;
      },
      updateUserTypeName(state, data) {
        state.userTypeName = data;
      },
      updateUserCreated(state, data) {
        state.userCreated = data;
      },
      updateAdminYear(state, data) {
        state.adminYear = data;
      },
      updateAdminUpdate(state, data) {
        state.adminUpdate = data;
      },
      updateAdminGeofence(state, data) {
        state.adminGeofence = data;
      },
      updateAlarmType(state, data) {
        state.adminAlarmType = data;
      },
      updateAdminAllFleet(state, data) {
        state.adminAllFleet = data;
      },
      updateTypeFleet(state, data) {
        state.adminTypeFleet = data;
      },
      updateAdminAllType(state,data){
        state.adminAllType = data;
      },
      updateAdminAllSubscriptions(state, data) {
        state.adminAllSubscription = data;
      },
      updateIsShowNavMask(state, data) {
        state.isShowNavMask = data;
      },
    },
  }
}
