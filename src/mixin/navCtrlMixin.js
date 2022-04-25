/**
 *Create By Zhangyuanyuan ON 2020/6/17
 */

import {mapGetters,mapMutations} from 'vuex'
export const navCtrlMixin = {
    computed: {
        ...mapGetters(['permissionInfo']),
    },
    methods:{
        ...mapMutations(['updateSubNavList']),
        //判断该子模块是否
        pathFlag(obj){
            if(!obj) return false;
            let arr = Object.values(obj);
            arr = arr.map(e=>{
                return e.query !== undefined ? e.query :e
            });
            let flag = arr.some(e=>{
                return e
            });
            return flag
        },
        //根据权限设置显示的nav
        routerPath(){
            let {admin,main,report,score,maintenance} = this.permissionInfo;
            // for(let i in this.permissionInfo){
            //     let item = this.permissionInfo[i];
            //     moduleIsAllowed[i] = typeof item === "boolean" ? item :this.pathFlag(item);
            // }
            // sessionStorage.setItem('moduleIsAllowed',moduleIsAllowed);
            let nowPathName = this.$route.name;
            // //跳转main模块
            const mainPath = () => {
                this.updateSubNavList(['main']);
                return "/main";
            };
            //跳转maintenance模块
            const mtcPath = () => {
                this.updateSubNavList(['mtc']);
                return "/maintenance";
            };
            const scorePath = () => {
                this.updateSubNavList(['score']);
                return "/score";
            };
            const reportPath = () => {
                let {selectReport,driverScore,geofenceIncident} = report;
                if(selectReport){
                    this.updateSubNavList(['report','drivingDistance']);
                }else if(driverScore){
                    this.updateSubNavList(['report','driverScore']);
                }else if(geofenceIncident){
                    this.updateSubNavList(['report','geofence']);
                }
                return "/report"
            };
            const adminPath = () => {
                // alertProfile: true
                // alertRecipientsList: true
                let {fleet,geofencing,user,vehicle,alertProfile,alertRecipientsList,sysconfig} = admin;
                if(user&&user.query){
                    this.updateSubNavList(['admin','mser','userList']);
                }else if(vehicle&&vehicle.query){
                    this.updateSubNavList(['admin','vehicle']);
                }else if(fleet&&fleet.query){
                    this.updateSubNavList(['admin','fleet']);
                }else if(geofencing&&geofencing.query){
                    this.updateSubNavList(['admin','geofenceMonitor','monitoring']);
                }else if(alertProfile){
                    this.updateSubNavList(['admin','alertProfiles']);
                }else if(alertRecipientsList){
                    this.updateSubNavList(['admin','alertRecipients']);
                }else if(sysconfig){
                    this.updateSubNavList(['admin','systemConfiguration']);
                }
                return "/admin";
            };
            let route = new Map()
                .set('main',mainPath)
                .set('maintenance',mtcPath)
                .set('score',scorePath)
                .set('report',reportPath)
                .set('admin',adminPath);
            let path;
            if(nowPathName === 'login'){
                if(main){
                    path = route.get('main')();
                    return path;
                }
                if(score){
                    path = route.get('score')();
                    return path;
                }
                if(report&&this.pathFlag(report)){
                    path = route.get('report')();
                    return path;
                }
                if(maintenance){
                    path = route.get('maintenance')();
                    return path;
                }
                if(admin&&this.pathFlag(admin)){
                    path = route.get('admin')();
                    return path
                }
                return path;
            }else{
                path = route.get(nowPathName) ? route.get(nowPathName)() : null;
                return path;
            }
        },
    }
};