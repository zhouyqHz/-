/**
 *Create By Zhangyuanyuan ON 2020/2/15
 */
export const dateFormat=function(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
};
//飞行函数
export function flyToPosition(map,obj){
    let {center,zoom,bearing,pitch} = obj;
    map.flyTo({
        center: center,
        zoom: zoom,
        bearing: bearing ? bearing : 0 ,
        pitch : pitch ? pitch : 0,
        speed: 0.4,
        duration: 2 * 1000,
        animate:true
    });
}
//将字符串时间转化为时间戳（定制化非通用）
export function strToStamp(str){
    let arr=str.toString().split(":"),second;
    second=parseInt(arr[0])*60*60+parseInt(arr[1])*60+(arr[2] ? parseInt(arr[2]) : 0);
    return second
}
//将时间戳转化为时间字符串
export function stampToStr(timstamp,type = 'hm'){
    let time = "";
    let h = Math.floor(timstamp / 3600);
    let m = Math.floor((timstamp - h*3600) / 60);
    let s = Math.floor(timstamp - h*3600 - m*60);
    h = h >= 10 ? h : "0"+h;
    m = m >= 10 ? m : "0"+m;
    s = s >= 10 ? s : "0"+s;
    time = h+":"+m+(type === 'hms' ? ":"+s : '');
    return time
}
//获取月份的开始和结束日期(定制化)
export function getLastMonthStartAndEnd(month){
    let y,m=month,d31=[1,3,5,7,8,10,12],ld;
    y = new Date().getFullYear();
    if(m===1){
        y--;
        m=12;
    }else{
        m--;
    }
    if(d31.includes(m)){
        ld=31;
    }else{
        if(y/4===0&&m===2) ld=28;
        else if(m===2) ld=29;
        else ld=30;
    }
    let sDate=y+"-"+(m<10 ? "0"+m : m)+"-"+"01";
    let eDate=y+"-"+(m<10 ? "0"+m : m)+"-"+(ld<10 ? "0"+ld : ld);
    return [sDate,eDate]
}
//计算上一周的开始和结束日期
export function getLastWeekDate(){
    //当前的日期
    let nowDate = new Date(),
        nowT = Date.now();
    // let nowDate = new Date('2020-09-06'),
    //     nowT = new Date('2020-09-06').getTime();
    //当前星期到上星期日的跨度
    let interval = nowDate.getDay() ? nowDate.getDay() : 7;
    let weekEnd = new Date(nowT - interval*24*60*60*1000);
    let weekStart = new Date(nowT - (interval+6)*24*60*60*1000);
    return [dateFormat("YY-mm-dd",weekStart),dateFormat("YY-mm-dd",weekEnd)]
}
//数字添加千分位分隔符
export const numberFormat=function (num){
  if(['',"",null,undefined].includes(num)) return num;
  num=num+'';//数字转字符串
  var str="";//字符串累加
  for(var i=num.length- 1,j=1;i>=0;i--,j++){
    if(j%3==0 && i!=0){//每隔三位加逗号，过滤正好在第一个数字的情况
      str+=num[i]+",";//加千分位逗号
      continue;
    }
    str+=num[i];//倒着累加数字
  }
  return str.split('').reverse().join("");//字符串=>数组=>反转=>字符串
}
export const removeRepeat=function (orArr,coArr,id) {
  if(orArr&&orArr.length){
    let len=orArr.length;
    for (let i = len - 1; i >= 0; i--) {
      if (coArr&&coArr.find(e => e&&e[id] == orArr[i][id])) {
        orArr.splice(i, 1);
      }
    }
    return orArr
  }
}
export const removeRepeatConcat=function (orArr,coArr,id) {
  // debugger
  if(orArr&&orArr.length){
    orArr=removeRepeat(orArr,coArr,id)
    orArr=orArr.concat(coArr);
  }else {
    if(coArr&&coArr.length){
      orArr=[].concat(coArr);
    }else {
      orArr=[];
    }
  }
  return orArr
}
//表格占位符样式自定义（非通用）
export const placeholderClass=function (obj,placeholder,cName) {
  let cellClass={};
  for (let key in obj) {
    if(obj[key]==placeholder){
      cellClass[key]=cName
    }
  }
  return cellClass;
};
export function showMsg(params = {}){
    let {vm,msg,type,duration} = params;
    vm.$message({
        message: msg ? msg : '提示!',
        type: type ? type : 'error',
        duration:duration ? duration : 1500
    });
}
//执行一次函数
export function once(fn) {
    let result;
    return  function() {
        if(fn) {
            result = fn.apply(this, arguments);
            fn = null;
        }
        return result;
    };
}
//防御xss攻击转换函数
export function escapeHtmlProperty(str){
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/gi,'&gt;');
    //只转换js的script标签
    str = str.replace(/<script/g, '&lt;script');
    str = str.replace(/<\/script>/gi,'&lt;/script>');
    return str;
}
//设置中英文月份方法
let monthEn = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let monthCh = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
export function setMonthOp(lang){
    let monthArr = monthEn.map((e,i) =>{
        let label = lang === 'en' ?  e : monthCh[i];
        return {label:label,value:i}
    });
    return {arr:monthArr.reverse(),en:monthEn,ch:monthCh}
}

/**
 * 把maintenance表格数据中为空值的数据，格式化为"-"
 * @param tableData
 * @returns {*}
 */
export const formatMTTableData = (tableData) => {
    tableData.forEach( row => {
        for (let key in row) {
            if (row[key] === '' || row[key] === null) row[key] = '-'
        }
    })
    return tableData
}

/**
 * 获取service页面中status对应颜色
 * @param status
 * @returns {string}
 */
export const getStatusColor = (status) => {
    const statusColor = [
        {
            name: 'On Time',
            color: '#2BD6DA'
        },
        {
            name: 'Delay',
            color: '#F7B500'
        },
        {
            name: 'No Appointment',
            color: '#6D59FF'
        },
        {
            name: 'No Show',
            color: '#F16574'
        }
    ];
    let obj = statusColor.find( item => item.name === status );
    if (obj) {
        return obj.color
    } else {
        return 'rgba(255,255,255,0)'
    }
};
//登录清空没用的上一次登录的session
export function clearAllSession(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('typeId');
    sessionStorage.removeItem('IDtitle');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('userTypeName');
    sessionStorage.removeItem('userCreateBy');
    sessionStorage.removeItem('serCreateBy');
    sessionStorage.removeItem('IDid');
}

/**
 * 获取SessionStorage数据，并返回对象
 * @param key
 * @returns {any}
 */
export const getSessionStorage = (key) => {
    return  sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : ''
}