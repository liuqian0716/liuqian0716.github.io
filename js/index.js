/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-08 20:09:54
 * @version $Id$
 */

document.addEventListener('DOMContentLoaded', function(){

        var screen = document.querySelectorAll('.screen');
        var page1 = document.querySelector('.page1');
        var div1 = document.querySelectorAll('.div1');
        var rim = document.querySelectorAll('.rim');
        var content_word = document.querySelector('.content_word');
        
        var documentHeight = document.documentElement.clientHeight;
        var documentWidth = document.documentElement.clientWidth;
        for(var i=0;i<screen.length;i++){
            screen[i].style.cssText+="width:"+documentWidth+"px;height:"+documentHeight+"px";
        }

        for(var i=0;i<screen.length;i++){
            screen[i].style.left = documentWidth*i+'px';
        }
        page1.style.top = documentHeight/2-12+'px';

        //浏览器的窗口改变时，尺寸相应发生变化
        window.onresize=function(){
            documentHeight = document.documentElement.clientHeight;
            documentWidth = document.documentElement.clientWidth;
            for(var i=0;i<screen.length;i++){
                screen[i].style.cssText+="width:"+documentWidth+"px;height:"+documentHeight+"px";
            }
            for(var i=0;i<screen.length;i++){
                screen[i].style.left = documentWidth*i+'px';
            }
            //第三页下边的图片
            $('.allText').css('height',$('.allText').css('width'));
            for(var i=0;i<opened.length;i++){
                opened[i].style.left = push[i].offsetWidth+'px';
            }
            //整个页面的拖拽
            drag();
        }
        nestTab();
        //嵌套选项卡
        function nestTab(){
            var pushImg = document.querySelector('.pushImg');
            pushImg.style.height = documentHeight-64-88+'px';

            var ul = document.querySelector('.contentRight ul');
            //生成右侧的内容
            var li = '';
            for(var i=0;i<imgArr.length;i++){
                var cl = (i==0)?'choose':'';
                li+='<li><span class="'+cl+'"></span>'+imgArr[i].title+'</li>';
            }
            ul.innerHTML = li;

            var rightLi = document.querySelectorAll('.contentRight ul li');
            //点击右侧的
            for(var i=0;i<rightLi.length;i++){
                rightLi[i].index = i;
                rightLi[i].onclick = function(){
                    var curNum=this.index;
                    for(var i=0;i<rightLi.length;i++){
                        rightLi[i].children[0].className = '';
                    }
                    this.children[0].className = 'choose';
                    createLeft(this.index);
                }
            }
            
            var tabContent = document.querySelectorAll('.tabContent');
            createLeft(0);
            function createLeft(n){
                var img = document.querySelector('.Imgas img');
                var conLi = '';
                conLi = `<h3>${imgArr[n].left[1].label}</h3>
                    <div class="address">
                        <h4>${imgArr[n].left[1].address1}</h4>
                        <div>
                            <p><a href="javascript:;">${imgArr[n].left[1].address2}</a></p>   
                        </div>
                    </div>`;
                img.src=imgArr[n].left[0].img;
                tabContent[0].innerHTML = conLi;
                changeLeftImg(n);
            }
            function changeLeftImg(n){
                var item = document.querySelectorAll('.tabTitle .item');
                var tabContents = document.querySelector('.tabContents');
                item[0].onclick = function(){
                    tabContent[0].style.display = 'block';
                    tabContent[1].style.display = 'none';
                    addClass(this,'select');
                    removeClass(this.nextElementSibling,'select');
                    tabContents.style.top = '0px';
                }
                item[1].onclick = function(){
                    tabContent[0].style.display = 'none';
                    tabContent[1].style.display = 'block';
                    addClass(this,'select');
                    removeClass(this.previousElementSibling,'select');
                    tabContents.style.top = '0px';
                }

            }
        }

        function addClass(obj, sClass) { 
            var aClass = obj.className.split(' ');
            if (!obj.className) {
                obj.className = sClass;
                return;
            }
            for (var i = 0; i < aClass.length; i++) {
                if (aClass[i] === sClass) return;
            }
            obj.className += ' ' + sClass;
        }

        function removeClass(obj, sClass) { 
            var aClass = obj.className.split(' ');
            if (!obj.className) return;
            for (var i = 0; i < aClass.length; i++) {
                if (aClass[i] === sClass) {
                    aClass.splice(i, 1);
                    obj.className = aClass.join(' ');
                    break;
                }
            }
        }



        var scrollPage = document.querySelectorAll('.scrollBar');
        var opened = document.querySelectorAll('.opened');
        var text = document.querySelectorAll('.text');
        var scrollBar = 0;
        var offsetBar = 0;
        var push = document.querySelectorAll('.push');

        //页面没加载完就获取高度的话，获取的值会有问题，所以用延迟定时器
        setTimeout(function () {
            for(var i=0;i<push.length;i++){
                scrollBar = opened[i].scrollHeight;
                offsetBar = opened[i].offsetHeight;
                miniScroll(scrollBar,offsetBar,scrollPage[i],text[i],opened[i]);
                opened[i].style.left = push[i].offsetWidth+'px';
            }

            
        }, 10);

        //第四个页面下的部分
        var push4 = document.querySelector('.pushs4');
        var overlay = document.querySelector('.overlay');
        push4.onclick = function(ev){
            if(ev.target.className === 'images'){
                if( getComputedStyle(ev.target.nextElementSibling).opacity === '0' ){
                    ev.target.nextElementSibling.style.opacity = '1';
                    overlay.style.display = 'block';
                    ev.target.parentNode.style.zIndex = '13';
                    ev.target.nextElementSibling.style.visibility = 'visible';
                }else{
                    ev.target.nextElementSibling.style.opacity = '0';
                    overlay.style.display = 'none';
                    ev.target.parentNode.style.zIndex = '0';
                    ev.target.nextElementSibling.style.visibility = 'hidden';
                }
            }
            if(ev.target.className === 'overlay' || ev.target.className === 'close'){
                for(var i=0;i<opened.length;i++){
                    opened[i].style.opacity = '0';
                    overlay.style.display = 'none';
                    opened[i].parentNode.style.zIndex = '0';
                    opened[i].style.visibility = 'hidden';
                }
                
            }

        }


        //第四个页面
        function miniScroll(scrollBar,offsetBar,scrollPage,text,opened){
            if(offsetBar<scrollBar){
                scrollPage.style.cssText = "display:block;height:"+offsetBar/scrollBar*offsetBar+'px;'
            } 
            scrollPage.onmousedown = function(ev){
                var dixY = ev.pageY - scrollPage.offsetTop;

                scrollPage.onmousemove = function(ev){
                    var t = ev.pageY - dixY;
                    if(t<0){
                        t = 0;
                    }
                    if(t>offsetBar-scrollPage.offsetHeight){
                        t = offsetBar-scrollPage.offsetHeight;
                    }
                    var scale = t/(offsetBar - scrollPage.offsetHeight);
                    
                    text.style.top = -scale*(scrollBar - offsetBar)+'px';
                    scrollPage.style.top =  t +'px';
                }

                scrollPage.onmouseup = function(){
                    scrollPage.onmousemove = document.onmouseup = null;
                }
                return false;
            }
            myWheel(opened,function(down){
                var t = scrollPage.offsetTop;
                if(down){
                    t-=10;
                }else{
                    t+=10;
                }
                move(t);
            })

            function move(t){
                //console.log(t)
                if(t < 0){
                    t = 0;
                }else if(t > offsetBar-scrollPage.offsetHeight){
                    
                    t = offsetBar-scrollPage.offsetHeight;
                }
                //比例
                var scale = t/(offsetBar - scrollPage.offsetHeight);
                    
                text.style.top = -scale*(scrollBar - offsetBar)+'px';

                scrollPage.style.top =  t +'px';  
            
            }
        }

        function myWheel(obj,callBack){
        
            if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
            
                obj.addEventListener('DOMMouseScroll',fn1);
                
            }else{
                obj.addEventListener('mousewheel',fn1);
            }
        
            function fn1(ev){
                var down = 0;
                down = ev.wheelDelta?(ev.wheelDelta>0?true:false):(ev.detail < 0?true:false);
                
                callBack && typeof callBack === 'function' && callBack(down);
                
                ev.preventDefault();
            }
        }


        //适配用的
        fn();
        window.addEventListener("resize",fn);
        function fn() {
            var html = document.querySelector("html");
            var wid = html.getBoundingClientRect().width;
            html.style.fontSize = wid/20 + "px"; //得出来的结果不能小于12 ，68.3
        }

       //第三屏下边的内容
        var pushs3 = document.querySelector('.screen3 .pushs');
        var html='';
        for(var i=0;i<data.length;i++){
            html += `<a href="javascript:;">
                <span class="slip">
                <span class="text"> 
                    <span class="allText"></span>
                    <span class="cover">
                        <span class="date">
                            <strong>${data[i].day1}</strong>${data[i].day2}
                        </span>
                      
                        <span class="type">${data[i].trait}</span>
                        <span class="place">
                            <span class="pix fl"></span>
                            <span class="inner fl"> ${data[i].address}</span>
                        </span>
                    </span>
                </span>
                <span class="parentHover">
                    <img src=${data[i].img} alt="">
                        <span class="hover">
                            <span class="center">
                                <span>see</span>
                            </span>
                        </span>        
                    
                </span>
                </span>
            </a>`;               
        }
            pushs3.innerHTML = html;

        //获取元素的宽度
        $('.allText').css('height',$('.allText').css('width'));

        /*
            点击后让下边的滚动上来
         */
        var header = document.getElementsByTagName('header')[0];
        var slide = document.querySelectorAll('.slide');
        var mainBottom = document.querySelectorAll('.mainBottom'); 
        var pushs = document.querySelectorAll('.pushs');
        var pushs4 = document.querySelector('.screen4 .pushs4');
        // var pushs5 = document.querySelector('.screen5 .pushs5');
        var tabs = document.querySelector('.screen5 .tabs');
        var tabC = document.querySelector('.tabContents');
        var mainBottom_sub =document.querySelectorAll('.mainBottom_sub');


        roll(screen[1],slide[0],mainBottom[0],pushs[0],mainBottom_sub[0]);
        roll(screen[2],slide[1],mainBottom[1],pushs[1],mainBottom_sub[1]);
        roll(screen[3],slide[2],mainBottom[2],pushs4,mainBottom_sub[2]);
        roll(screen[4],slide[3],pushs[2],tabC,mainBottom_sub[3]);

        function roll(screen,slide,bottom,push,main_sub,callBack){
            var back = document.querySelector('.background');

            main_sub.onclick=function(){
                header.style.top = '0';
                slide.style.top = -back.scrollHeight+88+'px';;
            }

            screen.onmousewheel = function(ev){
                if(ev.wheelDelta>0){
                    header.style.top = '-88px';
                    slide.style.top = 0; 
                    // callBack && typeof callBack === 'function' && callBack();             
                }else{
                    bottom.style.display = 'block';
                    header.style.top = '0';
                    slide.style.top = -back.scrollHeight+88+'px';
                    if(documentHeight-88 <= bottom.scrollHeight){
                        bottom.onmousewheel =  function(ev){
                            
                            var hei=push.getBoundingClientRect();
                            //向上滚动时
                            if(ev.wheelDelta>0){
                                if(push.getBoundingClientRect().top >= 152){
                                    push.style.top = '0';
                                    return;
                                }else{
                                    var cc = parseInt(push.style.top);
                                
                                    push.style.top = cc+15+'px';
                                }
                                //向下滚动时
                            }else{
                                if(parseInt(push.getBoundingClientRect().bottom) <= documentHeight){
                
                                    return ;
                                }else{
                                    
                                    var cc = parseInt(push.style.top);
                                    push.style.top = cc-15+'px';
                                }
                            }
                            ev.cancelBubble=true;
                        }
                    }
                }
            }
        }
        

        var main2 = document.querySelector('.main2');
        var main3 = document.querySelector('.main3');
        var main4 = document.querySelector('.main4');
        var main5 = document.querySelector('.main5');
        visition(main2);
        visition(main3);
        visition(main4);
        visition(main5);
        //视差的函数
        function visition(oParent){
            
            var oDiv = oParent.getElementsByTagName('div');
            
            var middlePointX = documentWidth/2;
            var middlePointY = documentHeight/2;

            document.addEventListener('mousemove', fn1);

            function fn1(ev){
                var ev = ev || event;
                var num = 40;
                for(var i=0;i<oDiv.length;i++){
                    oDiv[i].style.left = (middlePointX - ev.pageX)/num  + "px";

                    oDiv[i].style.top = (middlePointY - ev.pageY )/num + "px";
                    num-=5;
                }
            }
        }

        //第一个页面鼠标移上去显示字母边框的效果

        $('.div1').each(function(i,e){
            $(e).mouseover(function(){
                var index = $(e).index('.div1');
                $('.rim').eq(index).stop().animate({
                    opacity:.4
                },400,function(){
                    $('.rim').eq(index).animate({
                        opacity:0
                    })
                })
            })
        })


       //另一版，页面的拖拽
        // var disX;
        // var allLeft;
        // //全局变量，储存拖拽状态
        // var isDrag = false;
        // //全局变量，储存拖动偏移量
        // var delta = 0;
        var all = document.querySelector('.all');
        // all.style.width = documentWidth*5+'px';

        // //鼠标按下事件，检测是否进入拖拽状态
        // document.onmousedown = function(ev){
        //     if(!(ev.target.tagName == 'INPUT')){
        //         delta = 0;
        //         isDrag = true;
        //         all.style.transition = '';
        //         allLeft = Math.abs(parseInt(all.style.left));
        //         disX = ev.pageX;

        //         ev.preventDefault();
        //     }
        // };

        // all.addEventListener('mousemove', fnmove);
        // all.addEventListener('mouseup', upup);
        // //鼠标移动事件，拖拽

        // function fnmove(ev){

        //     //若不在拖拽状态则退出
        //     if (isDrag === false) return;
        //     console.log(333)
        //     //all跟随鼠标运动
        //     var x = disX - ev.pageX + allLeft;
        //     if (disX < ev.pageX ) {
        //         all.style.left = -x + 'px';
        //         delta++;
        //     } else {
        //         all.style.left = -x + 'px';
        //         delta--;
        //     }
        // }


        // //鼠标按键抬起事件
        // function upup() {

        //     //若不在拖拽状态则退出
        //     if (isDrag === false) return;

        //     //当前allLeft值，不能用全局allLeft
        //     var allLeft = Math.abs(parseInt(all.style.left));
        //     all.style.transition = '.5s';

        //     //计算得到当前处于哪一屏，向下取整
        //     var rate = Math.floor(allLeft >= documentWidth ? allLeft / documentWidth : 0);
        //     if (delta > 10 && rate > 0) {
        //         //往后滑动
        //         all.style.left = -rate * documentWidth + 'px';
        //         // header.style.top = '-88px';
        //         // slide.style.top = 0;  
        //         // console.log(slide.style.top)
        //     } else if ( delta < (-10) && rate < 4 ) {
        //         //往前滑动
        //         rate++;

        //         all.style.left = -rate * documentWidth + 'px';
        //         // header.style.top = '-88px';
        //         // setTimeout(function(){
        //         //     slide.style.top = 0; 
        //         //     pushs.style.top = 0;
        //         // },1000)
               
        //     } else {
        //         //不滑动
        //         all.style.left = -rate * documentWidth + 'px';
        //     }
        //     //退出拖拽状态
        //     isDrag = false;
        // }



        var disX;
        var num=0 ;
        var downL ;
        var upL ;
        function drag(){
            //拖拽换屏
            all.style.width = documentWidth*5+'px';
            all.style.height = documentHeight + 'px';
            all.addEventListener('mousedown',fndown);
            
            function fndown(ev){
                if(ev.target.tagName == 'INPUT'){
                    ev.target.focus();
                }
 
                //+documentWidth*num
                all.style.transition = '';
                downL = all.style.left;
                disX = ev.pageX - all.offsetLeft;

                all.addEventListener('mousemove', fnmove);
                all.addEventListener('mouseup', fnup);
                ev.preventDefault();
            }
            var x;
            function fnmove(ev){
                x = ev.pageX - disX+'px';
                all.style.left = x;
    
            }
            function fnup(){
                upL = all.style.left;
                all.style.transition = '.5s';
                if(num==0){
                    if(downL<upL){

                        all.style.left = 0;
                    }else{
                        //向后切屏
                        if(parseInt(x)<-100){
                            all.style.left = -documentWidth+'px';
                            num++;
                        }else{
                            all.style.left = 0;
                        }
                    }
                    
                }else{
                    if(parseInt(downL)<parseInt(upL)){
                        //向前翻页
                        if(parseInt(x)>-documentWidth*(num)+100){
                            num--;
                            if(num<0){
                                num = 0;
                            }
                           all.style.left = -documentWidth*(num)+'px';   
                           header.style.top = '-88px'; 
                        }else{
                            all.style.left = -documentWidth*(num)+'px';
                        }
                    }else{
                        if(parseInt(x)<(-100+(-documentWidth)*num)){
                            //向后翻页
                            num++;
                            if(num>4){
                                 num = 4;
                            }
                            all.style.left = -documentWidth*(num)+'px';
                            header.style.top = '-88px';
                            // setTimeout(function(){
                            //     // console.log(slide[0].)
                            //     slide[0].removeAttribute('top');
                            //     slide[0].style.top = 0; 
                            //     pushs[0].style.top = 0;
                            // },10)
                        }else{
                            all.style.left = -documentWidth*(num)+'px';
                        }
                    }  
                }
                all.removeEventListener('mousemove', fnmove);
                all.removeEventListener('mouseup', fnup);
            }
        }
        drag();
        // all.onmousedown = function(ev){
        //     console.log(ev.target.tagName);
        //     if(!(ev.target.tagName === 'INPUT')){
        //         drag();
        //         // console.log(mainBottom_pic.offsetHeight)
        //     }
        // }
        


    })
