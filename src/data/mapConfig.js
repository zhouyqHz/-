//引入map对象
import {map,qlPopup,mtPopup,czPopup,hbPopup,jydPopup,qlPopups} from '@/views/NewMap'
import {TANTOU,CHUANBOIMAGE,STARTICON,ENDICON,qiaoliangModel1,qiaoliangmodel1,matouModel,matoumodel,jiayoudianModel,jiayoudianmodel,chuanzhaModel,chuanzhamodel,hangbiaoModel,hangbiaomodel,chuanboModel,chuanbomodel,treeModel,treeModel2} from '../global/imgGlobal'
//水深热力图
export const heatmapSource=()=>{
  map.addSource("heatmapSource", {
    type: "geojson",
    data: null
  });
  map.addLayer({
    "id": "heatmapLayer",
    "type": "heatmap",
    "source": "heatmapSource",
    "layout": {
        "visibility": "visible"
    },
    "paint": {
        // 一个热力图数据点的模糊范围，单位是像素，默认值30；要求：值大于等于1，可根据zoom level进行插值设置
        "heatmap-radius": 10,
        //一个热力图单个数据点的热力程度，默认值为1；要求：值大于等于0，支持使用property中某个的热力值
        "heatmap-weight": {
            "property": "mag",
            "stops": [[0, 0], [10, 1]]
        },
        // 用于统一控制热力值的强度，默认值1；要求：值大于等于0，可根据zoom level进行插值设置
        "heatmap-intensity": 1,
        // 表示热力图颜色阶梯，阶梯的值域范围为0-1，默认值为["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]
        "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(0, 0, 255, 0)", 0.1, "royalblue", 0.3, "cyan", 0.5, "lime", 0.7, "yellow", 1, "#FB822B"
        ],
        // 表示热力图的不透明度，默认值1；值域范围0-1，可根据zoom level进行插值设置
        "heatmap-opacity": 1,
      }
  });
}
export const clearSource=(id)=>{
  if(map.getSource(id)) {
    map.removeSource(id);
  }
  
}
export const clearLayer = (id) =>{
  if(map.getLayer(id)){
    map.removeLayer(id);
  } 
}
//加载icon图片
export const loadImage=function(url,name){
  map.loadImage(url,function(error,image){
    if (error) throw error;
    if (!map.hasImage(name)){
      map.addImage(name, image);
    }
  });
};
//加载各种桥梁、船舶的icon
export const symbolPoint= (id,data,name) =>{
  map.addSource("symbolSource"+id, {
    "type": "geojson",
    "data": data
  });
  map.addLayer({
    id: 'symbolLayer'+id,
    type: "symbol",
    source: 'symbolSource'+id,
    layout: {
      visibility: "none", 
      'icon-image':name,
      'icon-size':0.2,
      'icon-rotation-alignment': 'map',
      "icon-allow-overlap": true,  //图标允许压盖
      "icon-ignore-placement": true,
    },
  //  filter: ["in","type", 1,2,3]
  });
}
//加载上下行航道线
export const hangdaoLine =(data)=>{
  map.addSource("hangdaoline", {
    "type": "geojson",
    "data": data,
    "maxzoom":24
  });
  map.addLayer({
    "id": "hangdaoline",
    "type": "line",
    "source": "hangdaoline",
    "layout": {
        // "line-join": "round",
        // "line-cap": "round",
        //"border-visibility":"visible"  //是否开启线边框
    },
    "paint": {
        "line-width": 50,
        "line-color": {
            "type": "categorical",
            "property": "direction",
            "stops": [['上行', "#FF7979"], ['下行', "#A6FF84"]]
        },
        "line-opacity":0.1, //设置线边框透明度
       // "line-border-opacity":0.8, //设置线边框透明度
    }
  });

  map.addLayer({
      "id": "symbolhangdaoLayer",
      "type": "symbol",
      "source": "hangdaoline",
      "layout": {
          "text-field": {
            "type": "categorical",
            "property": "direction",
            "stops": [['上行', "←"], ['下行', "→"]]
          },
          "text-size": 30,
          "symbol-placement":"line"
      },
      "paint": {
          "text-color": "white",
          "text-halo-color": "#ffffff",
          "text-halo-width": 0.8,
      },
      "maxzoom":24
  });
}
export const difficultModel=()=>{
  map.addSource("vehicle_track_symbol", {
    type: "3d-model",
    "data": chuanboModel,// 要加载的gltf格式数据
    "modelFolder": chuanbomodel,// 该数据引用图片等资源的文件夹路径
    "scale": [0.003,0.003,0.003],// 在xyz轴方向上的缩放比例
    // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
    "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
    // "rotation": [0, -rotation, 0],// 绕xyz轴方向上的旋转，单位为度
    // "location": location,// 锚点（模型局部坐标原点）的经纬度位置
    configuration: {
        renderType: "track",
        /*** 用于指定属性字段来匹配模型的名称 ***/
        modelNames: ["car-s-1"],
        modelMap: {
            "1": "car-s-1"
        },
        modelMatchKeyName: "speed_level",
        // translation: [0, 1, 0],  //对于模型的局部坐标轴的xyz
        /*** 用于指定属性字段来匹配模型的名称 end ***/
        trackData: [], // 轨迹数据
        realtime: true, // 与 示例 https://www.minedata.cn/support/api/demo/javascript-3d-api/zh/layer/3d/model-track-layer 区别
        showDisplayBoard: false, // 控制是否显示展示板 与 bgImageMathOptions 参数一起使用
        // bgImageMathOptions: { // 展示板相关参数
        //     scale: [1 / 10, 1 / 10, 1 / 10], // 控制大小
        //     translationMatchKey: "vehicleType",
        //     translation: {
        //         "小型轿车": [0, 0, 0],
        //         "小型越野客车": [0, 10, 0],
        //         "": [0, 6, 0]
        //     }, // 控制平移量，可用于设置高度，单位 m
        //     width: 60, // 画布的宽
        //     height: 60, // 画布的高
        //     // fontSize: 10, // 文字大小
        //     // fontColor: "white", // 文字颜色
        //     textTop: 0, // 文字上边距
        //     images: { // 背景图，会根据数据属性进行切换
        //         active: "./WechatIMG315.png",
        //         normal: "./WechatIMG315.png"
        //     }
        // }
    }
});

map.addLayer({
    id: "vehicle_track_symbol",
    type: "3d-model",
    source: "vehicle_track_symbol",
    layout:{
      "visibility":"none"
    }
})
}

