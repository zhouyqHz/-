import wellknown from "@/assets/js/wellknown";
//解析fenceDetails--圆
export const circle2Feature = extend => {
  // arr.find(e=>e)
  return turf.circle(extend.point, extend.radius/1000);
};
export const rectangle2Feature = extend => {
  const { leftbottom, righttop } = extend;
  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          leftbottom,
          [leftbottom[0], righttop[1]],
          righttop,
          [righttop[0], leftbottom[1]],
          leftbottom
        ]
      ]
    }
  };
};
//解析fenceDetails--矩形，多边形，buffer
export const polygon2Feature = extend => {
  return {
    type: "Feature",
    geometry:{
      coordinates:extend.polygon,
      type:'Polygon'
    }
  };
};
//解析fenceDetails--线
export const line2Feature = extend => {
  return {
    type: "Feature",
    geometry:{
      coordinates:extend.line[0],
      type:'LineString'
    }
  };
};
//解析fenceDetails--起点
export const lineStartPoint = (fence, extend) => {
  return {
    type: "Feature",
    // geometry: wellknown.parse(extend.start),
    geometry: {
      type: "Point",
      coordinates: extend.sPoint
    },
    // properties: {
    //   id: fence.id,
    //   startaddr: extend.startAddr,
    //   icon: "start"
    // }
  };
};
//解析fenceDetails--终点
export const lineEndPoint = (fence, extend) => {
  return {
    type: "Feature",
    // geometry: wellknown.parse(extend.end),
    geometry: {
      type: "Point",
      coordinates: extend.ePoint
    },
  };
};
export const getFenceFeatures = (fence, extend) => {
  // debugger
  const f2f = [null,
    circle2Feature,
    polygon2Feature,
    polygon2Feature,
    line2Feature,
    polygon2Feature
  ];

  const features = [];
  // let num=
  const f = f2f[parseInt(fence.type)](extend);
  f.properties = fence;
  //type值转化为数字
  features.push(f);
  if (fence.type == 4) {
    const s = lineStartPoint(fence, extend);
    s.properties=Object.assign({}, fence, {
      startaddr: extend.startAddr,
      icon: "start"
    });
    features.push(s);
    const e = lineEndPoint(fence, extend);
    e.properties=Object.assign({}, fence, {
      endaddr: extend.endAddr,
      icon: "end"
    });
    features.push(e);
    const buffer = polygon2Feature(extend);
    buffer.properties=Object.assign({}, fence, {typename:'buffer'});
    features.push(buffer);
  }
  return features;
};

export const makePoint = (coordinates, properties) => {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates
    },
    properties
  };
};
export const makeFeature = (type, coordinates, properties) => {
  return {
    type: "Feature",
    geometry: {
      type,
      coordinates
    },
    properties
  };
};
export const makeFeatureCollection = features => {
  return {
    type: "FeatureCollection",
    features
  };
};

export const applytimeFormatter = item => {
  return (
    item.stime.substr(0, item.stime.length - 3) +
    "~" +
    item.etime.substr(0, item.etime.length - 3)
  );
};
