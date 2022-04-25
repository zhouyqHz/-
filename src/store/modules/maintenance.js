/**
 *Created by Zhangyuanyuan ON 2019/3/11 16:37
 */
export default function(){
  return {
    state:{
        model: "index",// 控制子页面切换参数
        chartsParams:{},// 点击chart返回的参数
        selectDate: '',// 时间控件选择的时间
    },
    getters: {
        chartsParams: state => state.chartsParams,
        selectYear: state => {
            return state.selectDate ? state.selectDate.slice(0,4) : new Date().getFullYear()
        }
    },
    mutations:{
        changeModel(state,p){
            let {params,model,date} = p;
            if(params) state.chartsParams = params;
            if(model) state.model = model;
            if(date) state.selectDate = date;
        },
        changeSelectYear(state,payload) {
            let month = state.selectDate.slice(4.6);
            state.selectDate = payload + month
        }
    }
  }
}