//加载各种3dmodel
export const gltfModel= (id,enname,rotation,location,scale) =>{ //每个不同的type
  if(enname==='qiaoliang'){
    // rotation=-60
    map.addSource("SINGLE_MODEL_SOURCE"+enname+id, {
      "type": "3d-model", // 数据类型为“3d-model”
      "data": qiaoliangModel1,// 要加载的gltf格式数据
      "modelFolder": qiaoliangmodel1,// 该数据引用图片等资源的文件夹路径
      "scale": [scale,scale,scale],// 在xyz轴方向上的缩放比例
      // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      "translation": [0, 1, 0],// 在xyz轴方向上的偏移量，单位为m
      "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      "location": location,// 锚点（模型局部坐标原点）的经纬度位置
      // "scale": [0.001,0.001,0.001],// 在xyz轴方向上的缩放比例
      // // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      // "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      // "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      // "location": location// 锚点（模型局部坐标原点）的经纬度位置
    });

    map.addLayer({
        "type": "3d-model",//图层类型为"3d-model"
        "id": "SINGLE_MODEL_LAYER"+enname+id,
        "source": "SINGLE_MODEL_SOURCE"+enname+id
    })
   
    
  }else if(enname==='matou'){
    // rotation=-60
    // scale=0.001
    map.addSource("SINGLE_MODEL_SOURCE"+enname+id, {
      "type": "3d-model", // 数据类型为“3d-model”
      "data": matouModel,// 要加载的gltf格式数据
      "modelFolder": matoumodel,// 该数据引用图片等资源的文件夹路径
      "scale": [scale,scale,scale],// 在xyz轴方向上的缩放比例
      // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      "translation": [0, 1, 0],// 在xyz轴方向上的偏移量，单位为m
      "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      "location": location,// 锚点（模型局部坐标原点）的经纬度位置
      // "scale": [0.001,0.001,0.001],// 在xyz轴方向上的缩放比例
      // // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      // "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      // "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      // "location": location// 锚点（模型局部坐标原点）的经纬度位置
    });

    map.addLayer({
        "type": "3d-model",//图层类型为"3d-model"
        "id": "SINGLE_MODEL_LAYER"+enname+id,
        "source": "SINGLE_MODEL_SOURCE"+enname+id
    })
  }else if(enname==='jiayoudian'){
    map.addSource("SINGLE_MODEL_SOURCE"+enname+id, {
      "type": "3d-model", // 数据类型为“3d-model”
      "data": jiayoudianModel,// 要加载的gltf格式数据
      "modelFolder": jiayoudianmodel,// 该数据引用图片等资源的文件夹路径
      "scale": [scale,scale,scale],// 在xyz轴方向上的缩放比例
      // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      "translation": [0, -1, 0],// 在xyz轴方向上的偏移量，单位为m
      "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      "location": location,// 锚点（模型局部坐标原点）的经纬度位置
      // "scale": [0.001,0.001,0.001],// 在xyz轴方向上的缩放比例
      // // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      // "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      // "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      // "location": location// 锚点（模型局部坐标原点）的经纬度位置
    });

    map.addLayer({
        "type": "3d-model",//图层类型为"3d-model"
        "id": "SINGLE_MODEL_LAYER"+enname+id,
        "source": "SINGLE_MODEL_SOURCE"+enname+id
    })
  }else if(enname==='chuanzha'){
    map.addSource("SINGLE_MODEL_SOURCE"+enname+id, {
      "type": "3d-model", // 数据类型为“3d-model”
      "data": chuanzhaModel,// 要加载的gltf格式数据
      "modelFolder": chuanzhamodel,// 该数据引用图片等资源的文件夹路径
      "scale": [scale,scale,scale],// 在xyz轴方向上的缩放比例
      // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      "location": location,// 锚点（模型局部坐标原点）的经纬度位置
      // "scale": [0.001,0.001,0.001],// 在xyz轴方向上的缩放比例
      // // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      // "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      // "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      // "location": location// 锚点（模型局部坐标原点）的经纬度位置
    });

    map.addLayer({
        "type": "3d-model",//图层类型为"3d-model"
        "id": "SINGLE_MODEL_LAYER"+enname+id,
        "source": "SINGLE_MODEL_SOURCE"+enname+id
    })
  }else if(enname==='hangbiao'){
    map.addSource("SINGLE_MODEL_SOURCE"+enname+id, {
      "type": "3d-model", // 数据类型为“3d-model”
      "data": hangbiaoModel,// 要加载的gltf格式数据
      "modelFolder": hangbiaomodel,// 该数据引用图片等资源的文件夹路径
      "scale": [scale,scale,scale],// 在xyz轴方向上的缩放比例
      // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      "location": location,// 锚点（模型局部坐标原点）的经纬度位置
      // "scale": [0.001,0.001,0.001],// 在xyz轴方向上的缩放比例
      // // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      // "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      // "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      // "location": location// 锚点（模型局部坐标原点）的经纬度位置
    });

    map.addLayer({
        "type": "3d-model",//图层类型为"3d-model"
        "id": "SINGLE_MODEL_LAYER"+enname+id,
        "source": "SINGLE_MODEL_SOURCE"+enname+id
    })
  }else if(enname==='tree'){
    map.addSource("SINGLE_MODEL_SOURCE"+enname+id, {
      "type": "3d-model", // 数据类型为“3d-model”
      "data": treeModel,// 要加载的gltf格式数据
      "modelFolder": treeModel2,// 该数据引用图片等资源的文件夹路径
      "scale": [scale,scale,scale],// 在xyz轴方向上的缩放比例
      // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      "location": location,// 锚点（模型局部坐标原点）的经纬度位置
      // "scale": [0.001,0.001,0.001],// 在xyz轴方向上的缩放比例
      // // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
      // "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
      // "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
      // "location": location// 锚点（模型局部坐标原点）的经纬度位置
    });

    map.addLayer({
        "type": "3d-model",//图层类型为"3d-model"
        "id": "SINGLE_MODEL_LAYER"+enname+id,
        "source": "SINGLE_MODEL_SOURCE"+enname+id
    })
  }
    
}
//加载各种3dmodel
export const gltftreeModel= (id,enname,rotation,location,scale) =>{ //每个不同的type
  if(enname==='tree'){
   map.addSource("SINGLETREE_MODEL_SOURCE"+enname+id, {
     "type": "3d-model", // 数据类型为“3d-model”
     "data": treeModel,// 要加载的gltf格式数据
     "modelFolder": treeModel2,// 该数据引用图片等资源的文件夹路径
     "scale": [scale,scale,scale],// 在xyz轴方向上的缩放比例
     // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
     "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
     "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
     "location": location,// 锚点（模型局部坐标原点）的经纬度位置
     // "scale": [0.001,0.001,0.001],// 在xyz轴方向上的缩放比例
     // // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
     // "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
     // "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
     // "location": location// 锚点（模型局部坐标原点）的经纬度位置
   });

   map.addLayer({
       "type": "3d-model",//图层类型为"3d-model"
       "id": "SINGLETREE_MODEL_LAYER"+enname+id,
       "source": "SINGLETREE_MODEL_SOURCE"+enname+id
   })
 }
}
//所有船舶图标
export const shipModel= (index,rotation,location) =>{
  map.addSource("chuanboModel"+index, {
    "type": "3d-model", // 数据类型为“3d-model”
    "data": chuanboModel,// 要加载的gltf格式数据
    "modelFolder": chuanbomodel,// 该数据引用图片等资源的文件夹路径
    "scale": [0.003,0.003,0.003],// 在xyz轴方向上的缩放比例
    // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
    "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
    "rotation": [0, -rotation, 0],// 绕xyz轴方向上的旋转，单位为度
    "location": location,// 锚点（模型局部坐标原点）的经纬度位置
    // "scale": [0.001,0.001,0.001],// 在xyz轴方向上的缩放比例
    // // "scale": [0.05,0.05,0.05],// 在xyz轴方向上的缩放比例
    // "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
    // "rotation": [0, rotation, 0],// 绕xyz轴方向上的旋转，单位为度
    // "location": location// 锚点（模型局部坐标原点）的经纬度位置
  });

  map.addLayer({
      "type": "3d-model",//图层类型为"3d-model"
      "id": "chuanboModel"+index,
      "source": "chuanboModel"+index,
      "layout":{
        "visibility":"none"
      }
  })
  
}
// 添加水位pbf
export const waterPbf= ()=> {
                map.addSource("waterNumber", { /*RoadSource代表数据源ID，是唯一的，不能重复*/
                                "type": "vector", /*数据源类型*/
                                "tiles":['http://180.184.67.201/hangdao-service/electron/waterdepth/find/number/value/{z}/{x}/{y}'], /*数据源请求地址URL，可以是多个*/
                                cluster: true,
                                clusterMaxZoom: 18, /* 最大聚合层级 */
                                clusterRadius: 50, /* 聚合半径 */
                });
                //非聚合图层
                // map.addLayer({
                //         'id': 'waterNumber',
                //         'type': 'symbol',
                //         'source': 'waterNumber',
                //         "source-layer": "depthdot",
                //         'paint': {
                //            "text-color":"rgb(208,249,250)"
                //         },
                //         // "filter": ["!has", "depth"],
                //         "layout": {
                //             "visibility": "none",
                //             "text-field": "{depth}",
                //             "text-offset": [0, 0.6],
                //             "text-anchor": "top",
                //             "text-size": 16,
                //             "text-allow-overlap": true,   //图标覆盖文字允许压盖
                //         },
                // });
               
                //添加数量图层
                map.addLayer({
                    "id": "cluster-waterNumber",
                    "type": "symbol",
                    "source": "waterNumber",
                    "source-layer": "depthdot",
                    "layout": {
                        "text-field": "{depth}",
                        "text-size": 16
                    },
                    "paint": {
                      "text-color":"rgb(208,249,250)"
                    },
                    "filter": ["has", "depth"]
                });

}
// 添加摄像头

