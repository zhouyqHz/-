import Vue from 'vue'
import App from './App.vue'
// import turf from 'turf'
import VueI18n from 'vue-i18n'
//国家化字典
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//导入字体
import './fonts/fonts.css'
//样式覆盖
import './scss/common_el.scss'
//引入Element的语言包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
//自定义语言包
import langZh from './lang/zh'
import langEn from './lang/en'
import service from './axios/service'
import echarts from 'echarts'
import router from './router'
import store from './store'
// import eventBus from './components/common/event-bus'
import stopKeyCode from './util/tool/stopKeyCode'
import rem from './rem/rem'
import './scss/reset.scss'
//element以插件形式安装
// import './plugins/element.js'
//iview正常流程安装
import iview from 'view-design';
//iview 按需导入
import 'view-design/dist/styles/iview.css';
//iview 样式覆盖
import './scss/common_iview.scss';
//引入iview的语言包
import enLange from 'view-design/dist/locale/en-US'
import zhLange from 'view-design/dist/locale/zh-CN'
//导入定制化scroll
import vuescroll from 'vuescroll/dist/vuescroll-native';
//引入公共组件
// import eventBus from './components/common/event-bus'
// Vue.use(eventBus);
Vue.use(VueI18n);
// 设置语言项
const i18n = new VueI18n({
    locale: 'zh',
    messages: {
        'en': Object.assign(enLocale,langEn,enLange),
        'zh': Object.assign(zhLocale,langZh,zhLange)
    }
});
//应用element和国际化字典
Vue.use(Element,{
    i18n:(key,value) =>i18n.t(key,value)
});
Vue.use(vuescroll);
//todo:后续若不使用iview的DatePicker则可以不应用iview的国际化字典
// 应用iview和国际化字典
Vue.use(iview,{
  i18n:(key,value) =>i18n.t(key,value)
});
// locale()
// Vue.prototype.$axios=axios;
// Vue.prototype.$axiosMain=axiosMain;
// Vue.prototype.$axiosMap=axiosMap;
Vue.prototype.$service=service;
Vue.prototype.$echarts=echarts;
Vue.config.productionTip = false;
rem();
// stopKeyCode();
// import './scss/common_el.scss'

// import Router from 'vue-router'

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
