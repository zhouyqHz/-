/**
 *Create By Zhangyuanyuan ON 2020/7/7
 */
import router from '../router'
import { MessageBox } from 'element-ui'
import {clearAllSession} from '../util/tool/tool'
let jumpFlag = true;
let chTitle = '警告';
let enTitle = 'Warning';
let chMsg = ['token已过期，请重新登录！','无权限！请重新登录！'];
let enMsg = ['Token expire! Please login again!','No permission! Please login again!'];
export const jumpLogin = (resultMsg)=>{
    let showTitle = localStorage.lang==='zh' ? chTitle : enTitle;
    let tokenMsg = localStorage.lang==='zh' ? chMsg[0] : enMsg[0];
    let permissionMsg = localStorage.lang==='zh' ? chMsg[1] : enMsg[1];
    let confirm = localStorage.lang==='zh' ? '确定' : 'OK';
    if(jumpFlag){
        jumpFlag = false;
        let msg;
        if(resultMsg==='token expired'){
            msg = tokenMsg;
        }else{
            msg = permissionMsg;
        }
        MessageBox.alert(msg,showTitle, {
            confirmButtonText: confirm,
            callback: action => {
                clearAllSession();
                router.push({path:'/login'});
                setTimeout(()=>{
                    jumpFlag = true;
                },300);
            }
        });
    }
};
