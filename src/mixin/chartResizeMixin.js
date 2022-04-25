/**
 *Create By Zhangyuanyuan ON 2020/7/20
 */
export const chartResizeMixin = {
    data(){
        return{
            timeout:null,
            myChart:null,
        }
    },
    computed:{
        noDataOp(){
            return (params) => {
                let {x,noDataY,grid,unit,showXLabel} = params;
                return {
                    color: ['#414A5C'],
                    title: {
                        text: this.$t('mtc.chart.nd'),
                        top: '42%',
                        left: 'center',
                        textStyle: {
                            color: '#4e596b',
                            fontSize: 14,
                        }
                    },
                    grid: grid ? grid : {
                        containLabel: true,
                        top: '8%',
                        left: '3%',
                        right: '0.5%',
                        bottom: '5%',
                    },
                    legend: {show: false},
                    xAxis : [
                        {
                            type : 'category',
                            data : x,
                            axisTick: {
                                alignWithLabel: false,
                                inside: true,
                            },
                            axisLabel: {
                                interval: 0,// 强制显示所有标签
                                show: showXLabel!==undefined ? showXLabel : true,
                                rotate: 0,
                                margin: 8,
                                textStyle: {
                                    color: '#9EA3B5'
                                }
                            },
                            axisLine: {
                                lineStyle:{
                                    color:"#48536A"
                                }
                            },
                        }
                    ],
                    yAxis : [
                        {
                            axisLabel: {
                                show: true,
                                rotate: 0,
                                margin: 8,
                                textStyle: {
                                    color: '#9EA3B5'
                                }
                            },
                            type : 'value',
                            name:this.$t('score.chartName.score'),
                            nameLocation:'end',
                            max:100,
                            interval:20,
                            nameTextStyle:{
                                color:"#9EA3B5",
                                fontSize: 12,
                                fontWeight:400,
                                align: 'left',
                                padding:this.unitPadding
                            },
                            splitLine:{
                                lineStyle:{
                                    type:"dashed",
                                    color:"#48536A"
                                }
                            },
                            axisLine: {show: false},
                        }
                    ],
                    series: [
                        {
                            data: noDataY,
                            type: 'bar',
                            radius: ['50%', '63%'],
                            center: ["50%", "48%"],
                            silent: true,
                            labelLine: {
                                show: false
                            },
                        }
                    ]
                }
            }
        },
        //单位的位置在中英文下的调整
        unitPadding(){
            let padding;
            padding = this.lang === 'en' ? [0,0,0,-38] : [0,0,0,-30];
            return padding
        }
    },
    mounted(){
        window.addEventListener('resize',this.resizeChart);
        //resize事件解绑
        this.$once('hook:beforeDestroy', () => {
            window.removeEventListener('resize',this.resizeChart);
        })
    },
    methods:{
        //自适应图表
        resizeChart(){
            let that = this;
            if(that.timeout){
                clearTimeout(that.timeout);
                that.timeout = null;
            }
            that.timeout = setTimeout(function(){
                if(that.myChart){
                    that.myChart.resize();
                }
            },300);
        },
    }
};