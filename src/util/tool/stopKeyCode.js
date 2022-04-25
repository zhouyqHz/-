/**
 *Create By Zhangyuanyuan ON 2020/6/1
 */
const stopCodeArr = [40,38];
export default function(){
    document.onkeydown = null;
    function stopKeyCode(e){
        e = e || window.event;
        let par = document.querySelectorAll(".el-autocomplete-suggestion__list")[0];
        if(par&&stopCodeArr.includes(e.keyCode)){
            let fc = par.firstChild;
            if(["暂无数据","No Result"].includes(fc.innerText)){
                fc.classList = [];
            }
        }
    }
    document.onkeydown = stopKeyCode;
}