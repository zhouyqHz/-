<template>
    <!-- <div class="container"> -->
        <el-container style="height:100%">
            <el-header class="container-header">
                <div style="font-size:18px">标准地图</div>
                        <div style="margin-top: 5px;width:400px">
                            <el-input placeholder="搜地点、找路线" v-model="valueinput" @input="showSelect" @clear='clearInput' style="background:white" >
                                 <el-button slot="append" icon="el-icon-position
"  @click="showNavigation"></el-button>
                                 <el-button slot="append" icon="el-icon-search" @click="showSelect"></el-button>
                            </el-input>
                        </div>
            </el-header>
            <el-container style="overflow-y:scroll">
            <el-aside>
                <!-- <div style="height:20px;color:black;font-size:18px;margin-top:10px">图层</div> -->
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
            </el-aside>
            <el-main>
                <div id="mapContent">
                    <div class="threestyle" @click="setJiaodu">{{style}}</div>
                    <div class="weipian" @click="showWeipian">{{weipian}}</div>
                    <div style="width:140px;position:absolute;top:10px;left:10%;border:1px solid black;z-index: 2;"><p><span id="map-title">当前点击点：</span><span id="map-center"></span></p></div>

                    <a  v-if="showNavBtn" type="primary" href="./route.html" target="_blank" class="nav-a">导航</a>
                    <el-button @click="stopUpdate" v-if="stopShip" type="primary" style="width:5%;position:absolute;top:80px;left:0%;z-index: 2;">停止</el-button>
                    <el-card class="box-card" v-if="showFlag" style="width:400px">
                        <div slot="header" class="clearfix">
                            <div style="display:flex; justify-content: space-around;align-items: baseline;line-height:40px;">
                                <span style="font-size:18px">路径规划</span>
                                <el-button style="float: right; padding: 3px 0;" type="text" @click="closeCard">关闭</el-button>
                            </div>

                        </div>
                        <el-input
                                placeholder="锚点A"
                                v-model="startInput"
                                style="margin-bottom:10px;width:60%"
                                disabled>
                            </el-input>
                            <el-input
                                placeholder="锚点B"
                                v-model="endInput"
                                style="margin-bottom:10px;width:60%"
                                disabled>
                            </el-input>
                            <div>
                                <el-button style="text-align:center" @click="showRoute">查看</el-button>
                            </div>
                    </el-card>
                    <el-card class="text-card" v-if="showList" style="width:400px;min-height:100px">
                        <div v-for="(item,index) in pointlist" :key="index" @click="findObject(item,index)"  style="text-align:left">
                            <i class="el-icon-map-location"></i>
                            <span style="margin-left:20px">{{item.name}}</span>
                        </div>
                    </el-card>

                </div>
            </el-main>
            </el-container>
  </el-container>
