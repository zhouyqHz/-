/**
 *Create By Zhangyuanyuan ON 2020/6/17
 */
export const autoSearchMixin = {
    data(){
        return{
            //高亮样式
            lightedIndex:-1
        }
    },
    methods:{
        //高亮智能搜索选项
        highlight(index){
            let body = this.$refs['searchBody'];
            if (index < 0 || !body || this.searchList.length === 0) {
                this.lightedIndex = -1;
                return;
            }
            let totalH = body.$el.offsetHeight;
            let eachH = body.$el.querySelector('.search_item').offsetHeight;
            let {scrollTop} = this.$refs["searchBody"].getPosition();
            let itemH = eachH*index;
            if (index >= this.searchList.length) {
                index = this.searchList.length - 1;
            }
            this.lightedIndex = index;
            if(itemH > totalH){
                this.$refs['searchBody'].scrollTo(
                    {y: Math.floor(itemH)},
                    100,
                    'easeInQuad'
                );
            }
            if(itemH < scrollTop){
                this.$refs['searchBody'].scrollTo(
                    {y: Math.floor(itemH)},
                    100,
                    'easeInQuad'
                );
            }
        },
        //enter建触发选择搜索
        enterSearch(){
            if(this.lightedIndex < 0){
                this.showSearchList = false;
                return;
            }
            this.clickSearchItem(this.searchList[this.lightedIndex]);
            this.lightedIndex = -1;
        },
    }
};