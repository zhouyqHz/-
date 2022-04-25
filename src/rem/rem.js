/**
 *Create By Zhangyuanyuan ON 2019/10/26
 */
export default function(){
  let timeOut=null;
  //判断是否为mac
  // function isMac() {
  //   return /macintosh|mac os x/i.test(navigator.userAgent);
  // }
  function detectZoom (){
    let ratio = 0;
    if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = Math.round(window.outerWidth / window.innerWidth*100)/100;
    }
    //为什么会计算为0.99暂时不知道，做特殊处理
    ratio = ratio === 0.99 ? 1 : ratio;
    return ratio;
  }
  function rem() {
    let htmlEle = document.documentElement;
    let designRatio=16/9,screenRatio=htmlEle.clientWidth / htmlEle.clientHeight;
    let fontSizeRatio=screenRatio > designRatio ? (designRatio/screenRatio) : 1;
    let winWidth = htmlEle.clientWidth || document.body.clientWidth;
    let remScale = Math.round((winWidth / 1920)*fontSizeRatio*detectZoom()*1000) / 1000;
    window.remScale = remScale;
    htmlEle.style.fontSize = (100 * remScale).toFixed(3) + 'px';
  }
  rem();
  window.addEventListener('resize',function(){
    if(timeOut){
      clearTimeout(timeOut);
      timeOut=null;
    }
    timeOut=setTimeout(rem,200);
  });
}
