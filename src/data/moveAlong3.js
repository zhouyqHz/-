// 1、修复地图更改bearing对于小车运动方向计算的影响
// 2、修复锁定屏幕失效问题
export default class moveAlong {
    constructor(map, bottomParams, passedParams, carRotate, index) {
        this.map = map;
        this.bottomParams = bottomParams;
        this.passedParams = passedParams;
        this.carRotate = carRotate;
        this.carIndex = index;
        this.arrowPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA0UlEQVQ4T8WU3REBQRCEv46AUIgAGcgAGciADKRwIkAEhHAyIAMiaDVV6+XU/TiHeduH/bZnumdFx6WOefwOaLsPbICDpH3TTkoV2l4DqwSaSDo1gVYBB0BAesANCGheB62coe0psEuQCzCUFPDSqjXF9jLNMiC5pOFHwLhsOwNmCZRJWpRBaxU+L9qOeY7SeSEpHnmp/wALLW8lzVu3XDDlLCni1M7lQmyuwKB1bGyHkiMQK3gHxh8F+xurF8pin0+dfA51O9va5XfBjYPdFPwApyNKFZQYVU8AAAAASUVORK5CYII=";
        this.carPng = 'data:image/png;base64,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'
        this.newRouteCoords = [];
        // 标志小车是否在运动中
        this.carMoving = false;
        // 用于存储requestAnimationFrame对象
        this.carAnimation;
        // 小车运动计数
        this.counter = 0;
        // 已行驶小车轨迹数据
        this.movingCarData = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                },
            }]
        };
  
        // 锁定屏幕，默认锁定
        this.lockViewState = true;
    }
    // 增加原始轨迹数据源
    addBottomSource() {
        // 判断data是否是数组格式
        if (Array.isArray(this.bottomParams.path)) {
            // 增加底层轨迹线数据
            this.map.addSource("lineSource" + this.carIndex, {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": this.bottomParams.path
                        },
                    }]
                }
            });
        }
    }
    // 增加已行驶轨迹数据源
    addPassedSource() {
        // 增加已行驶轨迹线数据源
        this.map.addSource('passedParamsSource' + this.carIndex, {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        })
    }
    // 增加已行驶轨迹图层
    addPassedLayer() {
        let passedParams = this.passedParams;
        this.map.addLayer({
            "id": "passedParamsLayer" + this.carIndex,
            "type": "line",
            "source": "passedParamsSource" + this.carIndex,
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": passedParams.strokeColor,
                "line-opacity": passedParams.strokeOpacity,
                "line-width": passedParams.strokeWeight,
            },
            "minzoom": 7,
            "maxzoom": 17.5
        });
    }
    loadImage(url,name){
      this.map.loadImage(url,function(error,image){
        if (error) throw error;
        if (!this.map.hasImage(name)){
          this.map.addImage(name, image);
        }
      });
    }
    // 增加小车图标
    addCarSymbol(point, carRotate) {
     
        this.map.loadImage(this.carPng, (error, image) => {
            if (error) throw error;
  
            if (!this.map.hasImage('car')) {
                this.map.addImage('car', image);
            }
            console.log('这里',this.carIndex)
          //   if(!this.map.getSource("carSymbolSource")){
              this.map.addSource("carSymbolSource"+this.carIndex, {
                  type: 'geojson',
                  data: {
          
                      'type': 'FeatureCollection',
                      'features': [{
                          'type': 'Feature',
                          'geometry': {
                              'type': 'Point',
                              'coordinates': point
                          }
                      }]
                  
                }
             
              });
              this.map.addLayer({
                  "id": "carSymbolLayer"+this.carIndex,
                  "source": "carSymbolSource"+this.carIndex,
                  "type": "symbol",
                  "layout": {
                      "icon-image": "car",
                      "icon-size": 0.2,
                      'icon-rotation-alignment': 'map',
                      "icon-allow-overlap": false, //图标允许压盖
                      "icon-ignore-placement": true,
                      "icon-rotate": carRotate
                  }
              })
          //   }
            
        }) 
       
    }
    // 增加小车轨迹
    addCarTrack() {
        let bottomParams = this.bottomParams;
        let passedParams = this.passedParams;
        let path = bottomParams.path;
  
        this.addBottomSource(path, this.carIndex);
        this.addPassedSource(this.carIndex);
        this.map.addLayer({
            "id": "lineLayer" + this.carIndex,
            "type": "line",
            "source": "lineSource" + this.carIndex,
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-width": bottomParams.strokeWeight,
                "line-color": bottomParams.strokeColor,
                "line-opacity": bottomParams.strokeOpacity
            },
            "minzoom": 7,
            "maxzoom": 17.5
        });
  
            // 增加已行驶轨迹图层
            this.addPassedLayer({
                strokeWeight: passedParams.strokeWeight,
                strokeColor: passedParams.strokeColor,
                strokeOpacity: passedParams.strokeOpacity
            })
            // 增加小车图层及数据
          this.addCarSymbol(path[0], this.carRotate);
            
    }
    // 适配地图
    fitMap(path) {
        let route = {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": path
                }
        },
            // 调用turf API，计算边界
        bbox = turf.bbox(route);
        // 在指定的地理边界内平移和缩放地图，以包含其可见区域
        this.map.fitBounds(bbox, {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            }
        });
    }
  
    // 计算经纬度之间偏移角度
    calcAngle(pointStart, pointEnd) {
        // 经纬度转换为容器坐标
        let pStart = this.map.project([parseFloat(pointStart[0]), parseFloat(pointStart[1])]);
        let pEnd = this.map.project([parseFloat(pointEnd[0]), parseFloat(pointEnd[1])]);
  
        let diffX = pEnd.x - pStart.x,
            diffY = pEnd.y - pStart.y;
        // 计算方位角
        return (360 * Math.atan2(diffY, diffX) / (2 * Math.PI)) + this.map.getBearing();
    }
  
    // 小车开启运动
    startAnimation() {
        if (this.counter < this.newRouteCoords.length) {
            this.movingCarData.features[0].geometry.coordinates.push(this.newRouteCoords[this.counter]);
            // 小车位置更新
          //   let geo = turf.point(this.newRouteCoords[this.counter]);
          //   this.map.getSource('carSymbolSource' + this.carIndex).setData(geo);
          let geo = turf.point(this.newRouteCoords[this.counter]);
          //   if(this.map.getSource('carSymbolSource' + this.carIndex)){
              this.map.getSource('carSymbolSource' + this.carIndex).setData(geo);
  
          //   }
            // 计算方位角
            if (this.newRouteCoords[this.counter + 1]) {
                let curAngle = this.calcAngle(this.newRouteCoords[this.counter], this.newRouteCoords[
                    this.counter + 1]);
                if (this.map.getLayer('carSymbolLayer' + this.carIndex)) {
                    this.map.setLayoutProperty('carSymbolLayer' + this.carIndex, 'icon-rotate', curAngle);
                }
            }
            // 已行驶轨迹线数据更新
            this.map.getSource('passedParamsSource' + this.carIndex).setData(this.movingCarData);
            // 如果屏幕未锁定，屏幕随着小车运动平移
            if (!this.lockViewState) {
                this.map.setCenter(this.newRouteCoords[this.counter])
            }
        }
  
        if (this.counter < this.newRouteCoords.length) {
            this.counter++;
            this.carAnimation = requestAnimationFrame(this.startAnimation.bind(this));
        } else {
            this.carMoving = false;
            this.counter = 0;
            this.movingCarData.features[0].geometry.coordinates = [];
            cancelAnimationFrame(this.carAnimation);
        }
    }
  
    // 锁定屏幕，默认锁定
    lockView(bool) {
        if (!bool) {
            this.lockViewState = false;
        }
    }
  
    // 将路径均匀切分，使小车匀速运动
    getNewRoute(path, nstep, units) {
        let oldRoute = {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": path
                }
            },
            newRoute = {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": []
                }
            };
        // 获取路径起始点和终点间隔长度
        let lineDistance = turf.lineDistance(oldRoute);
        // 根据step均分线段
        let nDistance = lineDistance / nstep;
        for (let i = 0; i < path.length - 1; i++) {
            // 将经纬度数据转换为geojson数据
            let from = turf.point(path[i]);
            let to = turf.point(path[i + 1]);
            // 计算实际经纬度对应距离
            let lDistance = turf.distance(from, to, units);
            // 增加起始点
            if (i == 0) {
                newRoute.geometry.coordinates.push(path[0])
            }
            // 如果实际距离大于平均距离，将实际距离再次分割合并
            if (lDistance > nDistance) {
                let rings = this.splitLine(from, to, lDistance, nDistance, units)
                newRoute.geometry.coordinates = newRoute.geometry.coordinates.concat(rings)
            } else {
                newRoute.geometry.coordinates.push(oldRoute.geometry.coordinates[i + 1])
            }
        }
        return newRoute
    }
  
    // 将线段再次切分
    splitLine(from, to, distance, splitLength, units) {
        let step = parseInt(distance / splitLength)
        let leftLength = distance - step * splitLength
        let rings = []
        // 根据点数组创建线的GeoJson结构
        let route = turf.lineString([from.geometry.coordinates, to.geometry.coordinates])
        for (let i = 1; i <= step; i++) {
            let nlength = i * splitLength
            // 沿line返回指定具体的point数据
            let pnt = turf.along(route, nlength, units);
            rings.push(pnt.geometry.coordinates)
        }
        // 例如 5/2 为2 ,则将最后一个点设置为终点的经纬度信息
        if (leftLength > 0) {
            rings.push(to.geometry.coordinates)
        }
        return rings
    }
  
    // 小车开始移动
    startMove(path, speed) {
        // 增加判断，如果小车已经再运行中，再次点击不触发事件
        if (this.carMoving) {
            return false;
        } else {
            // 根据speed切分原有数据
            let nstep = speed,
                newRoute = this.getNewRoute(path, nstep, {
                    units: 'kilometers'
                });
            this.newRouteCoords = newRoute.geometry.coordinates;
            // 运动
            this.startAnimation();
            this.carMoving = true;
        }
    }
  
    // 小车停止运动
    stopMove() {
        this.carMoving = false;
        this.counter = 0;
        this.movingCarData.features[0].geometry.coordinates = [];
        cancelAnimationFrame(this.carAnimation);
    }
  
    // 小车暂停运动
    pauseMove() {
        if (this.carMoving) {
            cancelAnimationFrame(this.carAnimation);
        }
    }
  
    // 小车继续运动
    resumeMove() {
        if (this.carMoving) {
            this.startAnimation();
        }
    }
  }