</template>
<script>
/* eslint-disable */
    //图层渲染计数
    let count = 0;

    import CONFIG from "@/components/common/config";
    import {proOp,devOp,MAP_OPTION} from '../../src/global/config'

    //导入请求地址
    // import {CAR_DATA,TRACKING_DATA,CAR_DATA_FIVE} from '../../src/global/urlGlobal'
    //导入图片
    import {QIAOIMAGE,MAIMAGE,CHUANIMAGE,HANGIMAGE,JIAIMAGE,CHUANBOIMAGE,LUNCHUANIMAGE,STARTICON,ENDICON,POINTICON} from '../global/imgGlobal'
    //导入地图封装
    import {setCurrentMap,loadImage} from '../util/mapUtil/mapUtil'
    import {mapState,mapMutations} from 'vuex'
    import {symbolPoint,channelLine,shipModel,channelPolygon,routePath,endPoint,startPoint,clearSource,clearLayer,depthLine,gltfModel} from "../../src/data/mapConfig";
    import moveAlong from "../../src/data/moveAlong3";
    const UPDATE_INTERVAL = 1000 * 60;
    // import CONFIG from "@/components/common/config";
    // import filterOptions from "@/components/admin/control/getFiltersData";
    export let map=null,qlPopup=null,qlPopups=[],czPopup=null,czPopups=[],mtPopup=null,mtPopups=[],hbPopup=null,hbPopups=[],jydPopup=null,jydPopups=[],cbPopup=null,cbPopups=[],startMarker=[],endMarker=[];
    export default {
        name: "MapContent",
        data(){
            return{
              loading:true,
              style:'3D',
              valueinput:'',//输入框内容
              weipian:'矢量',
              menuData: [{
                id: 1,
                name: '基础地理信息数据',
                list: [{
                    id: 1-1,
                    name: '水系面'
                }, {
                    id: 1-2,
                    name: '水系线'
                },{
                    id: 1-3,
                    name: '水系点'
                },{
                    id: 1-4,
                    name: '水系附属设施面'
                },{
                    id: 1-5,
                    name: '行政界面'
                },{
                    id: 1-6,
                    name: '行政界桩（碑）点'
                },{
                    id: 1-7,
                    name: '地点地址及兴趣点'
                }]
                }, {
                id: 2,
                name: '电子航道图数据',
                list: [{
                    id: 2-1,
                    name: '定位基础'
                }, {
                    id: 2-2,
                    name: '河道及设施'
                }, {
                    id: 2-3,
                    name: '航道及设施'
                }, {
                    id: 2-4,
                    name: '水深'
                }, {
                    id: 2-5,
                    name: '助航及服务设施'
                }, {
                    id: 2-6,
                    name: '船闸'
                }, {
                    id: 2-7,
                    name: '船标'
                }, {
                    id: 2-8,
                    name: '临河建筑物'
                }, {
                    id: 2-9,
                    name: '拦河建筑物'
                }, {
                    id: 2-10,
                    name: '航道区界'
                }, {
                    id: 2-11,
                    name: '其他地物'
                }]
                }, {
                id: 3,
                name: '实景影像数据',
                list: [{
                    id: 3-1,
                    name: '倾斜摄影模型'
                }]
                }],
                defaultProps: {
                    children: 'list',
                    label: 'name'
                },
                pointlist:[
                    {name:'lalala'},
                    {name:'cacaca'},
                    {name:'bababa'}
                ],
                showFlag:false,
                startInput:'长浜泊区',
                endInput:'东金港口停泊区',
                showList:false,
                routeShow:false,
                showNavBtn:false,
                stopShip:false,
                shipInterval:null,//小船行驶定时器
                code:'CB0000001',
                index:0,
                times:0,
                carTrack:null,
                tracks:[],
                //车辆大数据平台
                allLines: [],
                curLines: [],
                speed: null,
                updatetime: 0,
                detail: {},
                trackQuery: {
                    lastpoint: "0,0"
                },
                raf: null,
            }
        },
        components:{},
        computed:{
            ...mapState({
                showVehicleList:state=>state.main.showVehicleList,
            }),
        },
        watch: {
            valueinput(){
                if(this.valueinput===''){
                    console.log(this.valueinput)
                     this.showList=false
                }
            }
        },
        mounted(){
            let that=this;
            let path = this.$route.path;
            console.log("路径：",path)
            that.loadMap();
            that.getMenu()
        },
        methods:{
            /* eslint-disable */
            ...mapMutations(['updateMapLoaded','updateIsLoading']),
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
                if(this.weipian==='卫片'){
                    this.weipian='矢量'
                    map.setLayoutProperty('IMAGERY', 'visibility', 'visible')
                    map.setLayoutProperty('serve', 'visibility', 'visible')
                }else{
                    this.weipian='卫片'
                    map.setLayoutProperty('IMAGERY', 'visibility', 'none')
                    map.setLayoutProperty('serve', 'visibility', 'none')
                }
            },
            startUpdate(){//更新实时轨迹
                this.startAnimation();
                this.stopShip=true
            },
            startAnimation(){
                let url=CONFIG.service.routePath
                let that=this
                that.$service.get(url).then(res=>{
                                console.log(res)
                                if(res.data.code==0){

                                }
                })
                map.flyTo(
                    {
                      center:[120.82479095379,30.8269868442753],
                      zoom:15
                    }
                )
               that.carTrack.startMove(that.tracks, 50000)
      // ship=setInterval(carTrack.startMove(JSON.parse(localStorage.route), 500),50)
      // ;
      // 是否锁定屏幕
            that.carTrack.lockView(false);

                    // }

                // })

            },
            stopUpdate(){//停止实时轨迹
            //   clearInterval(this.shipInterval);
                this.carTrack.stopMove();
              //清除小船和轨迹
            },
            showSelect(){
               let _this=this
               _this.showList=true;
               let url=CONFIG.service.searchObjectByName
               _this.$service.get(url+_this.valueinput).then(res=>{
                                if(res.data.code==0){
                                   _this.pointlist=res.data.result
                                }
               })
            },
            findObject(item,index){
               let _this=this

               let url=CONFIG.service.findObjectById
                            _this.$service.get(url+item.kindname+'&mbid='+item.mbid).then(res=>{
                                if(res.data.code==0){
                                   symbolPoint(item+index,res.data.result,"point")
                                   map.flyTo({
                                       center:res.data.result.geometry.coordinates
                                   })
                                }
               })
               _this.showList=false;
               _this.valueinput=''
            },
            clearInput(){
                this.showList=false
            },
            makeLine(points) {//画线
                const ls = turf.lineString(points);
                ls.properties.length = turf.length(ls);
                return ls;
            },
            updateMap() {//更新地图线
                if (this.allLines.length || this.curLines) {
                    const lines = [...this.allLines, ...this.curLines];
                    // const eventPoints = this.getEventPoints(lines).filter((e, i, arr) => {
                    // return i == 0 || arr[i - i].properties.status != e.properties.status;
                    // });
                    // this.drawEventPoints(eventPoints);

                    const fc = {
                        type: "FeatureCollection",
                        features: lines
                    };
                    map.getSource("allLines").setData(fc);
                }
            },
            updateShip(data) {//更新车（船）
                let feature=[]


                if (!(this.allLines.length || this.curLines)) {
                    map.setCenter(data.point);
                }

                let json={
                    type: 'Feature',
                    features:data
                }
                // data.tracks.forEach((item) =>{
                //        feature.push(turf.point(item))
                // })
                // console.log('1223:',JSON.stringify(json))
                // const startPoint = turf.point(data.point);
                // console.log(startPoint)
                map.getSource("ship").setData({});
                this.autoTrack(data.point);
            },
            autoTrack(pos) {//中心点

                map.setCenter(pos);
                return;

                const [lng, lat] = pos;
                const bounds = map.getBounds();

            },
            realtimeUpdate() {//实时更新
            //接口
                let that=this
                let url=CONFIG.service.navi
                that.$service.get(url+that.code+"/"+that.index+"/"+that.times).then(res=>{
                    console.log(res)
                    if(res.data.code===0){
                        that.times=res.data.result.times
                        that.index=res.data.result.index
                        that.updateShip(res.data.result);
                        // that.playTrack(res.data.result);

                    }

                })
                // api
                //     .get("car/details/" + this.cid + "/" + this.detail.idx)
                //     .then(resp => resp.data)
                //     .then(data => {
                //         this.detail = data;
                //     });

                // if (this.updatetime === 0) {
                //     this.queryTrack().then(data => {
                //         this.updatetime = data.updatetime;

                //     if (data.data.length === 1) {
                //         this.updateShip(data.data[0]);
                //     } else {
                //         const lines = this.splitToLines(data);
                //         this.lastLines = lines;

                //         // minemaputil.fitBounds(
                //         //   map,
                //         //   {
                //         //     type: "FeatureCollection",
                //         //     features: lines
                //         //   },
                //         //   { padding: 100 }
                //         // );
                //     }
                //     // this.queryTrack().then(data => {
                //         this.updatetime = data.updatetime;
                //         this.playTrack(data);
                //     // });
                //     });
                //     return;
                // }


            },
            splitToLines(data) {//平滑线
                let temp = [];
                const lines = [];
                // data.tracks.forEach((e, i) => {
                //     temp.push(e);
                //     if (i === 0) {
                //         temp.push(e);
                //     } else {
                //         temp.push(e);
                //         // const pre = data.data[i - 1];
                //         // if (e.status !== pre.status) {
                //         //     lines.push(this.makeLine(temp));
                //         //     temp = [e];
                //         // }

                //     // if (i + 1 < data.data.length) {
                //     //   const n = data.data[i + 1];

                //     //   if (e.status !== n.status) {
                //     //     lines.push(this.makeLine(temp));
                //     //     temp = [n];
                //     //   }
                //     // } else {
                //     //   lines.push(this.makeLine(temp));
                //     // }
                //     }
                // });
                if (data.tracks.length > 1) {
                    lines.push(this.makeLine(data.tracks));
                    // console.log()
                }
                console.log(lines)
                return lines;
            },
            playTrack(data) {
                cancelAnimationFrame(this.raf);

                // add last line
                if (this.lastLines) {
                    this.allLines = [...this.allLines, ...this.lastLines];
                    this.lastLines = [];
                }

                // const onePointUpdate = () => {
                //     if (this.allLines.length) {
                //     const lastPoint = _.last(_.last(this.allLines).geometry.coordinates);
                //     const theLine = this.makeLine([
                //         {
                //         lng: lastPoint[0],
                //         lat: lastPoint[1],
                //         status: _.last(this.allLines).properties.status
                //         },
                //         data.data[0]
                //     ]);
                //     if (turf.length(theLine) > 0.01) {
                //         this.allLines.push(theLine);
                //         this.updateMap();
                //     }
                //     }
                // };
                // onePointUpdate();

                // only one point
                // this.updateShip(data[0])
                    // if (data.data.length == 1) {
                    //     this.updateCar(data.data[0]);
                    //     return;
                    // }
                    // debugger
                    const line = turf.lineString(data.tracks);
                    console.log('线：',line)
                    // this.allLines.push(line);
                    // 起始点
                    const startPoint = turf.point(data.point);

                    const length = turf.length(line);
                    // if (length < 0.001) {
                    //   // onePointUpdate();
                    //   this.updateCar(data.data[0]);
                    //   return;
                    // }

                    // const lines = this.splitToLines(data);
                    this.lastLines = line;

                    // 刷新间隔
                    const dd = 1000 / 10.0;

                    let start = null;
                    let last = null;
                    let index = 0;
                    const step = timestamp => {
                        // console.log("step " + timestamp);
                        if (!start) {
                            start = timestamp;
                            last = timestamp;

                        //this.updateCar(data.data[index]);
                        }
                        const progress = timestamp - start;

                        if (timestamp - last > dd) {
                        const len = (length * progress) / UPDATE_INTERVAL;

                        this.curLines = this.linesAlong(lines, len);
                        this.updateMap();

                        while (index < data.data.length - 1) {
                            index++;
                            const p = turf.point([data.data[index].lng, data.data[index].lat]);
                            const cline = turf.lineSlice(startPoint, p, line);
                            if (turf.length(cline) > len) break;
                        }
                        index--;

                        const [p1, p0] = _.takeRight(
                            _.last(this.curLines).geometry.coordinates,
                            2
                        );
                        const dir = turf.bearing(turf.point(p1), turf.point(p0));

                        // const c1 = _.last(this.curLines).geometry.coordinates;
                        // const dir = turf.bearing(
                        //   turf.point(_.first(c1)),
                        //   turf.point(_.last(c1))
                        // );

                            this.updateCar(data.data[index], p0, dir);
                        }
                        last = timestamp;
                        if (progress < UPDATE_INTERVAL) {
                            this.raf = requestAnimationFrame(step);
                        } else {
                            this.curLines = lines;
                            this.updateMap();
                            this.raf = requestAnimationFrame(step);
                        }
                    };
                    this.raf = requestAnimationFrame(step);
            },
            linesAlong(lines, len) {
                    const ret = [];
                    let l = 0;
                    lines.some(e => {
                        l += e.properties.length;
                        const d = len - l;
                        if (d >= 0) {
                        ret.push(e);
                        return d === 0;
                        }

                        const tl = turf.lineSliceAlong(e, 0, e.properties.length + d);
                        tl.properties = e.properties;
                        ret.push(tl);
                        return true;
                    });
                return ret;
            },
            queryTrack() {
                // console.log(this.updatetime);

                return api
                    .get(
                    `car/realtime/tracking/${this.cid}/${this.updatetime}/${this.trackQuery.lastpoint}`
                    )
                    .then(resp => resp.data)
                    .then(data => {
                    if (!data.data || !data.data.length) {
                        return Promise.reject("no track data");
                    }
                    this.trackQuery.lastpoint = data.lastpoint;
                    return data;
                });
            },
            showRoute(){//路径规划
                let _this=this
                _this.routeShow=true
                _this.showNavBtn=true
               //路径规划道路线
                let url=CONFIG.service.routePath
                // debugger
                _this.$service.get(url).then(res=>{
                                console.log(res)
                                if(res.data.code==0){

                                    if(!map.getSource('routeSource')){
                                        let length=res.data.result.features[0].geometry.coordinates[0].length
                                        // console.log(length)
                                        routePath(res.data.result)
                                        startPoint(res.data.result.features[0].geometry.coordinates[0][0])
                                        endPoint(res.data.result.features[0].geometry.coordinates[0][length-1])
                                        map.flyTo({
                                            zoom:13,
                                            center:res.data.result.features[0].geometry.coordinates[0][0]
                                        })


                                        // 适配地图
                                        // that.carTrack.fitMap(res.data.result.features[0].geometry.coordinates[0]);
                                    }
                                }
                })
            },
            showNavigation(){//展示导航
               this.showFlag=true;
            },
            closeCard(){//remove路径规划图层
               this.showFlag=false;
               this.routeShow=false
               this.showNavBtn=false;
               this.stopShip=false
               clearSource('startSource')
               clearLayer('startLayer')
               clearSource('endSource')
               clearLayer('endLayer')
               clearSource('routeSource')
               clearLayer('routeLayer')
            },
            getMenu(){
                 let _this=this;
                 let url=CONFIG.service.getMenu
                            _this.$service.get(url).then(res=>{
                                console.log(res)
                                if(res.data.code==0){
                                   _this.menuData=res.data.result
                                }
                 })

            },
            handleCheckChange(data, checked, indeterminate) {
                let _this=this
                console.log(data, checked, indeterminate);
                console.log(data.url,data.menuId)
                if(checked&&data.type===3){//选中的子节点
                    if(data.url!==null){
                            let root=CONFIG.service.root

                            _this.$service.get(root+data.url).then(res=>{
                                console.log('线：',res)
                                _this.line=res
                                if(res.data.code==0){
                                    if(data.shape===1){//画点
                                        // if(data.name==="桥梁、桥梁区"){//测试
                                            console.log("lala ",res.data)
                                            res.data.result.features.forEach((item,index)=>{
                                                var str = `
                                                    <div style="background:#B3C0D1;padding-left:5px;padding-right:10px;font-size: 14px;">
                                                        <div>
                                                            <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${item.properties.name}</span>
                                                        </div>
                                                    </div>
                                                    `;
                                                if(!map.getSource('SINGLE_MODEL_SOURCE'+data.enname+item.properties.id)){
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

                                            map.flyTo({
                                                center:res.data.result.features[0].geometry.coordinates
                                            })


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
                                                console.log('检查这里：',res.data.result.features)
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
            handleNodeClick(data) {
                console.log(data);
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
                    // pitch: MAP_OPTION.pitch, /*地图俯仰角度*/
                    maxZoom: 23,
                    minZoom: 3,
                    // dragRotate:false,
                    pitch:55,
                    zoom:16,
                    // projection: 'MERCATOR',
                    // 控制logo显示
                    logoControl: true,
                    projection: 'MERCATOR'//3d
                });
                setCurrentMap(map);
                // map.addControl(new HelloWorldControl(), "bottom-right");
                map.addControl(new minemap.Navigation(), 'bottom-right');
    // map.addControl(new minemap.Fullscreen(), 'top-right');
                map.addControl(new minemap.Attribution(), 'bottom-left');
                map.addControl(new minemap.Scale(), 'top-left');
                map.on("load",()=>{
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
                    //船（车）

                    let url=CONFIG.service.getShipsLocation
                    that.$service.get(url).then(res=>{
                                console.log(res)
                                if(res.data.code==0){
                                    res.data.result.features.forEach((item,index)=>{
                                                var str = `
                                                    <div style="background:#B3C0D1;padding-left:5px;padding-right:10px;font-size: 14px;">
                                                        <div>
                                                            <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${item.properties.name}</span>
                                                        </div>
                                                    </div>
                                                    `;
                                                if(!map.getSource('chuanboModel')+index){
                                                    shipModel(index,item.properties.shipdir,item.geometry.coordinates)
                                                    cbPopup = new minemap.Popup({
                                                                closeButton: false,
                                                                closeOnClick: false,
                                                                offset: [0, 0],
                                                            });
                                                            cbPopup.setLngLat(item.geometry.coordinates).setHTML(str).addTo(map);
                                                            cbPopups.push(cbPopup)
                                                }
                                    })
                                    // shipPoint(res.data.result)
                                //    _this.menuData=res.data.result
                                }
                    })

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
                                    url: 'http://180.184.67.201/html/08273dtiles/tileset.json'
                    })

                    map.addLayer({
                            "type": "3d-tiles",
                            "id": "serve",
                            "source": "serve",
                            minzoom: 1
                    });
                });

                map.on('click', function(e) {
                    let p=e.lngLat
                    console.log(e.lngLat.toArray())
                    document.getElementById("map-center").innerText = p.lng.toFixed(6) + "," + p.lat.toFixed(6);
                    var features = [];
                    features = map.queryRenderedFeatures([
                        [e.point.x, e.point.y],
                        [e.point.x, e.point.y]
                    ]);

                    var feature = features[0];
                    console.log('查看：',feature)
                    if(feature.layer.id.includes('channel')){//航道线
                        let colorArr=['channelLayer0','channelLayer1','channelLayer2']
                        colorArr.forEach((item,index)=>{
                            if(item==feature.layer.id){

                                map.setPaintProperty(feature.layer.id, 'line-color', 'green');
                                // map.setPaintProperty(feature.layer.id, 'line-color', 'green');
                                // map.setPaintProperty(feature.layer.id, 'line-color', 'green');
                                console.log('here:',feature.layer.id)
                            }else{
                                map.setPaintProperty('channelLayer'+index, 'line-color', 'rgb(17,107,220)');
                            }
                        })
                    }else if(feature.properties.iconname=='qiaoliang'){//桥梁
                            var str = `
                            <div style="background:#B3C0D1;padding:20px;font-size: 14px;">
                                <div>
                                    <span style="text-align:left;">桥名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">航道名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.hdd_name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">公司名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.mgr_name}</span>
                                </div>
                            </div>
                            `;
                            qlPopup = new minemap.Popup({
                                closeButton: true,
                                closeOnClick: true,
                                offset: [-50, -50],
                            });
                            qlPopup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(str).addTo(map);
                    }else if(feature.properties.iconname == "chuanzha"){//船闸
                            var str = `
                            <div style="background:#B3C0D1;padding:20px;font-size: 14px;">
                                <div>
                                    <span style="text-align:left;">船闸名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">枢纽名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.sn_name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">公司名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.mgr_name}</span>
                                </div>
                            </div>
                            `;
                            czPopup = new minemap.Popup({
                                closeButton: true,
                                closeOnClick: true,
                                offset: [-50, -50],
                            });
                            czPopup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(str).addTo(map);
                    }else if(feature.properties.iconname == "hangbiao"){//航标
                            var str = `
                            <div style="background:#B3C0D1;padding:20px;font-size: 14px;">
                                <div>
                                    <span style="text-align:left;">航标名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">航道线：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.hdz_name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">公司名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.mgr_name}</span>
                                </div>
                            </div>
                            `;
                            hbPopup = new minemap.Popup({
                                closeButton: true,
                                closeOnClick: true,
                                offset: [-50, -50],
                            });
                            hbPopup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(str).addTo(map);
                    }else if(feature.properties.iconname == "matou"){//码头
                            var str = `
                            <div style="background:#B3C0D1;padding:20px;font-size: 14px;">
                                <div>
                                    <span style="text-align:left;">码头名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">路段名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.hdd_name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">公司名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.mgr_name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">类型名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.type}</span>
                                </div>
                            </div>
                            `;
                            mtPopup = new minemap.Popup({
                                closeButton: true,
                                closeOnClick: true,
                                offset: [-50, -50],
                            });
                            mtPopup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(str).addTo(map);
                    }else if(feature.properties.iconname == "jiayoudian"){//加油点
                            var str = `
                            <div style="background:#B3C0D1;padding:20px;font-size: 14px;">
                                <div>
                                    <span style="text-align:left;">加油站名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">航道名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.hdd_name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">公司名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.mgr_name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">类型名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.type}</span>
                                </div>
                            </div>
                            `;
                            jdyPopup = new minemap.Popup({
                                closeButton: true,
                                closeOnClick: true,
                                offset: [-50, -50],
                            });
                            jdyPopup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(str).addTo(map);
                    }else if(feature.layer.id == "shipLayer"){
                            var str = `
                            <div style="background:#B3C0D1;padding:20px;font-size: 14px;text-align:left;">
                                <div>
                                    <span style="text-align:left;">船舶名：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.name}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">速度：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.speed}km/h</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">时间：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.time}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">航向：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.hxdir}</span>
                                </div>
                                <div>
                                    <span style="text-align:left;">船头方向：</span>
                                    <span style='margin: 0;margin-top:10px;margin-left:10px;margin-bottom: 5px;padding-bottom: 0.2em;'>${feature.properties.shipdir}</span>
                                </div>
                            </div>
                            `;
                            mtPopup = new minemap.Popup({
                                closeButton: true,
                                closeOnClick: true,
                                offset: [-50, -50],
                            });
                            mtPopup.setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(str).addTo(map);
                    }

                })
            },
        },
        destroyed(){
            let that=this;
        }
    }
</script>

<style scoped lang="scss">
.threestyle{
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: white;
    position: absolute;
    bottom: 1.3rem;
    right: 0.15rem;
    border: 2px solid rgb(51,51,51);
    z-index: 2;
    border-radius: 5px;
    // border-color:rgb(0,0,0);
    color:rgb(51,51,51);
    cursor: pointer;
}
.weipian{
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: white;
    position: absolute;
    bottom: 1.7rem;
    right: 0.15rem;
    border: 2px solid rgb(51,51,51);
    z-index: 2;
    border-radius: 5px;
    // border-color:rgb(0,0,0);
    color:rgb(51,51,51);
    cursor: pointer;
}
.nav-a{
    width: 5%;
    height: 35px;
    position: absolute;
    top: 40px;
    left: 0.5%;
    line-height: 30px;
    z-index: 2;
    border: 1px solid white;
    background: rgb(82,152,255);
    color: white;
    border-radius: 5px;
}
.box-card{
    position: absolute;
    top: 1px;
    left: 53%;
    width:20%;
    z-index: 2;
    background: #B3C0D1;
}
.text-card{
    position: absolute;
    top: 1px;
    left: 53%;
    width:20%;
    z-index: 2;
    background: #B3C0D1;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }


body > .el-container {
    margin-bottom: 40px;
  }

#mapContent {
          width: 100%;
          height: 100%;
          z-index: 1;
          position: relative;
}
 .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    overflow-y: scroll;
    max-height:100%
    // line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    overflow:hidden;
  }
    .el-title{
        font-weight: bold;
    }
    .container-header{
            width:100%;
            height:70px;
            display: flex;
            justify-content: space-around;
            // color: white;
            align-items: baseline;
        }
    .container{
        // position: absolute;
        // width: 100%;
        // height: 100%;
        .container-title{
            background:url("../../public/img/nav/nav.png") no-repeat;
            height:86px;
            width:100%;
            background-size: cover;
            background-position-x: -1px;
            background-position-y: -10px;
        }

        .container-map{
            display:flex;
            width: 100%;
            position: absolute;
            height: 93%;
        }

        .left{
            width:350px;
            height:100%;
            .app-left{
                  width:100%;
                  height:100%;
            }
            // background:white
        }
        .left-tree{
            width:350px;
            height:100%;
            overflow-y: scroll;
        }
.el-aside::-webkit-scrollbar {
    width: 5px;
}

.el-aside::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background: white
}

.el-aside::-webkit-scrollbar-track {
    border-radius: 0px;
}

    }
</style>
