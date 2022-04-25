<template>
    <div class="layout">
        <Layout>
            <Header style="height:88px;box-shadow: 0px 4px 8px 0px rgba(18,25,35,0.7);">
              <div style="display:flex;height:88px;">
                <div style="display:flex;float:left;height:100%">
                      <div class="layout-logo">
                        <img :src="headImg" alt="">
                      <!-- <div class='layout-title'>内河航道电子图</div> -->
                      </div>
                      <div class='layout-title'>内河电子航道图</div>
                    </div>
                <Menu mode="horizontal" theme="dark" active-name="1" style="height:100%;width: 62%;" @on-select="selectMenu">
                    <div class="layout-nav">
                        <MenuItem name="1" class="menu-item">
                            首页
                        </MenuItem>
                        <MenuItem name="2" class="menu-item">
                            数据管理
                        </MenuItem>
                        <!-- <MenuItem name="3" class="menu-item">
                            动态监测
                        </MenuItem> -->
                        <Submenu name="3"  class="menu-item">
                            <template slot="title" class="menu-item">
                                动态监测
                            </template>
                            <MenuItem name="3-1">设施设备监测</MenuItem>
                            <MenuItem name="3-2">水位监测</MenuItem>
                            <MenuItem name="3-3">船舶定位与监测</MenuItem>
                            <MenuItem name="3-4">航标监测</MenuItem>
                            <MenuItem name="3-5">布控管理</MenuItem>
                        </Submenu>
                        <MenuItem name="4" class="menu-item">
                            船舶导航
                        </MenuItem>
                        <MenuItem name="5" class="menu-item">
                            信息发布
                        </MenuItem>
                        <MenuItem name="6" class="menu-item">
                            智能研判
                        </MenuItem>
                        <MenuItem name="7" class="menu-item">
                            实时报警
                        </MenuItem>
                    </div>

                </Menu>
                <div style="margin-left:116px">
                  <Input placeholder="请输入道路名称" style="width: 200px;" class="header-input">
                      <Icon type="ios-search" slot="prefix" />
                  </Input>
                </div>
                <div style="display:flex" class="person-right">
                     <span class="person">你好,交科院</span>
                     <Icon type="md-arrow-dropdown" size="24" color="white"/>
                </div>
              </div>


            </Header>
            <Layout>
              <Content>
                <div style="display:flex;">

                    <div :style="{background: '#4f518b',width:'74px'}" style="box-shadow:0px 4px 8px 0px rgba(18,25,35,0.7)" v-if="showIndex">
                      <div class="menu-icon" @click="collapsedSider">
                        <img :src="iconImg" alt="">
                      </div>
                      <div class="menu-list">
                        <div>
                          <img :src="chuanboImg" alt="">
                        </div>
                        <div class="menu-title">船舶信息</div>
                      </div>
                      <div class="menu-list">
                        <div>
                          <img :src="tucengImg" alt="">
                        </div>
                        <div class="menu-title">图层</div>
                      </div>
                      <div class="menu-list">
                        <div>
                          <img :src="tianqiImg" alt="">
                        </div>
                        <div class="menu-title">天气</div>
                      </div>
                      <div class="menu-list" @click="showRelitu">
                        <div>
                          <img :src="reliImg" alt="">
                        </div>
                        <div class="menu-title">热力图</div>
                      </div>
                    </div>
                    <div v-if="showGuihua" style="width:368px" class="route-info">
                        <div class="route-title">路径规划</div>
                        <div style="display:flex;margin:30px 0">
                            <div class="nav-icon"></div>
                            <div class="nav-title">导航信息</div>
                        </div>
                        <div style="display:flex" class="nav-input">
                            <div class="input-title"  id="shipId">船只信息</div>
                            <el-select v-model="selectship" clearable placeholder="请选择" style="margin-bottom:10px;width:60%">
                                <el-option
                                v-for="item in shipoptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="display:flex" class="nav-input">
                            <div class="input-title"  id="start">起始位置</div>
                            <el-input
                            @click.native="start"
                                placeholder="锚点A"
                                v-model="startInput"
                                style="margin-bottom:10px;width:60%"
                                >
                            </el-input>
                        </div>
                        <div style="display:flex" class="nav-input">
                            <div class="input-title" >终点位置</div>
                            <el-input
                                @click.native="zhongzhi"
                                placeholder="锚点B"
                                v-model="endInput"
                                style="margin-bottom:10px;width:60%"
                                >
                            </el-input>
                        </div>
                        <div style="float:right;margin-right:10px" v-if="!showNav">
                            <el-button style="text-align:center;background:#0077FF;width: 86px;color:#EEEFF1;border:none" @click="showRoute">确认</el-button>
                        </div>
                        <div style="float:right;margin-right:10px" v-if="showNav">
                            <!-- <el-button style="text-align:center;background:#0077FF;width: 86px;color:#EEEFF1;border:none" @click="showShipModel">导航</el-button> -->
                             <el-button style="text-align:center;background:#0077FF;width: 86px;color:#EEEFF1;border:none" @click="initShip">导航</el-button>
                        </div>
                        <!-- 路径规划 -->
                        <div v-if="showNav">
                            <div style="display:flex;margin:30px 0">
                                <div class="nav-icon"></div>
                                <div class="nav-title">路线信息</div>
                            </div>
                            <div class="route-sinfo">
                                <div class="sinfo-title">
                                    杭申线-嘉善段
                                </div>
                                <div class="sinfo-time">{{direction}} （{{total_miles}}）</div>
                            </div>
                            <div class="route-cont">
                                <div style="display:flex" class="cont-item">
                                    <div class="item-img">
                                        <img :src="startRoute" alt="">
                                    </div>
                                    <div class="item-start">从&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{startp}}</span>&nbsp;&nbsp;&nbsp;出发</div>
                                </div>

                                <div v-for="(item,index) in routeList" :key="index" style="display:flex" class="cont-item">
                                    <div class="item-img">
                                        <img :src="item.img" alt="">
                                    </div>
                                    <div class="item-text">
                                        <div>{{item.dir}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.action}}</div>
                                        <div>{{item.miles}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 路径规划结束 -->
                    </div>

                    <div id="mapContent">
                        <div class="threestyle" @click="setJiaodu">{{style}}</div>
                        <div class="weipian" @click="showWeipian">{{weipian}}</div>
                        <div id="lnglat"></div>
                        <div  class="waterstyle" v-if="showWater">
                            <img :src="waterStyle" alt="">
                        </div>
                        <div v-if="isNav" class="ship-info">
                           <div class="ship-cont">基本信息</div>
                           <div style="width:100%;border:0.1px solid #FFFFFF"></div>
                           <div style="display:flex;justify-content:space-between" class="ship-cont">
                               <div>
                                    <div style="display:flex;padding:5px 0px">
                                        <div>正在经过：</div>
                                        <div>嘉善段</div>
                                    </div>
                                    <div style="display:flex;padding:5px 0px">
                                        <div>剩余里程：</div>
                                        <div>{{surplus_mileage}}米</div>
                                    </div>
                                    <div style="display:flex;padding:5px 0px">
                                        <div>剩余时间：</div>
                                        <div>{{surplus_times}}</div>
                                    </div>
                                    <div style="display:flex;padding:5px 0px">
                                        <div>通行速度：</div>
                                        <div>5km/h</div>
                                    </div>
                               </div>
                               <div style="display:flex;padding:5px 0px">
                                   <div v-if="navinfo.action=='直行'">
                                       <img :src="zhixing" alt="" >
                                   </div>
                                   <div v-if="navinfo.action=='左转'">
                                       <img :src="zuozhuan" alt="" >
                                   </div>
                                   <div v-if="navinfo.action=='右转'">
                                       <img :src="youzhuan" alt="" >
                                   </div>
                               </div>

                           </div>
                           <div style="max-width:379px;height:140px;" v-if="showAlert">
                                   <img :src="qiaoImg" alt="" style="width:100%">
                           </div>
                           <div class="ship-cont" style="margin-top:0px" v-if="showAlert">桥梁信息</div>
                           <div style="width:100%;border:0.1px solid #FFFFFF" v-if="showAlert"></div>
                           <div style="display:flex;padding:5px 0px" class="ship-cont" v-if="showAlert">
                                        <div>桥名：</div>
                                        <div>{{alert.name}}</div>
                           </div>
                           <div style="display:flex;padding:5px 0px" class="ship-cont" v-if="showAlert">
                                        <div>桥梁限高：</div>
                                        <div>{{alert.info}}</div>
                           </div>
                           <div style="display:flex;padding:5px 0px" class="ship-cont" v-if="showAlert">
                                        <div>当前水深：</div>
                                        <div>{{depth}}</div>
                           </div>
                        </div>
                        <div class="shipinfo" v-if="shipinfo">
                            <div style="height:45px;display:flex;justify-content: space-between;color: #FFFFFF;align-items:center;padding:20px 20px;font-size:14px;">
                                <div>
                                    <img :src="guoqi" alt="">
                                    <span style="margin-left:10px;">{{shipname}}</span>
                                </div>
                                <div @click="closeInfo" style="cursor:pointer">
                                    <img :src="shanchu" alt="">
                                </div>
                            </div>
                            <div style="max-width:379px">
                                <img :src="shipcontent" alt="" style="width:100%">
                            </div>
                            <div style="color: #FFFFFF;padding:10px 20px;font-size:14px;">船只信息</div>
                            <div style="border: 0.6px solid #FFFFFF;width:100%"></div>
                            <div class="info-show" style="display:flex;">
                                <div>类型：</div>
                                <div>货船</div>
                            </div>
                            <div class="info-show">
                                <div>状态：</div>
                                <div>在航</div>
                            </div>
                            <div class="info-show">
                                <div>船名：</div>
                                <div>{{shipname}}</div>
                            </div>
                            <div class="info-show">
                                <div>更新时间：</div>
                                <div>{{shiptime}}</div>
                            </div>
                            <div class="info-show">
                                <div>朝向：</div>
                                <div>{{shipdir}}</div>
                            </div>
                        </div>
                        <!-- <div style="width:140px;position:absolute;top:10px;left:10%;border:1px solid black;z-index: 2;"><p><span id="map-title">当前点击点：</span><span id="map-center"></span></p></div> -->
                         <!-- 探头显示 -->
                        <div class="tantou" v-if="showtantou" >
                            <div style="height:45px;display:flex;justify-content: space-between;color: #FFFFFF;align-items:center;padding:20px 20px;font-size:14px;">
                                <div>
                                    <span style="margin-left:10px;">{{tantouname}}</span>
                                </div>
                                <div @click="closetantou" style="cursor:pointer">
                                    <img :src="shanchu" alt="">
                                </div>
                            </div>
                            <div style="max-width:640px">
                               <video
                                id="my-video"
                                class="video-js"
                                controls
                                width="640"
                                height="264"
                                ref="tantou"
                                muted autoplay preload loop
                            >
                                <source src="http://180.184.67.201/html/video/20220201/杨庙大桥_335610.mp4" type="video/mp4" />
                                <!-- <source src="MY_VIDEO.mp4" type="video/mp4" />
                                <source src="MY_VIDEO.webm" type="video/webm" /> -->
                                <p class="vjs-no-js">
                                To view this video please enable JavaScript, and consider upgrading to a
                                web browser that
                                <a href="https://videojs.com/html5-video-support/" target="_blank"
                                    >supports HTML5 video</a
                                >
                                </p>
                            </video>
                            </div>
                        </div>
                          <div class="side-card" v-if="siderShow">
                            <div class="card-tuceng">图层配置</div>
                            <div class="card-tree" style="height:100vh">
                              <el-tree
                                      :data="menuData"
                                      show-checkbox
                                      node-key="menuId"
                                      :default-expanded-keys="[2]"
                                      :props="defaultProps"
                                      @check-change="handleCheckChange"
                                      @current-change="handleNodeClick"
                                      class="left-tree"
                                      style="height:100%;color:black;font-size:18px">
                              </el-tree>
                              <!-- <Tree :data="menuData" show-checkbox></Tree> -->
                            </div>
                          </div>
                    </div>
                </div>


             </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
/* eslint-disable */
    //图层渲染计数
    let count = 0;
    import {proOp,devOp,MAP_OPTION} from '../../src/global/config'
    import chuanboImg from '../../src/assets/image/ship.png'
    import tucengImg from '../../src/assets/image/layers.png'
    import tianqiImg from '../../src/assets/image/nongyun.png'
    import reliImg from '../../src/assets/image/relitu.png'
    import iconImg from '../../src/assets/image/side.png'
    import headImg from '../../src/assets/image/header.png'
    import newWater from '../../src/assets/image/newwater.jpg'
    import waterStyle from '../../src/assets/image/water.png'
    import guoqi from '../../src/assets/image/guoqi.png'
    import shanchu from '../../src/assets/image/shanchu.png'
    import shipcontent from '../../src/assets/image/chuanbo.png'
    import startRoute from '../../src/assets/image/startp.png'
    import left from '../../src/assets/image/left.png'
    import right from '../../src/assets/image/right.png'
    import stright from '../../src/assets/image/stright.png'
    import diaotou from '../../src/assets/image/diaotou.png'
    import end from '../../src/assets/image/end.png'
    import zhixing from '../../src/assets/image/zhixing.png'
    import qiaoImg from '../../src/assets/image/qiao.png'
    import zuozhuan from '../../src/assets/image/zuozhuan.png'
    import youzhuan from '../../src/assets/image/youzhuan.png'
    //导入请求地址
    // import {CAR_DATA,TRACKING_DATA,CAR_DATA_FIVE} from '../../src/global/urlGlobal'
    //导入图片

    import CONFIG from "@/components/common/config";

    //导入请求地址
    // import {CAR_DATA,TRACKING_DATA,CAR_DATA_FIVE} from '../../src/global/urlGlobal'
    //导入图片
    import {QIAOIMAGE,MAIMAGE,CHUANIMAGE,HANGIMAGE,JIAIMAGE,CHUANBOIMAGE,LUNCHUANIMAGE,STARTICON,ENDICON,POINTICON,TANTOU} from '../global/imgGlobal'
    //导入地图封装
    import {setCurrentMap,loadImage} from '../util/mapUtil/mapUtil'
    import {mapState,mapMutations} from 'vuex'
    import {symbolPoint,heatmapSource,channelLine,shipPoint,shipModel,channelPolygon,routePath,endPoint,startPoint,clearSource,clearLayer,depthLine,gltfModel,moveModel,hangdaoLine,tantou,gltftreeModel,difficultModel,waterPbf} from "../../src/data/mapConfig";
    import {waterJson} from "../../src/data/WATER0401";
    import {treeJson} from "../../src/data/TREE";

    const UPDATE_INTERVAL = 1000 * 60;
    var i = 0;
    var time = 0;
    var trackData = null;
    var rafId=null;
    var shipDir=0
    // import CONFIG from "@/components/common/config";
    // import filterOptions from "@/components/admin/control/getFiltersData";
    export let map=null,treePopup=null,treePopups=[],qlPopup=null,qlPopups=[],czPopup=null,czPopups=[],mtPopup=null,mtPopups=[],hbPopup=null,hbPopups=[],jydPopup=null,jydPopups=[],cbPopup=null,cbPopups=[],startMarker=[],endMarker=[];
    export default {
       data () {
            return {
                shipid:'CB0000001',
                selectship:'',//当前被选中的船只
                shipoptions:[],//所有的船的下拉框
                startp:'当前位置',
                youzhuan:youzhuan,
                zuozhuan:zuozhuan,
                isNav:false,
                left:left,
                right:right,
                stright:stright,
                zhixing:zhixing,
                qiaoImg:qiaoImg,
                direction:'2小时45分',
                showAlert:false,
                alert:{

                },
                depth:'-2.19',
                surplus_times: "00小时22分钟12秒",
                surplus_mileage: 13405,
                navinfo: {
                    "action": "左转",
                    "dir": "直行",
                    "miles": 38
                },
                total_miles: "13.4千米",
                routeList:[
                    {
                    "action": "左转",
                    "dir": "沿西南方向",
                    "miles": "直行约140米",
                    "img":left,
                    },
                    {
                    "action": "左转",
                    "dir": "沿东北方向",
                    "miles": "直行约600米",
                     "img":left,
                    },
                    {
                    "action": "左转",
                    "dir": "沿正北方向",
                    "miles": "直行约2000米",
                     "img":left,
                    },
                    {
                    "action": "右转",
                    "dir": "沿西北方向",
                    "miles": "直行约2300米",
                     "img":right,
                    },
                    {
                    "action": "掉头",
                    "dir": "沿东北方向",
                    "miles": "直行约8000米",
                     "img":diaotou,
                    },
                    {
                    "action": "到达目的地",
                    "dir": "沿西南方向",
                    "miles": "直行约500米",
                    "img":end
                    }
                ],
                startRoute:startRoute,
                showGuihua:false,
                showNav:false,
                showIndex:true,
                startInput:'长浜泊区',
                endInput:'东金港口停泊区',
                isCollapsed: false,
                chuanboImg:chuanboImg,
                diaotou:diaotou,
                shipcontent:shipcontent,
                guoqi:guoqi,
                end:end,
                shanchu:shanchu,
                tucengImg:tucengImg,
                tianqiImg:tianqiImg,
                reliImg:reliImg,
                iconImg:iconImg,
                headImg:headImg,
                waterStyle:waterStyle,
                siderShow:false,
                menuData:[],
                weipian:'全息',
                style:'3D',

                defaultProps: {
                    children: 'list',
                    label: 'name'
                },
                newWaterJson:waterJson,
                showWater:false,
                shipinfo:false,//船舶信息
                shipname:'豫信货10757',
                shiptime:'2021-11-04 10:02:34',
                shipdir:'58',
                shipinterval:null,
                alertInterval:null,
                name:'',
                path:"ws://180.184.67.201:80/hangdao-service/ws/navguide",
                socket:"",
                tantouname:null,
                tantoulink:null ,
                showtantou:false,
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
        },
        create () {

        },
        watch:{
            weipian(){
                if(this.weipian==='全息'){//矢量，进入电子地图界面
                    if(map.getLayer('symbolLayer1102')){//显示二维航标
                        map.setLayoutProperty('symbolLayer1102','visibility','visible')
                    }
                    if(map.getLayer('SINGLE_MODEL_SOURCEhangbiao1')){//隐藏三维航标
                        map.setLayoutProperty('SINGLE_MODEL_SOURCEhangbiao1','visibility','none')
                    }
                    treeJson.features.forEach((item,index)=>{
                        if(map.getLayer('SINGLETREE_MODEL_LAYER'+'tree'+item.properties.OBJECTID)){
                            map.setLayoutProperty('SINGLETREE_MODEL_LAYER'+'tree'+item.properties.OBJECTID, 'visibility', 'none')
                        }
                    })
                }else{//全量，进入卫星影像+倾斜摄影界面
                    if(map.getLayer('symbolLayer1102')){//隐藏二维航标
                        map.setLayoutProperty('symbolLayer1102','visibility','none')
                    }
                    if(map.getLayer('SINGLE_MODEL_SOURCEhangbiao1')){//显示三维航标
                        map.setLayoutProperty('SINGLE_MODEL_SOURCEhangbiao1','visibility','visible')
                    }
                    treeJson.features.forEach((item,index)=>{
                        if(map.getLayer('SINGLETREE_MODEL_LAYER'+'tree'+item.properties.OBJECTID)){
                            map.setLayoutProperty('SINGLETREE_MODEL_LAYER'+'tree'+item.properties.OBJECTID, 'visibility', 'visible')
                        }
                        else{
                            gltftreeModel(item.properties.OBJECTID,'tree',11,item.geometry.coordinates,0.003)
                        }
                    })
                }
            }
        },
        mounted(){
            let that=this;
            let path = this.$route.path;
            //console.log("路径：",path)
            // that.transformLoc()
            that.loadMap();
            that.getMenu()
            that.getshipoptions();
            that.init()
        },
        methods: {
            init: function () {//websocket初始化
                if(typeof(WebSocket) === "undefined"){
                    alert("您的浏览器不支持socket")
                }else{
                    // 实例化socket
                    this.socket = new WebSocket(this.path)
                    // 监听socket连接
                    this.socket.onopen = this.open
                    // 监听socket错误信息
                    this.socket.onerror = this.error
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage
                    this.socket.onclose = this.close
                    //console.log(this.socket.readyState)
                    //console.log('websocket连接')
                }
            },
            open: function () {//打开websocket
                //console.log(this.socket.readyState);
                if (this.socket.readyState === 1) {

                        var message = {"shipid":this.shipid, "data":"浙货远航"};
                        // writeToScreen(JSON.stringify(message));
                        this.socket.send(JSON.stringify(message));
                        console.log('进来了')
                }
                //console.log("socket连接成功")
            },
            error: function () {
                console.log("连接错误")
            },
            getMessage: function (msg) {//websocket获取信息
                // if(this.openNav){
                    //console.log(this.socket.readyState)
                    this.resdata=JSON.parse(msg.data)
                    if(this.resdata && this.resdata.event==-1){
                        clearInterval(this.alertInterval)
                        this.socket.close()
                    }
                    if(this.resdata.shipid==='CB0000001'){

                                            trackData = this.resdata.point;
                                            shipDir=this.resdata.dir
                                            //console.log('角度：',shipDir);
                                            if(this.openNav){
                                                requestAnimationFrame(this.movenewShip)
                                            }
                                            //console.log('检查:',trackData);

                    }
                    //console.log(msg)
                // }

            },
            getshipoptions(){
                let that=this
                let url=CONFIG.service.shipoptions
                that.$service.get(url).then(res=>{
                    that.shipoptions=res.data.result;
                })
            },
            daoHangInfo(){
                // debugger
                let that=this
                let distance=0;
                let url=CONFIG.service.alert
                that.$service.get(url+that.shipid+'/'+trackData[0]+'/'+trackData[1]+'/'+distance).then(res=>{
                    console.log("daoHangInfo:",res)
                    if(!!res.data.result.alertinfo) {
                        console.log("0.daoHangInfoL:",res,res.data.result.alertinfo.distance)
                    }
                                    if(res.data.code==0){
                                        that.surplus_times=res.data.result.remain_times
                                        that.surplus_mileage=res.data.result.remain_miles
                                        that.alert=res.data.result.alertinfo
                                        that.navinfo=res.data.result

                                        if(that.alert!==null){
                                            that.showAlert=true
                                        }else{
                                            that.showAlert=false
                                        }
                                        that.depth=res.data.result.depth
                                    }

                })//10s执行实时获取导航信息和报警信息
            },
            initShip(){//点击导航
                // if(map.getLayer('hangdaoline')){
                //     map.setLayoutProperty('hangdaoline','visibility','visible')
                // }else{
                //     // this.showShangxiaxing()
                // }
                map.setLayoutProperty('water','visibility','visible')
                treeJson.features.forEach((item,index)=>{
                    var str = `
                        <div style="background:#B3C0D1;padding-left:5px;padding-right:10px;font-size: 14px;">
                            <div>
                                <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${item.properties.OBJECTID}</span>
                            </div>
                        </div>
                        `;
                    if(!map.getSource('SINGLETREE_MODEL_SOURCE'+'tree'+item.properties.OBJECTID)){
                        gltftreeModel(item.properties.OBJECTID,'tree',11,item.geometry.coordinates,0.003)
                        treePopup = new minemap.Popup({
                            closeButton: false,
                            closeOnClick: false,
                            offset: [0, 0],
                        });
                        // treePopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                        // treePopups.push(treePopup)

                    }else{
                        map.setLayoutProperty('SINGLETREE_MODEL_LAYER'+'tree'+item.properties.OBJECTID, 'visibility', 'visible')
                        treePopup= new minemap.Popup({
                            closeButton: false,
                            closeOnClick: false,
                            offset: [0, 0],
                        });
                        // treePopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                        // treePopups.push(treePopup)
                    }
                })
                let that=this
                if(this.weipian==='全息'){
                    this.showWeipian()
                }
                this.showGuihua=false;
                this.showNav=false
                this.showIndex=true
                this.isNav=true;
                this.hideRoute()
                let data={
                    enname: "qiaoliang",
                    menuId:1111,
                    shape:1,
                    type:3,
                    url:"/electron/bridge/find/all",
                    name: "桥梁、桥梁区"
                }
                this.handleCheckChange(data,true,false)//打开桥
                let hddata={
                    enname: null,
                    menuId:1085,
                    shape:3,
                    type:3,
                    url:"/electron/navlane/find/all/depth",
                    name: "深水航道"
                }
                this.handleCheckChange(hddata,true,false)//打开深水面
                map.setCenter(trackData)
                map.setBearing(shipDir-185)
                map.setZoom(18)
                map.setPitch(70)
                if(!map.getSource('SINGLE_MODEL_SOURCE')){
                    moveModel([120.86404595449368,30.865624636754095],25)
                }

                this.openNav=true;//getmessage开关
                // this.getMessage()
                // 打开地图动态开关

                requestAnimationFrame(this.movenewShip)
                map.repaint = true;
                if(map.getLayer('SINGLE_MODEL_LAYER')){
                        map.setLayoutProperty('SINGLE_MODEL_LAYER','visibility','visible')
                }

                this.daoHangInfo()//右侧导航栏信息
                let url=CONFIG.service.alert
                let distance=0;
                let jjj=1;
                that.alertInterval=setInterval(()=>{
                    that.$service.get(url+trackData[0]+'/'+trackData[1]+'/'+distance).then(res=>{
                        if(!!res.data.result.alertinfo) {
                            console.log(jjj,":initShip-alertInterval:",res,res.data.result.alertinfo.distance)
                        }
                        console.log(jjj,":initShip-alertInterval:",res)
                                    jjj++;
                                    if(res.data.code==0){
                                        that.surplus_times=res.data.result.remain_times
                                        that.surplus_mileage=res.data.result.remain_miles
                                        that.alert=res.data.result.alertinfo
                                        that.navinfo=res.data.result

                                        if(that.alert!==null){
                                            that.showAlert=true
                                        }else{
                                            that.showAlert=false
                                        }
                                        that.depth=res.data.result.depth
                                        map.setCenter(trackData)
                                        map.setBearing(shipDir-185)
                                    }
                                    if(that.surplus_mileage===0){//导航结束关闭定时器
                                        clearInterval(that.alertInterval)
                                    }


                })
                },5000)

            },
            movenewShip(){
                        var car = map.getSource('SINGLE_MODEL_SOURCE');
                        // 设置新位置
                        // let rot=point
                        car.location = trackData;
                        //console.log('结果',car,car.location)
                        car.rotation= [0,-90-shipDir, 0];
                        // map.setCenter(car.location)
                        // map.setBearing(shipDir-185)
                        // 更新位置矩阵（更新了模型位置矩阵后修改才会生效）
                        car.calcBaseMatrix();
                        rafId=requestAnimationFrame(this.movenewShip);
          },

            close: function () {
                //console.log("socket已经关闭")
            },
            closeInfo(){
               this.shipinfo=false
            },
            closetantou(){
                this.showtantou=false
            },
            closetantouAll(){//消除聚合
              if (map.getLayer('tantou')){
                    map.setLayoutProperty('tantou','visibility','none')
              }
              if (map.getLayer('cluster-0')){
                  map.setLayoutProperty('cluster-0','visibility','none')
              }
              if (map.getLayer('cluster-1')){
                  map.setLayoutProperty('cluster-1','visibility','none')
              }
              if (map.getLayer('cluster-2')){
                  map.setLayoutProperty('cluster-2','visibility','none')
              }
              if (map.getLayer('cluster-count')){
                  map.setLayoutProperty('cluster-count','visibility','none')
              }
               this.closetantou();

          },
          transformLoc(){//水位84与02转换
            this.newWaterJson = gcoord.transform(waterJson, gcoord.WGS84, gcoord.GCJ02);
            //console.log(this.newWaterJson)
          },
          calcAzimuth(lng1, lat1, lng2, lat2){//计算方位角
            var dRotateAngle = Math.atan2(Math.abs(lng1 - lng2), Math.abs(lat1 - lat2));
            if (lng2 >= lng1) {
                if (lat2 >= lat1) {
                } else {
                    dRotateAngle = Math.PI - dRotateAngle;
                }
            } else {
                if (lat2 >= lat1) {
                    dRotateAngle = 2 * Math.PI - dRotateAngle;
                } else {
                    dRotateAngle = Math.PI + dRotateAngle;
                }
            }
            dRotateAngle = dRotateAngle * 180 / Math.PI;
            return dRotateAngle;
          },
          moveShip() {//船移动
                var now = Date.now();
                map.setZoom(19)
                map.setPitch(80)

                if (!time) {
                    time = now;
                }
                // 这里似乎是：时间间隔>10s，更新船位置
                // 这里不太懂，为啥
                else if (now - time > 1000){
                    i++;
                    // 这里不太懂，为啥要判断长度
                    if (i >= trackData.length) {
                        i = 0;
                    } else {
                        // 获取数据源，是不是getSource后，数据就进行了关联？？？
                        var car = map.getSource('SINGLE_MODEL_SOURCE');
                        // 设置新位置
                        car.location = trackData[i];
                        map.setCenter(car.location)
                        // 设置新旋转角度
                        car.rotation = [0,-90-this.calcAzimuth(...trackData[i], ...trackData[i - 1]), 0];
                        map.setBearing(this.calcAzimuth(...trackData[i], ...trackData[i - 1])-185)
                        // 更新位置矩阵（更新了模型位置矩阵后修改才会生效）
                        car.calcBaseMatrix();
                    }
                    time = now;
                }
                rafId=requestAnimationFrame(this.moveShip);
          },
          hideRoute(){
              if(map.getLayer('routeLayer')){
                    map.setLayoutProperty('routeLayer','visibility','none')
              }
              if(map.getLayer('startLayer')){
                    map.setLayoutProperty('startLayer','visibility','none')
              }
              if(map.getLayer('endLayer')){
                    map.setLayoutProperty('endLayer','visibility','none')
              }
          },
          getstartingpoint(e){
              let that=this
              let start=e.lngLat
                    var features = [];
                    features = map.queryRenderedFeatures([
                        [e.point.x, e.point.y],
                        [e.point.x, e.point.y]
                    ]);

                    var feature = features[0];
                    if(feature){
                       that.startInput=start.lng+','+start.lat
                    }
          },
          getendingpoint(e){
              let that=this
              let end=e.lngLat
                    var features = [];
                    features = map.queryRenderedFeatures([
                        [e.point.x, e.point.y],
                        [e.point.x, e.point.y]
                    ]);
                    var feature = features[0];
                    if(feature){
                       that.endInput=end.lng+','+end.lat
                    }
          },
          start(){
            map.off('click', this.getendingpoint);
              map.on('click', this.getstartingpoint)
          },
          zhongzhi(){
            map.off('click', this.getstartingpoint);
            map.on('click', this.getendingpoint)
          },
          showRoute(){
                let _this=this
                let url=CONFIG.service.routePath
                _this.$service.get(url+'code='+_this.shipid+'&'+'end='+_this.endInput+'&'+'start='+_this.startInput).then(res=>{
                                if(res.data.code==0){
                                    if(!map.getSource('routeSource')){
                                        let length=res.data.result.features[0].geometry.coordinates.length
                                        routePath(res.data.result)
                                        startPoint(res.data.result.features[0].geometry.coordinates[0])
                                        endPoint(res.data.result.features[0].geometry.coordinates[length - 1])
                                        map.flyTo({
                                            zoom:11.6,
                                            center:res.data.result.features[0].geometry.coordinates[0]
                                        })
                                    }

                                    _this.showNav=true;
                                }
                })
                _this.init()//开始建立websocket
          },
          shipNav(index,times){//重点导航
                let that=this
                let url=CONFIG.service.shipCode
                        that.$service.get(url+that.shipid+'/'+index+'/'+times).then(res=>{
                                    if(res.data.code==0){
                                        if(index==0){
                                            moveModel(res.data.result.point)
                                        }
                                        that.navinfo=res.data.result.navinfo
                                        that.surplus_times=res.data.result.surplus_times
                                        that.surplus_mileage=res.data.result.surplus_mileage
                                        that.alert=res.data.result.alert
                                        that.depth=res.data.result.depth
                                            index=res.data.result.idx
                                            times=res.data.result.times
                                            //动态
                                            trackData = res.data.result.tracks;
                                            rafId=requestAnimationFrame(that.moveShip);
                                            // 打开地图动态开关
                                            map.repaint = true;
                                            if(map.getLayer('SINGLE_MODEL_LAYER')){
                                                map.setLayoutProperty('SINGLE_MODEL_LAYER','visibility','visible')
                                            }
                                    }
                        })

          },
          openHangbiao(){
                let data={
                    enname: "hangbiao",
                    menuId:1102,
                    shape:1,
                    type:3,
                    url:"/electron/navmark/find/all",
                    name: "航标"
                }
                this.handleCheckChange(data,true,false)//打开航标
                map.setLayoutProperty('symbolLayer1102','visibility','visible')
          },
          showShangxiaxing(){
             let url=CONFIG.service.double
             this.$service.get(url).then(res=>{
                 if(res.data.code==0){
                     hangdaoLine(res.data.result)
                    //  map.getSource('hangdaoline').setData(res.data.result)
                 }
             })
          },
          showShipModel(){//船舶开始
                if(map.getLayer('hangdaoline')){
                    map.setLayoutProperty('hangdaoline','visibility','visible')
                }else{
                    this.showShangxiaxing()
                }
                if(this.weipian==='全息'){
                    this.showWeipian()
                }
                this.showGuihua=false;
                this.showNav=false
                this.showIndex=true
                this.isNav=true;
                this.hideRoute()
                let data={
                    enname: "qiaoliang",
                    menuId:1111,
                    shape:1,
                    type:3,
                    url:"/electron/bridge/find/all",
                    name: "桥梁、桥梁区"
                }
                this.handleCheckChange(data,true,false)//打开桥
                this.shipNav(0,0)//导航
                // that.indexShip()//刚开始
                let index=100
                let times=10
                let that=this
                let url=CONFIG.service.shipCode
                that.shipinterval=setInterval(()=>{
                        that.$service.get(url+index+'/'+times).then(res=>{
                                    //console.log(res)
                                    if(res.data.code==0){
                                        if(index==0){
                                            moveModel(res.data.result.point)
                                        }
                                        that.navinfo=res.data.result.navinfo
                                        that.surplus_times=res.data.result.surplus_times
                                        that.surplus_mileage=res.data.result.surplus_mileage

                                        that.alert=res.data.result.alert
                                        if(that.alert && that.alert.info){
                                            that.showAlert=true
                                        }else{
                                            that.showAlert=false
                                        }
                                        that.depth=res.data.result.depth
                                            index=res.data.result.idx
                                            times=res.data.result.times
                                            //动态
                                            trackData = res.data.result.tracks;
                                            rafId=requestAnimationFrame(that.moveShip);
                                            // 打开地图动态开关
                                            map.repaint = true;
                                            if(map.getLayer('SINGLE_MODEL_LAYER')){
                                                map.setLayoutProperty('SINGLE_MODEL_LAYER','visibility','visible')
                                            }

                                    }
                        })
                },10000)
          },
          hideModel(){//不需要展示船舶导航了
             map.flyTo({
                    center:[120.86705699313787, 30.87248285761019],
                    pitch:0,
                    zoom:14,
                    bearing:0,
                    duration:5000,
                    speed:0.8,
                    curve: 1,
             })
             let data={
                    enname: "qiaoliang",
                    menuId:1111,
                    shape:1,
                    type:3,
                    url:"/electron/bridge/find/all",
                    name: "桥梁、桥梁区"
             }

             cancelAnimationFrame(rafId)
             clearInterval(this.alertInterval)
             if(this.socket.readyState===1){//socket已建立
               this.socket.close()
             }
             this.isNav=false;//右侧导航栏信息
             this.handleCheckChange(data,false,false)//关闭桥
             let hddata={
                    enname: null,
                    menuId:1085,
                    shape:3,
                    type:3,
                    url:"/electron/navlane/find/all/depth",
                    name: "深水航道"
                }
             this.handleCheckChange(hddata,false,false)//关闭深水面
             map.repaint = false;
            //  clearInterval(this.shipinterval)

             if(map.getLayer('SINGLE_MODEL_LAYER')){
                map.setLayoutProperty('SINGLE_MODEL_LAYER','visibility','none')
             }
             if(map.getLayer('hangdaoline')){
                map.setLayoutProperty('hangdaoline','visibility','none')
             }
             if(map.getLayer('symbolhangdaoLayer')){
                map.setLayoutProperty('symbolhangdaoLayer','visibility','none')
             }

             this.isNav=false
             this.showGuihua=false
             this.showIndex=true
          },
          hideReli(){//不需要热力图了
            // clearInterval(this.shipinterval)
            if(map.getLayer('heatmapLayer')){
                map.setLayoutProperty('heatmapLayer','visibility','none')
            }
            map.flyTo({
                zoom:14,
                pitch:0,
                center:[120.86705699313787, 30.87248285761019],
            })
            cancelAnimationFrame(rafId)
            clearInterval(this.alertInterval)
            if(this.socket.readyState===1){
               this.socket.close()
            }
            this.isNav=false;//右侧导航栏信息
          },
          showReli(){

              //console.log('热力进来')
              const loading = this.$loading({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
                let url=CONFIG.service.hotmap
                    this.$service.get(url).then(res=>{
                                    //console.log(res)
                                    if(res && res.data &&res.data.code==0){
                                        map.getSource("heatmapSource").setData(res.data.result)
                                        map.setLayoutProperty('heatmapLayer','visibility','visible')
                                        loading.close()
                                    }else{
                                        loading.close()
                                        this.$message('加载失败,接口无返回水深热力图');
                                    }
                    })
          },
          cancelWaterPbf(){
              if(map.getLayer('waterNmuber')){
                  map.setLayoutProperty('waterNumber','visibility','none')
              }
              if(map.getLayer('cluster-waterNumber')){
                  map.setLayoutProperty('cluster-waterNumber','visibility','none')
              }
          },
          selectMenu(name){
            //console.log(name)
            if(name==='3-1'){
                this.cancelWaterPbf()//取消waterPbf水位
                let that=this
                let urltantou=CONFIG.service.tantou
                    that.$service.get(urltantou).then(res=>{
                                //console.log(res)
                                if(res.data.code==0){
                                    if(!map.getSource('tantou')){
                                                    //shipModel(index,item.properties.shipdir,item.geometry.coordinates)
                                                    tantou(res.data.result)
                                    }else{
                                        map.setLayoutProperty('tantou','visibility','visible')
                                        map.setLayoutProperty('cluster-0','visibility','visible')
                                        map.setLayoutProperty('cluster-1','visibility','visible')
                                        map.setLayoutProperty('cluster-2','visibility','visible')
                                        map.setLayoutProperty('cluster-count','visibility','visible')
                                    }
                                }
                })

                map.on('click','tantou',function(e){
                    let player = that.$refs.tantou
                    var msg=e.features[0].properties
                    if(msg && e.features[0].layer.id=="tantou"){//船舶点击
                    //console.log(player)
                    that.showtantou=true
                    that.tantouname=msg.name
                    that.tantoulink=msg.link

                    player.src =  "http://180.184.67.201"+msg.link
                    player.play()

                    }


                })
            }
            if(name==='3-2'){//水位
                if(!map.getLayer('cluster-waterNumber')){
                    waterPbf()
                }
                if(map.getLayer('cluster-waterNumber')){
                    map.setLayoutProperty('cluster-waterNumber','visibility','visible')
                }
                this.weipian='全息'
                this.showWeipian()
                this.closetantouAll()
            }else if(name==='4'){//船舶导航
                  this.weipian='全息'
                  this.showWeipian()
                  this.closetantouAll()
                  this.cancelWaterPbf()//取消waterPbf水位
                  this.hideReli()
                    if(this.weipian==='矢量'){
                        this.showWeipian()
                    }
                    this.siderShow=false
                  this.name='chuanbonav'
                    // this.showShipModel()
                  this.showWater=false
                  this.showIndex=false
                  this.showGuihua=true//应为true
                //   this.showIndex=false//关闭左侧
                //   this.showWeipian()//全息景
                    if(map.getLayer('SINGLE_MODEL_LAYER')){
                      map.setLayoutProperty('SINGLE_MODEL_LAYER','visibility','visible')
                    }
                  if(map.getSource('heatmapSource')){
                     map.getSource("heatmapSource").setData(null)
                     map.setLayoutProperty('heatmapLayer','visibility','none')
                     map.setLayoutProperty('water','visibility','none')
                  }
            }else if(name==='1'){//首页
                this.closetantouAll()
                this.cancelWaterPbf()//取消waterPbf水位
                this.hideModel()
                this.hideReli()
                this.hideRoute()
                this.name=''
                if(this.weipian==='矢量'){
                    this.showWeipian()
                }
                this.showWater=false
                this.showGuihua=false
                if(map.getSource('heatmapSource')){
                     map.getSource("heatmapSource").setData(null)
                     map.setLayoutProperty('heatmapLayer','visibility','none')
                     map.setLayoutProperty('water','visibility','none')
                }
            }else{//其他场景
                this.closetantouAll()
                this.cancelWaterPbf()//取消waterPbf水位
                this.hideRoute()
                this.hideModel()
                this.hideReli()
                this.name=''
                this.showWater=false
                this.showGuihua=false
            }
          },
          showRelitu(){
                let that=this
                this.closetantouAll()
                this.name=''
                this.siderShow=false
                setTimeout(() => {
                        map.setLayoutProperty('water','visibility','visible')
                        this.showReli()
                },4000)

                this.hideRoute()
                this.hideModel()
                this.showWater=true
                heatmapSource()



                if(this.weipian==='全息'){
                    this.showWeipian()
                }

                map.flyTo({
                    center:[120.86695859009251, 30.87255032806194],
                    pitch:0,
                    zoom:17,
                    bearing:18,
                    duration:5000,
                    speed:0.8,
                    curve: 1,
                })
          },
            collapsedSider () {
                this.siderShow=!this.siderShow
            },
            // 获取左侧图层配置目录
            getMenu(){
                 let _this=this;
                 let url=CONFIG.service.getMenu
                 _this.$service.get(url).then(res=>{
                    //  debugger
                                if(res.data.code==0){
                                   _this.menuData=res.data.result
                                }
                 })

            },
            // 树节点checkbox点击事件
            handleCheckChange(data, checked, indeterminate) {
                let _this=this
                if(checked&&data.type===3){//选中的子节点
                    if(data.url!==null){
                            let root=CONFIG.service.root
                            _this.$service.get(root+data.url).then(res=>{
                                _this.line=res
                                if(res.data.code==0){
                                    if(data.shape===1){//画点
                                        if(data.enname=='hangbiao'){//加载矢量2d航标图片
                                            // if(_this.weipian==='全息'){
                                                symbolPoint(data.menuId,res.data.result,data.enname)
                                                map.setLayoutProperty('symbolLayer1102','visibility','visible')
                                                if(map.getLayer('SINGLE_MODEL_SOURCEhangbiao1')){
                                                    map.setLayoutProperty('SINGLE_MODEL_SOURCEhangbiao1','visibility','none')
                                                }
                                            // }else if(_this.weipian==='矢量'){//加载模型
                                                // if(map.getLayer('symbolLayer1102')){
                                                //     map.setLayoutProperty('symbolLayer1102','visibility','none')
                                                // }

                                                res.data.result.features.forEach((item,index)=>{
                                                var str = `
                                                    <div style="background:#B3C0D1;padding-left:5px;padding-right:10px;font-size: 14px;">
                                                        <div>
                                                            <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${item.properties.name+data.enname+item.properties.id}</span>
                                                        </div>
                                                    </div>
                                                    `;
                                                    if(!map.getSource('SINGLE_MODEL_SOURCE'+data.enname+item.properties.id)){
                                                        // debugger
                                                        gltfModel(item.properties.id,data.enname,item.properties.rotation,item.geometry.coordinates,item.properties.scale)
                                                        hbPopup= new minemap.Popup({
                                                                    closeButton: false,
                                                                    closeOnClick: false,
                                                                    offset: [0, 0],
                                                                });
                                                                hbPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                                hbPopups.push(hbPopup)
                                                                if(map.getLayer('SINGLE_MODEL_SOURCEhangbiao1')){
                                                                    map.setLayoutProperty('SINGLE_MODEL_SOURCEhangbiao1','visibility','none')
                                                                }
                                                    }
                                                })

                                            // }
                                            map.flyTo({
                                                    center:res.data.result.features[0].geometry.coordinates
                                            })

                                        }else{
                                            res.data.result.features.forEach((item,index)=>{
                                                var str = `
                                                    <div style="background:#B3C0D1;padding-left:5px;padding-right:10px;font-size: 14px;">
                                                        <div>
                                                            <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${item.properties.name}</span>
                                                        </div>
                                                    </div>
                                                    `;
                                                if(!map.getSource('SINGLE_MODEL_SOURCE'+data.enname+item.properties.id)){
                                                    // debugger
                                                    gltfModel(item.properties.id,data.enname,item.properties.rotation,item.geometry.coordinates,item.properties.scale)
                                                    switch (data.enname){
                                                        case 'qiaoliang':
                                                            qlPopup = new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            qlPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            qlPopups.push(qlPopup)
                                                            break
                                                        case 'matou':
                                                            mtPopup= new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            mtPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            mtPopups.push(mtPopup)
                                                            break
                                                        case 'chuanzha':
                                                            czPopup= new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            czPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            czPopups.push(czPopup)
                                                            break
                                                        case 'jiayoudian':
                                                            jydPopup= new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            jydPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            jydPopups.push(jydPopup)
                                                            break
                                                        default:
                                                            break

                                                    }

                                                }else{
                                                    map.setLayoutProperty('SINGLE_MODEL_LAYER'+data.enname+item.properties.id, 'visibility', 'visible')
                                                    switch (data.enname){
                                                        case 'qiaoliang':
                                                            qlPopup = new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            qlPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            qlPopups.push(qlPopup)
                                                            break
                                                        case 'matou':
                                                            mtPopup= new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            mtPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            mtPopups.push(mtPopup)
                                                            break
                                                        case 'chuanzha':
                                                            czPopup= new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            czPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            czPopups.push(czPopup)
                                                            break
                                                        case 'jiayoudian':
                                                            jydPopup= new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            jydPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            jydPopups.push(jydPopup)
                                                            break
                                                        case 'hangbiao':
                                                            hbPopup= new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            hbPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            hbPopups.push(hbPopup)
                                                            break
                                                        default:
                                                            break

                                                    }
                                                }
                                            })
                                            // gltfModel(id,type,rotation,loction)

                                            // map.flyTo({
                                            //     center:res.data.result.features[0].geometry.coordinates
                                            // })//3.28注释

                                        }
                                        // if(data.name==="桥梁、桥梁区"){//测试



                                    }else if(data.shape===2){//画线
                                        if(data.name=='等深线'){
                                            if(!map.getSource('depthSource'+data.menuId)){
                                               depthLine(data.menuId,res.data.result)
                                               map.flyTo({
                                                    center: res.data.result.features[0].geometry.coordinates[0][length]
                                               })
                                            }else{
                                               map.setLayoutProperty('depthLayer'+data.menuId, 'visibility', 'visible')
                                            }
                                        }else if(data.name=='航道'){
                                            if(!map.getSource('channelSource0')&&!map.getSource('channelSource1')&&!map.getSource('channelSource2')){
                                                res.data.result.features.forEach((item,index)=>{
                                                    let arr=[];
                                                    arr.push(item)
                                                    let json={
                                                        type: "FeatureCollection",
                                                        features: arr
                                                    }
                                                    channelLine(index,json)
                                                })

                                                map.flyTo({
                                                            center: [120.827018,30.829385]
                                                })
                                            }else{
                                                //console.log('检查这里：',res.data.result.features)
                                                res.data.result.features.forEach((item,index)=>{
                                                    map.setLayoutProperty('channelLayer'+index, 'visibility', 'visible')
                                                })
                                            }
                                        }

                                    }else{//画面
                                       if(!map.getSource('channelPSource'+data.menuId)){
                                            channelPolygon(data.menuId,res.data.result)
                                            map.flyTo({
                                                        center:[120.826215,30.825552]
                                            })
                                       }else{
                                           map.setLayoutProperty('channelPLayer'+data.menuId, 'visibility', 'visible')
                                       }
                                    }

                                }
                            })
                    }
                }else{
                    if(data.shape===1){//画点
                            if(map.getLayer('symbolLayer'+data.menuId)){
                                map.setLayoutProperty('symbolLayer'+data.menuId, 'visibility', 'none')
                            }
                            if(_this.line!==undefined){
                                _this.line.data.result.features.forEach((item,index)=>{
                                    if(map.getLayer('SINGLE_MODEL_LAYER'+data.enname+item.properties.id)){
                                    map.setLayoutProperty('SINGLE_MODEL_LAYER'+data.enname+item.properties.id, 'visibility', 'none')
                                    }
                                })
                            }
                            switch (data.enname){
                                                        case 'qiaoliang':
                                                            if(qlPopups.length > 0){
                                                                qlPopups.forEach((item,index)=>{
                                                                    item.remove()
                                                                })
                                                                qlPopup=null;
                                                            }
                                                            break
                                                        case 'matou':
                                                            if(mtPopups.length > 0){
                                                                mtPopups.forEach((item,index)=>{
                                                                    item.remove()
                                                                })
                                                                mtPopup=null;
                                                            }
                                                            break
                                                        case 'chuanzha':
                                                            if(czPopups.length > 0){
                                                                czPopups.forEach((item,index)=>{
                                                                    item.remove()
                                                                })
                                                                czPopup=null;
                                                            }
                                                            break
                                                        case 'jiayoudian':
                                                            if(jydPopups.length > 0){
                                                                jydPopups.forEach((item,index)=>{
                                                                    item.remove()
                                                                })
                                                                jydPopup=null;
                                                            }
                                                            break
                                                        case 'hangbiao':
                                                            if(hbPopups.length > 0){
                                                                hbPopups.forEach((item,index)=>{
                                                                    item.remove()
                                                                })
                                                                hbPopup=null;
                                                            }
                                                            break
                                                        default:
                                                            break
                            }




                    }else if(data.shape===2){//画线
                        if(data.name=='等深线'){
                            if(map.getLayer('depthLayer'+data.menuId)){
                                map.setLayoutProperty('depthLayer'+data.menuId, 'visibility', 'none')
                            }
                        }else{
                            _this.line.data.result.features.forEach((item,index)=>{
                                if(map.getLayer('channelLayer'+index)){
                                  map.setLayoutProperty('channelLayer'+index, 'visibility', 'none')
                                }
                            })
                        }

                    }else{
                        if(map.getLayer('channelPLayer'+data.menuId)){
                                map.setLayoutProperty('channelPLayer'+data.menuId, 'visibility', 'none')
                            }
                    }

                }
            },
            //当前树节点点击事件
            handleNodeClick(data) {
                //console.log(data);
            },
            setJiaodu(){
               if(this.style==='3D'){
                   this.style='2D'
                   map.setPitch(0)
               }else{
                   this.style='3D'
                   map.setPitch(55)
               }
            },
            showWeipian(){
                if(this.weipian==='全息'){//全息下看模型
                //显示卫星影像+倾斜摄影
                    this.weipian='矢量'
                    map.setLayoutProperty('IMAGERY', 'visibility', 'visible')
                    map.setLayoutProperty('serve', 'visibility', 'visible')
                    let arr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

                    if(this.name === 'chuanbonav'){
                       arr.forEach((item,index) =>{
                        map.setLayoutProperty('chuanboModel'+index, 'visibility', 'none')
                       })
                    }else{
                       arr.forEach((item,index) =>{
                        map.setLayoutProperty('chuanboModel'+index, 'visibility', 'visible')
                       })
                    }
                    if(map.getLayer('SINGLE_MODEL_SOURCEhangbiao1')){
                        map.setLayoutProperty('SINGLE_MODEL_SOURCEhangbiao1', 'visibility', 'visible')
                    }
                    //点位
                    if(map.getLayer('symbolLayer1102')){
                        map.setLayoutProperty('symbolLayer1102','visibility','none')
                    }
                    map.setLayoutProperty('shipPoint','visibility','none')
                }else{
                    //显示电子地图
                    this.weipian='全息'
                    map.setLayoutProperty('IMAGERY', 'visibility', 'none')
                    map.setLayoutProperty('serve', 'visibility', 'none')
                    let arr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
                    arr.forEach((item,index) =>{
                        map.setLayoutProperty('chuanboModel'+index, 'visibility', 'none')
                    })
                    if(map.getLayer('SINGLE_MODEL_SOURCEhangbiao1')){
                        map.setLayoutProperty('SINGLE_MODEL_SOURCEhangbiao1', 'visibility', 'none')
                    }
                    //点位
                    if(map.getLayer('symbolLayer1102')){
                        map.setLayoutProperty('symbolLayer1102','visibility','visible')
                    }
                    map.setLayoutProperty('shipPoint','visibility','visible')
                }
            },
            loadMap(){
                let that=this;
                let {domainUrl,dataDomainUrl,spriteUrl,serviceUrl,solution,styleUrl,key} = devOp;//上海环境
                minemap.domainUrl = domainUrl;
                minemap.dataDomainUrl = dataDomainUrl;
                minemap.spriteUrl = spriteUrl;
                minemap.serviceUrl = serviceUrl;
                minemap.key = key;
                minemap.solution = solution;

                map = new minemap.Map({
                    container: "mapContent",
                    style:styleUrl,
                    // style: 'https://mineservice.minedata.cn/service/solu/style/id/12877',
                    // style: 'http://10.172.19.12:21009/service/solu/style/id/222514', /*底图样式*/
                    center: MAP_OPTION.center, /*地图中心点*/
                    zoom: MAP_OPTION.zoom, /*地图默认缩放等级*/
                    pitch: MAP_OPTION.pitch, /*地图俯仰角度*/
                    maxZoom: 23,
                    minZoom: 3,
                    // dragRotate:false,
                    // pitch:55,
                    zoom:14,
                    // projection: 'MERCATOR',
                    // 控制logo显示
                    logoControl: false,
                    projection: 'MERCATOR'//3d
                });
                setCurrentMap(map);
                // map.addControl(new HelloWorldControl(), "bottom-right");
                map.addControl(new minemap.Navigation(), 'bottom-right');
    // map.addControl(new minemap.Fullscreen(), 'top-right');
                map.addControl(new minemap.Attribution(), 'bottom-left');
                map.addControl(new minemap.Scale(), 'top-right');
                map.on('click', function(e) {
                    let p=e.lngLat
                    document.getElementById('lnglat').innerText=p.toArray()
                    var features = [];
                    features = map.queryRenderedFeatures([
                        [e.point.x, e.point.y],
                        [e.point.x, e.point.y]
                    ]);

                    var feature = features[0];
                    if(feature && feature.layer.id=="shipPoint"){//船舶点击
                           that.shipinfo=true
                            that.shipname=feature.properties.name
                            that.shiptime=feature.properties.time
                            that.shipdir=feature.properties.shipdir

                    }
                })
                map.on("load",()=>{
                    loadImage(TANTOU,"tantou")
                    loadImage(QIAOIMAGE,"qiaoliang");
                    loadImage(MAIMAGE,"matou")
                    loadImage(CHUANIMAGE,"chuanzha")
                    loadImage(HANGIMAGE,"hangbiao")
                    loadImage(JIAIMAGE,"jiayoudian")
                    loadImage(CHUANBOIMAGE,"chuanbo");
                    loadImage(LUNCHUANIMAGE,"lunchuan");
                    loadImage(STARTICON,"start");
                    loadImage(ENDICON,"end");
                    loadImage(POINTICON,"point");

                    map.addSource('sphere-image-globe', {
                        url: "https://minedata.cn/minemapapi/v3.3.0/assets/earth.jpg",
                        radius: minemap.R,
                        type: 'sphere-image',
                        renderInner: false,
                        gridSamples: 9,
                        debug: false,
                        renderAtmosphere: true
                    });
                    map.addSource('sphere-image-skybox', {
                        url: "https://minedata.cn/minemapapi/v3.3.0/assets/sky13m.jpg",
                        dayTextureUrl: "https://minedata.cn/minemapapi/v3.3.0/assets/back.jpg",
                        radius: 1,
                        type: 'sphere-image',
                        renderInner: true,
                        gridSamples: 9,
                        debug: false,
                    });
                    /*添加栅格图*/
                    map.addSource("IMAGERY_SOURCE", {
                        "type": "raster",//数据源类型：栅格数据源
                        // "tiles": ["//mt0.google.cn/maps/vt?lyrs=y&hl=zh-CN&gl=CN&&x={x}&y={y}&z={z}&scale=2",
                        // "//mt1.google.cn/maps/vt?lyrs=y&hl=zh-CN&gl=CN&&x={x}&y={y}&z={z}&scale=2",
                        // "//mt2.google.cn/maps/vt?lyrs=y&hl=zh-CN&gl=CN&&x={x}&y={y}&z={z}&scale=2",
                        // "//mt3.google.cn/maps/vt?lyrs=y&hl=zh-CN&gl=CN&&x={x}&y={y}&z={z}&scale=2"], //瓦片服务地址,
                        // "tiles": ["http://datahive-ni.minedata.cn:10000/service/map/satellite?z={z}&x={x}&y={y}"], //瓦片服务地址
                        "tiles": ["https://smap.minedata.cn/service/map/satellite?z={z}&x={x}&y={y}"], //瓦片服务地址
                        "tileSize": 256,//瓦片尺寸
                    });

                    map.addLayer({
                        "id": "IMAGERY",
                        "type": "raster", //图层类型为"raster"
                        "source": "IMAGERY_SOURCE",
                        "minzoom": 1,
                        "maxzoom": 23,
                        "layout":{
                          "visibility":'none'
                        }
                        // "depth-test": true, // 是否开启栅格图底面遮挡
                    });
                        // 适配地图
                        // that.carTrack.fitMap(that.tracks);
                    //船的轨迹线
                    map.addSource("allLines", { type: "geojson", data: null });//船的轨迹线
                    map.addLayer({
                        id: "allLines",
                        type: "line",
                        source: "allLines",
                        layout: {
                        "line-join": "round",
                        "line-cap": "round"
                        },
                        paint: {
                        "line-color": 'green',
                        "line-width": 5
                        }
                    });
                    setTimeout(()=>{

                      map.addSource("water", {
                        type:"geojson",
                        data: that.newWaterJson
                      })

                      map.addLayer({
                          "id": "water",
                          "type": "fill",
                          "source": "water",
                          "layout": {
                              "visibility": "none",
                              "dynamic": {
                                  "type": "interval",
                                  "stops": [
                                      [14, "none"],
                                      [15, "water"]
                                  ]
                              }
                          },
                          "paint": {
                              "fill-dynamic-image-url": newWater,
                              "fill-color": "#868688",
                              // "fill-color": "#40c0f5",
                              "fill-opacity": 1.0
                              // "fill-water": "water",
                              // "fill-color": "#A6C2DE",
                              // "fill-opacity": 1,
                              // "fill-outline-color": "#A6C2DE"
                          },
                          "minzoom": 3,
                          "maxzoom": 24
                      });

                    },5000)
                    //水面

                    //船（车）
                    // difficultModel()
                    let url=CONFIG.service.getShipsLocation
                    that.$service.get(url).then(res=>{
                                //console.log(res)
                                if(res.data.code==0){
                                    if(!map.getSource('shipPoint')){
                                                    //shipModel(index,item.properties.shipdir,item.geometry.coordinates)
                                                    shipPoint(res.data.result)
                                    }
                                    res.data.result.features.forEach((item,index)=>{
                                                 if(!map.getSource('chuanboModel')+index){
                                                    shipModel(index,item.properties.shipdir,item.geometry.coordinates)

                                    //                 shipPoint(res.data.result)
                                                }
                                    })
                                }
                    })
                    //初始化时就加载树数据
                    treeJson.features.forEach((item,index)=>{
                        gltftreeModel(item.properties.OBJECTID,'tree',11,item.geometry.coordinates,0.003)
                        if(map.getLayer('SINGLETREE_MODEL_LAYER'+'tree'+item.properties.OBJECTID)){
                            map.setLayoutProperty('SINGLETREE_MODEL_LAYER'+'tree'+item.properties.OBJECTID, 'visibility', 'none')
                        }
                    })
                    window.minemapCDN = 'http://112.65.187.90:65016/minemap-CDN'
                    // window.minemapCDN = 'http://192.168.152.123//minemapapi/minemap-CDN'
                    map.addSource("serve", {
                            type: "3d-tiles",
                            minzoom: 1,
                            maximumMemoryUsage: 128,//控制内存，最好不要过大
                            maximumScreenSpaceError: 16, //几何误差
                            translation: [0, 0, 0],
                              "log": false,
                            "useMipmap": false, // 20210923 不开启useMipmap，3d-tiles 默认为 false
                            // throttleRequests: true,
                            "throttleRequests":true,//控制每次请求数量
                            "skipLevelOfDetail":true, //是否层级跳跃
                            "loadSiblings":true, //是否加载邻近兄弟节点
                            "skipLevels":1, //跳跃层级
                            "maxRequests":6, // 最大请求数
                                    // url: 'http://180.184.67.201/html/08273dtiles/tileset.json'
                            "url":'http://180.184.67.201/html/3dtiles-20220325/tileset.json'
                    })

                    map.addLayer({
                            "type": "3d-tiles",
                            "id": "serve",
                            "source": "serve",
                            "minzoom": 1,
                            "layout":{
                              "visibility":'none'
                            }
                    });
                });
            }
        },
        destroyed() {
            // this.socket.onclose = this.close
        }

    }
</script>
<style scoped>
.fangxiang{
    width: 92.5px;
    height: 95px;
    opacity: 0.19;
    background: #B7C0CE;
}
.qiao-cont{
    font-size: 14px;
    color: #FFFFFF;
    text-align: left;
    font-weight: 500;
    margin: 15px 0px;
}
.ship-cont{
    font-size: 14px;
    color: #FFFFFF;
    text-align: left;
    font-weight: 500;
    margin: 15px 20px;
}
.ship-info{
    width: 379px;
    /* height: 217px; */
    background: #242E42;
    position: absolute;
    right: 0.14rem;
    top: 0.5rem;
    z-index: 5;
}
.changeWidth{
    width:120%;
}
.route-cont{
   overflow-y: scroll;
   height:500px;
}
.route-cont::-webkit-scrollbar {
    width: 6px;
}

.route-cont::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background: #55617B;
}

.route-cont::-webkit-scrollbar-track {
    border-radius: 0px;
}
.cont-item{
    align-items: center;
    padding: 20px 0;
    border-bottom:0.88px solid  #2D3951
}
.item-img{
    color: #EEEFF1;
    text-align: left;
    line-height: 16px;
    font-weight: 600;
    margin-right:20px;
}
.item-start{
     text-align: left;
     font-size:16px;
    /* line-height: 16px; */
    font-weight: 600;
    /* margin-right:20px; */
}
#lnglat{
    min-width:250px;
    height:20px;
    border:1px solid white;
    position:absolute;
    left:10px;bottom:50px;
    z-index:1;
    color:white
}
.item-text{
    text-align: left;
    /* line-height: 14px; */
    font-weight: 400;
    font-size:14px;
    /* margin-right:20px; */
}
.route-info{
    width: 368px;
    background: #242E42;
    padding:0 30px;
    color: #EEEFF1;
    font-size: 14px;
}
.sinfo-time{
    font-size: 14px;
    color: #EEEFF1;
    text-align: center;
    font-weight: 400;
}
.sinfo-title{
    font-size: 16px;
    color: #EEEFF1;
    text-align: center;
    font-weight: 600;
    padding-top:20px;
}
.route-sinfo{
    /* opacity: 0.08; */
    background: rgb(46,57,80);
    width:100%;
    height: 89px;
}
.route-title{
    width:368px;
    padding:0.2rem 0;
    height: 16px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #EEEFF1;
    text-align: center;
    line-height: 16px;
    font-weight: 600;
    margin-bottom: 0.2rem;
}
.nav-input{
   padding:0.2rem 0;color: #EEEFF1;
   align-items: baseline;
   display:flex;
   margin-right: -1rem;
}
.input-title{
    margin-right:17px;
    color: #EEEFF1;
}
.nav-title{
    font-size: 16px;
    color: #EEEFF1;
    text-align: left;
    line-height: 16px;
    font-weight: 400;
    padding-left:10px;
}
.nav-icon{
    width: 4px;
    height: 16px;
    background: #0077FF;
}
.shipinfo{
    width: 379px;
    height: 551px;
    background: #242E42;
    position: absolute;
    /* bottom: 2.8rem; */
    right: 0.14rem;
    z-index: 2;
    top:0.5rem;
    color: #FFFFFF;font-size:14px;
}
.info-show{
    display:flex;
    font-size:14px;
    color: #FFFFFF;
    padding:10px 20px
}
.waterstyle{
    /* width: 0.6265rem;
    height: 0.6265rem; */
    /* background: #242E42;
    box-shadow: 0 0 0.1rem 0 rgb(18 25 35 / 70%); */
    /* border-radius: 0.02rem; */
    /* line-height: 0.6265rem; */
    position: absolute;
    bottom: 2.8rem;
    right: 0.14rem;
    z-index: 2;
    border-radius: 0.05rem;
    color: #B7C0CE;
    cursor: pointer;
    text-align: center;
}
.card-tuceng{
    height: 65px;
    font-size: 16px;
    color: #EEEFF1;
    line-height: 65px;
    margin-left:10px;
}
.threestyle{
    width: 62.65px;
    height: 62.65px;
    background: #242E42;
    box-shadow: 0px 0px 10px 0px rgba(18,25,35,0.7);
    border-radius: 2px;
    line-height: 62.65px;
    position: absolute;
    bottom: 1.4rem;
    right: 0.15rem;
    z-index: 2;
    border-radius: 5px;
    color: #B7C0CE;
    cursor: pointer;
    text-align: center;
}
.weipian{
  width: 62.65px;
  height: 62.65px;
  background: #242E42;
  box-shadow: 0px 0px 10px 0px rgba(18,25,35,0.7);
  border-radius: 2px;
    /* width: 40px;
    height: 40px; */
    line-height: 62.65px;
    position: absolute;
    bottom: 2.1rem;
    right: 0.15rem;
    z-index: 2;
    color: #B7C0CE;
    cursor: pointer;
    text-align: center;
}
.card-tree{
  height:calc(100vh -65px);
  color: #EEEFF1;
}
.left-tree{
            height:100vh;
            /* overflow-y: scroll; */
            background-color:#20293C;
            color: #EEEFF1;
}
.el-aside::-webkit-scrollbar {
    width: 2px;
}

.el-aside::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background: rgb(0,119,255)
}

.el-aside::-webkit-scrollbar-track {
    border-radius: 0px;
}
.menu-list{
  text-align: center;
  height: 80px;
  cursor: pointer;
}
.menu-img{
  /* margin-left:25px; */
}
.menu-title{
  /* margin-left:0.1rem;
   */
   text-align: center;
  color:#E8E9EA
}
.menu-icon{
  height: 80px;
  line-height: 80px;
  text-align:center;
  cursor: pointer;
}
.side-card{
  position: absolute;
  top:0;
  left:0;
  width:284px;
  height:100%;
  background: #242E42;
  z-index:2
}
#mapContent {
          width: 100%;
          height: calc(100vh - 88px);
          z-index: 1;
          position: relative;
}
 .rotate-icon{
        transform: rotate(-90deg);
        color:white
    }
    .menu-icon{
        transition: all .3s;
        color:white
    }
