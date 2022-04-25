export const CURRENT_MAP={
  //地图map对象
  map:{},
  //存储id的数组，用来控制图层
  idArr:[],
};
//返回当前map对象
export const getCurrentMap = function(){
  return CURRENT_MAP.map;
};
//设置当前map对象
export const setCurrentMap = function(map){
  CURRENT_MAP.map=map;
};
//读取icon图片资源
export const loadImage=function(url,name){
  CURRENT_MAP.map.loadImage(url,function(error,image){
    if (error) throw error;
    CURRENT_MAP.map.addImage(name, image);
  });
};
//添加线图层（带箭头的线，第一种实现方式，线和箭头并不完全重合）
export const createLineLayer=function(id,geoJsonData,layout,paint,arrowOption,filter){
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    var layerObj={
      "id": id,
      "type": "line",
      "source": id,
      "layout": {
        "line-join": "round",
        "line-cap": "round",
      },
      "paint": {
        "line-color": "red",
        "line-width": 2,
        "line-opacity": 1
      }
    };
    if(filter) layerObj.filter=filter;
    if(layout) layerObj.layout=layout;
    if(paint) layerObj.paint=paint;
    CURRENT_MAP.map.addLayer(layerObj);
    //添加线箭头
    if(arrowOption&&arrowOption.showArrow){
      CURRENT_MAP.map.addLayer({
        "id": id+"_arrow",
        "type": "symbol",
        "source": id,
        "layout": {
          "symbol-placement": "line",
          "icon-allow-overlap": true,
          "icon-image": arrowOption.arrowIcon ? arrowOption.arrowIcon :"default",
          "icon-size": arrowOption.arrowSize ? arrowOption.arrowSize : 0.1
        },
        "paint": {
          "icon-color": "red"
        }
      });
    }
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
    //if(CURRENT_MAP.map.getSource(id+"_arrow"))CURRENT_MAP.map.getSource(id+"_arrow").setData(geoJsonData.data);
  }
};
//添加带箭头的线（第二种实现方式，线和箭头完全重合）
export const createLineWithIcon=function(id,geoJsonData,layout,paint,arrowOption,filter){
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    //添加线图层
    var layerObj={
      "id": id,
      "type": "line",
      "source": id,
      "layout": {
        "line-join": "round",
        "line-cap": "round",
      },
      "paint": {
        "line-color": "red",
        "line-width": 2,
        "line-opacity": 0,
      }
    };
    //添加箭头图层
    if(filter) layerObj.filter=filter;
    if(layout) layerObj.layout=layout;
    if(paint) layerObj.paint=paint;
    CURRENT_MAP.map.addLayer(layerObj);
    if(arrowOption&&arrowOption.showArrow){
      // console.log("打线");
      CURRENT_MAP.map.addLayer({
        "id": id+"_arrow",
        "type": "line",
        "source": id,
        "layout": {
          "line-join": "round",
          "line-cap": "round",
        },
        "paint": {
          "line-width": 16,
          "line-opacity": 1,
          "line-pattern":"greenArrow"
        }
      });
    }
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
  }
};
//添加带箭头的线（只有线图标）
export const createLineOnlyIcon=function(id,geoJsonData,layout,paint,arrowOption,filter){
    if(CURRENT_MAP.idArr.indexOf(id)==-1){
        CURRENT_MAP.idArr.push(id);
        CURRENT_MAP.map.addSource(id,geoJsonData);
        //添加线图层
        // var layerObj={
        //     "id": id,
        //     "type": "line",
        //     "source": id,
        //     "layout": {
        //         "line-join": "round",
        //         "line-cap": "round",
        //     },
        //     "paint": {
        //         "line-width": 2,
        //         "line-opacity": 1,
        //         "line-pattern":"carNormal"
        //     }
        // };
        var layerObj={
            "id": id,
            "type": "symbol",
            "source": id,
            "layout": {
                "symbol-placement": "line",
                "icon-allow-overlap": true,
                "icon-image": "carNormal",
                "icon-size": 0.8
            },
            "paint": {
                "icon-color": "red"
            }
        };
        if(filter) layerObj.filter=filter;
        if(layout) layerObj.layout=layout;
        if(paint) layerObj.paint=paint;
        CURRENT_MAP.map.addLayer(layerObj);
    }else{
        if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
    }
};
//添加面图层
export const createPolygonLayer=function(id,geoJsonData,layout,paint,filter){
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    var layerObj={
      "id": id,
      "type": "fill",
      "source": id,
      "paint": {
        "fill-color": '#ff0000',
        "fill-opacity": 1,
        "fill-outline-color": '#fff000',
      },
    };
    if(filter) layerObj.filter=filter;
    if(layout) layerObj.layout=layout;
    if(paint) layerObj.paint=paint;
    CURRENT_MAP.map.addLayer(layerObj);
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
  }
};
//添加circle图层
export const createCircleLayer=function(id,geoJsonData,layout,paint,filter){
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    var layerObj={
      "id": id,
      "type": "circle",
      "source": id,
      "paint": {
        'circle-radius': 8,
        'circle-color':"red",
        "circle-blur":1,
        "circle-opacity":1,
        "circle-stroke-width":1,
        "circle-stroke-color":"blue",
        "circle-stroke-opacity":0.8,
      },
    };
    if(filter) layerObj.filter=filter;
    if(layout) layerObj.layout=layout;
    if(paint) layerObj.paint=paint;
    CURRENT_MAP.map.addLayer(layerObj);
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
  }
};
//添加tracking图层
export const createTrackLayer=function(id,geoJsonData,layout,paint,filter){
    if(CURRENT_MAP.idArr.indexOf(id)==-1){
        CURRENT_MAP.idArr.push(id);
        CURRENT_MAP.map.addSource(id,geoJsonData);
        var layerObj={
            "id": id,
            "type": 'tracking',
            "source": id,
            "source-layer": geoJsonData.type=="vector" ? 'link' : '',
            "layout": {
                "tracking-join": "round",
                "tracking-cap": "round",
                "tracking-display-mode":"loop-reserve"
            },
            "paint": {
                'tracking-speed': 1,
                "tracking-type": "real-time",
                "tracking-color": "rgb(255,186,1)",
                "tracking-opacity": 0.6,
                "tracking-width": 2.5,
                "tracking-seg-group": 50,
            }
        };
        if(filter) layerObj.filter=filter;
        if(layout) layerObj.layout=layout;
        if(paint) layerObj.paint=paint;
        CURRENT_MAP.map.addLayer(layerObj);
    }else{
        if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
    }
};
//添加标记图层
export const createSymbolLayer=function(id,geoJsonData,layout,paint,filter,min,max){
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    var layerObj={
      "id": id,
      "type": "symbol",
      "source": id,
      "layout": {
        "icon-image":"default",
        "icon-size": 0.6,
      },
    };
    if(min) layerObj.minzoom=min;
    if(max) layerObj.maxzoom=max;
    if(filter) layerObj.filter=filter;
    if(layout) layerObj.layout=layout;
    if(paint) layerObj.paint=paint;
    CURRENT_MAP.map.addLayer(layerObj);
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
  }
};
//添加航线od图层
export const createOdLayer=function(id,geoJsonData,lineLayout,linePaint,lineFilter,moveLayout,movePaint,moveFilter){
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    //添加静态线
    var layerLineObj={
      "id": id+"_normal_line",
      "type": "airline",
      "source": id,
      "paint": {
        "airline-seg-count": 400,
        "airline-seg-group": 10,
        "airline-speed": 200,
        "airline-type": "none",
        "airline-color": {
          "property": "count",
          "stops": [
            [0, "#C8F9F9"],
            [200, "#00F8FF"],
            [400, "#00FF00"],
            [600, "#FFF800"],
            [800, "#FF0000"]
          ]
        },
        "airline-width": 2,
        "airline-opacity": 0.6
      },
      "minzoom": 3,
      "maxzoom": 8
    };
    if(lineFilter) layerLineObj.filter=lineFilter;
    if(lineLayout) layerLineObj.layout=lineLayout;
    if(linePaint) layerLineObj.paint=linePaint;
    var layerMoveLineObj={
      "id": id+"_move_line",
      "type": "airline",
      "source": id,
      "paint": {
        "airline-seg-count": 500,
        "airline-seg-group": 10,
        "airline-speed": 200,
        "airline-type": "real-time",
        "airline-color": {
          "property": "count",
          "stops": [
            [0, "#C8F9F9"],
            [200, "#00F8FF"],
            [400, "#00FF00"],
            [600, "#FFF800"],
            [800, "#FF0000"]
          ]
        },
        "airline-width": 5,
        "airline-opacity": 0.9
      },
      "minzoom": 3,
      "maxzoom": 8
    };
    if(moveFilter) layerMoveLineObj.filter=moveFilter;
    if(moveLayout) layerMoveLineObj.layout=moveLayout;
    if(movePaint) layerMoveLineObj.paint=movePaint;
    CURRENT_MAP.map.addLayer(layerLineObj);
    CURRENT_MAP.map.addLayer(layerMoveLineObj);
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
  }
};
//创建聚合效果
export const createClusterLayer=function(id,geoJsonData,clusterOption,originLayerOption,clusterLayerOption,labelLayerOption){
  //设置聚合效果
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    ////设置聚合效果
    geoJsonData.cluster=true;
    //显示局和效果的最大zoom
    geoJsonData.clusterMaxZoom=clusterOption[clusterMaxZoom] ? clusterOption[clusterMaxZoom] : 14;
    //聚合与聚合之间的距离
    geoJsonData.clusterRadius=clusterOption[clusterRadius] ? clusterOption[clusterRadius] : 50;
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    //聚合前图层
    var originLayer={
      "id": id,
      "type": "symbol",
      "source": id,
      "filter": ["!has", "point_count"],
      "layout": {
        "icon-image": "default_circle",
        "icon-size": 0.6,
      },
      "paint":{
        "text-color":"#ffffff",
      }
    };
    if(originLayerOption&&originLayerOption.layout) originLayer.layout=originLayerOption.layout;
    if(originLayerOption&&originLayerOption.paint) originLayer.paint=originLayerOption.paint;
    if(originLayerOption&&originLayerOption.filter) originLayer.filter=originLayerOption.filter;
    CURRENT_MAP.map.addLayer(originLayer);
    //添加聚合
    var clusterLayer={
      id: id+"_cluster",
      type: "circle",
      source: id,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#00a8f3",
          5,
          "#2e2ec5",
          10,
          "#6767b8"
        ],
        "circle-radius": 15
      }
    };

    if(clusterLayerOption&&clusterLayerOption.layout) clusterLayer.layout=clusterLayerOption.layout;
    if(clusterLayerOption&&clusterLayerOption.paint) clusterLayer.paint=clusterLayerOption.paint;
    CURRENT_MAP.map.addLayer(clusterLayer);
    //添加聚合文字
    var labelLayer={
      id: id+"_text",
      type: "symbol",
      source: id,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-size": 18
      },
      "paint":{
        "text-color":"white",
      }
    };
    if(labelLayerOption&&labelLayerOption.layout) labelLayer.layout=labelLayerOption.layout;
    if(labelLayerOption&&labelLayerOption.paint) labelLayer.paint=labelLayerOption.paint;
    CURRENT_MAP.map.addLayer(labelLayer);
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
  }
};
//创建热力效果
export const createHeatLayer=function(id,geoJsonData,layout,paint,filter){
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    var layerObj={
      "id": id,
      "type": "heatmap",
      "source":id,
      "paint": {
        "heatmap-weight": [  //设置热值，根据资源中的sum字段进行线性插值
          "interpolate",
          ["linear"],
          ["get", "hot"], //获取资源feature中的properties中的hot值进行动态生成
          0,1,
          10,10
        ],
        "heatmap-intensity": [  //通过缩放级别调整热图颜色重量权重
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 1,
          20, 1
        ],
        "heatmap-color": [   //设置热力颜色色阶，从外圈到内圈
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "rgba(33,102,172,0)",//透明
          0.2, "rgb(62,104,248)",//深蓝
          0.3, "rgb(52,251,248)",//淡蓝
          0.4, "rgb(199,251,117)",//绿
          0.6, "rgb(247, 255, 41)",//黄
          0.7, "rgb(255,133,11)",//橙
          0.9, "rgb(243,52,34)",//红
          1, "rgb(183,30,35)"//深红
        ],
        "heatmap-radius": [//通过缩放级别调整热图圆圈点半径
          "interpolate",
          ["linear"],
          ["zoom"],
          0, 6,
          13, 8
        ],
        "heatmap-opacity": [ //通过缩放级别调整热图透明度
          "interpolate",
          ["linear"],
          ["zoom"],
          7, 0.5,
          20, 0.7
        ],
      }
    };
    if(filter) layerObj.filter=filter;
    if(layout) layerObj.layout=layout;
    if(paint) layerObj.paint=paint;
    CURRENT_MAP.map.addLayer(layerObj);
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
  }
};
//创建柱状图
export const createBarLayer=function(id,geoJsonData,layout,paint,filter){
  if(CURRENT_MAP.idArr.indexOf(id)==-1){
    CURRENT_MAP.idArr.push(id);
    CURRENT_MAP.map.addSource(id,geoJsonData);
    var layerObj={
      "id": id,
      'type': 'histogram',
      'source':  id,
      'layout': {
        'histogram-max-height-render': true,/*是否开启柱状图极大高度控制*/
        "histogram-color-render":true
      },
      'paint': {
        "histogram-colors": ['rgb(62,104,248)', 'rgb(199,251,117)','rgb(247, 255, 41)', 'rgb(255,133,11)', 'rgb(183,30,35)'],
        'histogram-max-height': 100,
        'histogram-height': {
          'type': 'identity',
          'property': 'levels'
        }, /*高度*/
        'histogram-base': 0,/*基础高度*/
        'histogram-opacity': 0.8
      }
    };
    if(filter) layerObj.filter=filter;
    if(layout) layerObj.layout=layout;
    if(paint) layerObj.paint=paint;
    CURRENT_MAP.map.addLayer(layerObj);
  }else{
    if(CURRENT_MAP.map.getSource(id))CURRENT_MAP.map.getSource(id).setData(geoJsonData.data);
  }
};
//删除指定的layer
export const removeLayer=function(id){
  var idIndex=CURRENT_MAP.idArr.indexOf(id);
  if(idIndex==-1) return;
  //针对线箭头
  if(CURRENT_MAP.map.getLayer(id+"_arrow"))CURRENT_MAP.map.removeLayer(id+"_arrow");
  if(CURRENT_MAP.map.getLayer(id)) CURRENT_MAP.map.removeLayer(id);
  //以下两个图层删除，针对聚合效果的聚合图层和文字图层
  if(CURRENT_MAP.map.getLayer(id+"_text")) CURRENT_MAP.map.removeLayer(id+"_text");
  if(CURRENT_MAP.map.getLayer(id+"_cluster")) CURRENT_MAP.map.removeLayer(id+"_cluster");
  //od效果图图层
  if(CURRENT_MAP.map.getLayer(id+"_normal_line")) CURRENT_MAP.map.removeLayer(id+"_normal_line");
  if(CURRENT_MAP.map.getLayer(id+"_move_line")) CURRENT_MAP.map.removeLayer(id+"_move_line");
  if(CURRENT_MAP.map.getSource(id)) CURRENT_MAP.map.removeSource(id);
  CURRENT_MAP.idArr.splice(idIndex,1);
};
//删除所有的图层
export const removeAllLayer=function(){
  if(CURRENT_MAP.idArr.length==0) return;
  CURRENT_MAP.idArr.forEach(function(id){
    if(CURRENT_MAP.map.getLayer(id+"_arrow"))CURRENT_MAP.map.removeLayer(id+"_arrow");
    if(CURRENT_MAP.map.getLayer(id)) CURRENT_MAP.map.removeLayer(id);
    //以下两个图层删除，针对聚合效果的聚合图层和文字图层
    if(CURRENT_MAP.map.getLayer(id+"_text")) CURRENT_MAP.map.removeLayer(id+"_text");
    if(CURRENT_MAP.map.getLayer(id+"_cluster")) CURRENT_MAP.map.removeLayer(id+"_cluster");
      //od效果图图层
    if(CURRENT_MAP.map.getLayer(id+"_normal_line")) CURRENT_MAP.map.removeLayer(id+"_normal_line");
    if(CURRENT_MAP.map.getLayer(id+"_move_line")) CURRENT_MAP.map.removeLayer(id+"_move_line");
    if(CURRENT_MAP.map.getSource(id)) CURRENT_MAP.map.removeSource(id);
  });
  CURRENT_MAP.idArr=[];
  //console.log( CURRENT_MAP.idArr);
};
//自动设置视图缩放
export const setAutoSize=function(coos,padding){
  let lngArr=[],latArr=[];
  if (coos) {
    coos.forEach((arr)=>{
      lngArr.push(arr[0]);
      latArr.push(arr[1]);
    });
    let minx=Math.min(...lngArr);
    let maxx=Math.max(...lngArr);
    let miny=Math.min(...latArr);
    let maxy=Math.max(...latArr);
    let arr = [[minx, miny], [maxx, maxy]];
    CURRENT_MAP.map.fitBounds(minemap.LngLatBounds.convert(arr),{padding:padding ? padding : 0});
  }
};


