const devUrl = "https://minedata.cn";

//上海环境
const devOp = {
    key:"77ef70465c2d4888b3a5132523494b94",
    solution:'17655',
    styleUrl:"https://minedata.cn/service/solu/style/id/12879",
    domainUrl : 'https://minedata.cn',
	dataDomainUrl : 'https://minedata.cn',
	serverDomainUrl : 'https://minedata.cn',
	spriteUrl : 'https://minedata.cn/minemapapi/v3.3.0/sprite/sprite',
	serviceUrl : 'https://minedata.cn/service/'
};
//地图初始化方位参数
const MAP_OPTION = {
    zoom: 14,
    center:[120.86705699313787, 30.87248285761019],
    // center:  [ 121.208439999606412, 31.42168000003204 ],
    // center:[121.4865113, 31.2776173],
    pitch: 0,
    bearing: 0,
    minZoom: 3,
    maxZoom: 17,
};
//不同状态下的飞行配置
const POINT_OPTION={
    zoom: 9.5,
    center: [116.1866179, 39.992559],
    bearing: 0,
    pitch: 0,
};
const CLUSTER_OPTION={
    zoom: 3.5,
    center: [106.11854039763887, 36.700579871364795],
    bearing: 0,
    pitch: 0,
};
// module.exports = process.env.NODE_ENV === 'production' ? proOp : devOp;
module.exports = {devUrl,devOp,MAP_OPTION,POINT_OPTION,CLUSTER_OPTION};