.header-input{
  background: #B7C0CE;
  box-shadow: 0px 0px 10px 0px rgba(18,25,35,0.7);
  border-radius: 2px;
  margin-top:26px;
}
.person-right{
    padding-top: 35px;
    margin-left: 41px;
}
.person{
    /* width: 98px; */
    height: 14px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #EEEFF1;
    text-align: right;
    line-height: 0.24rem;
    font-weight: 400;
}
.menu-item{
  font-size:18px;
  color: #E8E9EA;
  height:100%;
  width:128px;
  text-align:center;
  /* padding-top:15px; */
}
 .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
.layout{
    border: 1px solid #d7dde4;
    background:  #242E42;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    position: relative;
    top: 30%;
    left: 0.15rem;
}

.layout-nav{
    /* width: 8.2rem; */
    height:100%;
    /* margin: 0 auto; */
    margin-left: 4.3rem;
    font-size:20px;
    padding-top:15px;
    color:white
}
.layout-title{
  color:white;
  font-size:22px;
  margin-left:40px;
  margin-top:7%
}
.tantou{
    width: 640px;
    height: 400px;
    background: #242E42;
    position: absolute;
    /* bottom: 2.8rem; */
    right: 0.14rem;
    z-index: 2;
    top:0.5rem;
    color: #FFFFFF;font-size:14px;
}
</style>
