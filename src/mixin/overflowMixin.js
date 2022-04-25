/**
 *Create By Zhangyuanyuan ON 2020/6/17
 */
export const overflowMixin = {
    data(){
        return{
            nameMaxW:110,
            iconMaxW:180,
            showIconBk:false,
            namePopup:null
        }
    },
    mounted(){
        this.judgeW();
    },
    watch:{
        isIconOverflow(flag){
            this.showIconBk = flag;
        },
    },
    computed:{
        isIconOverflow(){
            return this.judgeW()
        },
    },
    methods:{
        //初始化时计算是否溢出
        judgeW(){
            let flag =false;
            this.$nextTick(()=>{
                if(!this.$refs['inner'+this.index]) return;
                let w = this.$refs['inner'+this.index].offsetWidth;
                if(w > this.iconMaxW * window.remScale){
                    flag = true;
                }else{
                    flag = false;
                }
                this.showIconBk = flag;
            });
            return flag
        },
        //鼠标移入图标框
        hoverIcon(e){
            let iconInner = e.target.firstChild;
            let maxW = Math.floor(this.iconMaxW * window.remScale);
            if(!iconInner) return;
            if(iconInner.offsetWidth > maxW){
                iconInner.classList.add('move_animate');
            }
        },
        //鼠标离开图标框
        leaveIcon(e){
            let iconInner = e.target.firstChild;
            if(!iconInner) return;
            iconInner.classList.remove('move_animate');
        },
        //鼠标移入名称
        hoverNum(e){
            let numDom = e.target.firstChild;
            if(this.namePopup){
                this.namePopup.remove();
                this.namePopup = null;
            }
            if(!numDom) return;
            let maxW = Math.floor(this.nameMaxW * window.remScale);
            if(numDom.offsetWidth < maxW) return;
            let num = numDom.innerText;
            let top = numDom.getBoundingClientRect().top-40;
            let htmlStr =
                `<div style=" position: absolute;top:${top+'px'};left: 0.3rem;border-radius: 0.04rem;min-width: 1rem;padding: 0 0.08rem;height:0.4rem;background: #455068;box-shadow:0 0 0.12rem 0 rgba(13,16,26,1);z-index: 9999;font-size:0.16rem;font-weight:500;color:#FFFFFF;line-height: 0.4rem;text-align: center;">
                        ${num}
                        <div style="position:absolute;bottom:-0.08rem;margin-left:-0.04rem;left:0.55rem;width: 0;height: 0;border-right:0.08rem solid transparent; border-left:0.08rem solid transparent;border-top:0.08rem solid #455068;"></div>
                     </div>`;
            let outer = document.createElement('div');
            outer.innerHTML = htmlStr;
            this.namePopup = outer;
            document.body.appendChild(this.namePopup);
        },
        //鼠标移出名称
        leaveNum(){
            if(this.namePopup){
                this.namePopup.remove();
                this.namePopup = null;
            }
        },
    },
    destroyed(){
        if(this.namePopup){
            this.namePopup.remove();
            this.namePopup = null;
        }
    }
};