export const tantou= (data) =>{
  loadImage(TANTOU, "tantou");
  if (!map.getSource('tantou')){
    map.addSource("tantou", {
    "type": "geojson",
    "data": data,
    cluster: true,
            clusterMaxZoom: 15, /* 最大聚合层级 */
            clusterRadius: 50, /* 聚合半径 */
    });
  }
  

  map.addLayer({
    id: 'tantou',
    type: "symbol",
    source: 'tantou',
    "filter": ["!has", "point_count"],
    layout: {
      visibility: "visible", 
      'icon-image':"tantou",
      "icon-rotate": {
        "type": "identity",
        "property": "shipdir"
      },
      'icon-size':0.1,
      'icon-rotation-alignment': 'map',
      "icon-allow-overlap": true,  //图标允许压盖
      "icon-ignore-placement": true,
    },
    // minzoom: 10,
    // maxzoom: 17.5
  });
  var layers = [[10, 'rgba(241, 128, 23, 0.6)'], [5, 'rgba(240, 194, 12, 0.6)'], [2, 'rgba(110, 204, 57, 0.6)']];

  layers.forEach(function (layer, i) {
    
      map.addLayer({
          "id": "cluster-" + i,
          "type": "circle",
          "source": "tantou",
          "paint": {
              "circle-color": layer[1],
              "circle-radius": 18
          },
          "filter": i === 0 ?
              [">=", "point_count", layer[0]] :
              ["all", [">=", "point_count", layer[0]], ["<", "point_count", layers[i - 1][0]]]
      });
  });
  //添加数量图层
  map.addLayer({
      "id": "cluster-count",
      "type": "symbol",
      "source": "tantou",
      "layout": {
          "text-field": "{point_count}",
          "text-size": 16
      },
      "paint": {
          "text-color": "rgba(0,0,0,.75)"
      },
      "filter": ["has", "point_count"]
  });

  
}
//3dmodel船舶导航
 /*添加BIM模型数据*/
 export const moveModel= (point,dir) =>{
  map.addSource("SINGLE_MODEL_SOURCE", {
    "type": "3d-model", // 数据类型为“3d-model”
    "data": chuanboModel,// 要加载的gltf格式数据
    "modelFolder": chuanbomodel,// 该数据引用图片等资源的文件夹路径
    "scale": [0.001, 0.001, 0.001],// 在xyz轴方向上的缩放比例
    "translation": [0, 0, 0],// 在xyz轴方向上的偏移量，单位为m
    "rotation": [0, dir, 0],// 绕xyz轴方向上的旋转，单位为度
    "location": point// 锚点（模型局部坐标原点）的经纬度位置
  });
  
  map.addLayer({
    "type": "3d-model",//图层类型为"3d-model"
    "id": "SINGLE_MODEL_LAYER",
    "source": "SINGLE_MODEL_SOURCE",
    "layout":{
      "visibility":"none"
    }
  });

 } 

