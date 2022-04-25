/**
 *Created by Zhangyuanyuan ON 2019/3/11 16:37
 */
export default function(){
  return {
    state: {
      reportBrand:[],
      reportModel: [],
      reportYear:[],
      reportAllFleet: [],
      reportFleet:[],
      driverDetail:{},
      showSearchResult:false
    },
    getters: {
      showSearchResult: state => state.showSearchResult,
      reportModel: state => state.reportModel,
      reportYear: state => state.reportYear,
      reportBrand: state => state.reportBrand,
      reportAllFleet: state => state.reportAllFleet,
      reportFleet: state => state.reportFleet,
      driverDetail: state => state.driverDetail
    },
    mutations: {
      updateSearchResult(state, data) {
        state.showSearchResult = data;
      },
      updateReportBrand(state, data) {
        state.reportBrand = data;
      },
      updateReportModel(state, data) {
        state.reportModel = data;
      },
      updateReportYear(state, data) {
        state.reportYear = data;
      },
      updateReportAllFleet(state, data) {
        state.reportAllFleet = data;
      },
      updateReportFleet(state, data) {
        state.reportFleet = data;
      },
      updateDriverDetail(state, data){
        state.driverDetail = data;
      }
    },
  }
}
