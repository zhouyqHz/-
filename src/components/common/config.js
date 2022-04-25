export default {
    // localAddress:"",

    service: {
      // root:'http://10.172.19.12:8090/yunda/',//韵达内网
      root:'http://180.184.67.201/hangdao-service',//上海内网

      //logout接口
      get getMenu(){
        return this.root+'/sys/menu/nav'
      },
      get tantou(){
        return this.root+'/electron/camera/find/all'
      },
      get alert(){
        return this.root+'/electron/route/real/navi/alert/'
      },
      //水深热力图
      // get hotmap(){
      //   return this.root+'/electron/waterdepth/find/hotmap/by/rect/'
      // },
      get hotmap(){
        return this.root+'/electron/waterdepth/find/all/hotmap'
      },
      get getShipsLocation(){
        return this.root+'/overall/findAllShipsLocation'
      },
      get double(){//双向航道
        return this.root+'/electron/navlane/find/all/double'
      },
      get shipCode(){//船舶导航
        return this.root+'/electron/route/real/navi/'
      },
      get routePath(){
        return this.root+'/electron/route/plan/path?'
      },
      get findObjectById(){//通过ID定位
        return this.root+'/overall/findObjectById?kindname='
      },
      get searchObjectByName(){//智能列表
        return this.root+'/overall/searchObjectByName?keyword='
      },
      get navi(){//实时导航
        return this.root+'/electron/route/real/navi/'
      },
      get getAoiById() {
        return this.root + 'api/getAoiById?id='
      },
      get getPointSample() {
        return this.root + 'api/getPointSample'
      },
      get getLineSample() {
        return this.root + 'api/getLineSample'
      },
      get getPolygonSample() {
        return this.root + 'api/getPolygonSample'
      },
      get addYoi(){//面合并
        return this.root + 'api/addYoi'
      },
      get hollowPolygon(){//面镂空
        return this.root + 'api/hollowPolygon'
      },
      get updateYoi(){//面修行、面属性
        return this.root + 'api/updateYoi'
      },
      get shipoptions(){//所有船舶ID-NAME键值数组
        return this.root + '/ship/findAllShip/idnames'
      }
    }
   
}