//所有船舶d位置
export const shipPoint= (data) =>{
  loadImage(CHUANBOIMAGE, "chuanunselect");
  map.addSource("shipPoint", {
    "type": "geojson",
    "data": data
  });

  map.addLayer({
    id: 'shipPoint',
    type: "symbol",
    source: 'shipPoint',
    layout: {
      visibility: "visible", 
      'icon-image':"chuanunselect",
      "icon-rotate": {
        "type": "identity",
        "property": "shipdir"
      },
      'icon-size':0.5,
      'icon-rotation-alignment': 'map',
      "icon-allow-overlap": true,  //图标允许压盖
      "icon-ignore-placement": true,
    },
    // minzoom: 10,
    // maxzoom: 17.5
  });
  
}
//起点、终点
export const startPoint= (point) =>{
  loadImage(STARTICON, "start");
  if(!map.getSource('startSource')){
    map.addSource("startSource", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": point
                }
            }]
        } 
    });
    map.addLayer({
      id: 'startLayer',
      type: "symbol",
      source: 'startSource',
      layout: {
        visibility: "visible", 
        'icon-image':"start",
        // "icon-rotate":'{shipdir}',
        'icon-size':1,
        'icon-rotation-alignment': 'map',
        "icon-allow-overlap": true,  //图标允许压盖
        "icon-ignore-placement": true,
      },
      // minzoom: 10,
      // maxzoom: 17.5
    });
  }
  
}
//起点、终点
export const endPoint= (point) =>{
  loadImage(ENDICON, "end");
  if(!map.getSource('endSource')){
    map.addSource("endSource", {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": point
                }
            }]
          } 
    });
    map.addLayer({
      id: 'endLayer',
      type: "symbol",
      source: 'endSource',
      layout: {
        visibility: "visible", 
        'icon-image':"end",
        // "icon-rotate":'{shipdir}',
        'icon-size':1,
        'icon-rotation-alignment': 'map',
        "icon-allow-overlap": true,  //图标允许压盖
        "icon-ignore-placement": true,
      },
      // minzoom: 10,
      // maxzoom: 17.5
    });
  }
  
}
//加载航道线
export const channelLine= (id,data) =>{
  
  map.addSource("channelSource"+id, {
    "type": "geojson",
    "data": data
  });
  map.addLayer({
    id: 'channelLayer'+id,
    type: "line",
    source: 'channelSource'+id,
    layout: {
      "visibility": "visible",
      // "line-join": "round",
      // "line-cap": "round", 
    },
    paint: {
      "line-width": 10,
      "line-color": "rgb(17,107,220)",
      "line-dasharray":[1,1],
      "line-border-width":1,  //设置线边框宽度
      "line-border-opacity":1, //设置线边框透明度
      "line-border-color":'blue' //设置线边框颜色
    },
  });
  map.addLayer({
    "id": "symbolLayer"+id,
    "type": "symbol",
    "source": "channelSource"+id,
    "layout": {
        "text-field": "{name}",
        "text-size": 15,
        "text-anchor":"center"
    },
    "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 0.8,
    },
});
}
//加载等深线
export const depthLine= (id,data) =>{
  
  map.addSource("depthSource"+id, {
    "type": "geojson",
    "data": data
  });
  map.addLayer({
    id: 'depthLayer'+id,
    type: "line",
    source: 'depthSource'+id,
    layout: {
      "visibility": "visible",
      // "line-join": "round",
      // "line-cap": "round", 
    },
    paint: {
      "line-width": 2,
      "line-color": {
        "type": "categorical",
        "property": "valdco",
        "stops": [[1, "#7bbfea"], [2, "#33a3dc"],[3,'#2570a1'],[4,'#1b315e']],
        "default": "#2E3092"
      },
      "line-border-width":1,  //设置线边框宽度
      "line-border-opacity":1, //设置线边框透明度
      "line-border-color":'blue' //设置线边框颜色
    },
  });
  map.addLayer({
    "id": "symbolLayer"+id,
    "type": "symbol",
    "source": "channelSource"+id,
    "layout": {
        "text-field": "{name}",
        "text-size": 15,
        "text-anchor":"center"
    },
    "paint": {
        "text-color": "#000000",
        "text-halo-color": "#ffffff",
        "text-halo-width": 0.8,
    },
});
}
export const clearMarker=()=>{
  if(qlPopup){
    qlPopup.remove()
  }
  if(czPopup){
    czPopup.remove()
  }
  if(mtPopup){
    mtPopup.remove()
  }
  if(hbPopup){
    hbPopup.remove()
  }
  if(jydPopup){
    jydPopup.remove()
  }
}
//加载深水面
export const channelPolygon= (id,data) =>{
  map.addSource("channelPSource"+id, {
    "type": "geojson",
    "data": data
  });
  map.addLayer({
    id: 'channelPLayer'+id,
    type: "fill",
    source: 'channelPSource'+id,
    layout: {
      "visibility": "visible" 
    },
    paint: {
      "fill-color": "rgb(241,241,241)",
      "fill-opacity": 0.3,
      "fill-outline-color": "rgb(241,241,241)"
    },
  });
}
export const routePath=(data) => {
  map.addSource("routeSource", {
    "type": "geojson",
    "data": data
  });
  map.addLayer({
    id: 'routeLayer',
    type: "line",
    source: 'routeSource',
    layout: {
      "visibility": "visible",
      // "line-join": "round",
      // "line-cap": "round", 
    },
    paint: {
      "line-width": 10,
      "line-color": "rgb(82,152,255)",
      "line-border-width":1,  //设置线边框宽度
      "line-border-opacity":1, //设置线边框透明度
      "line-border-color":'blue' //设置线边框颜色
    },
  });
}
