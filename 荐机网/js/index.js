window.addEventListener("load",function () { 
    var tabs = document.getElementsByName('tab');
    var contents = document.getElementsByName('divcontent');
    var text = document.querySelector(".text");
    var sliderbox = document.querySelector(".slider-box");
    var banner = document.querySelector(".banner");
    var usericon = document.querySelector(".usericon");
    var con1 = document.querySelector(".con1");
    var con2 = document.querySelector(".con2");
    var backTop = document.querySelector(".backTop");
    var con5 = document.querySelector(".con5");
    var subimage = document.querySelector(".subimage");
    var focus = document.querySelector(".focus");
    var prev = document.querySelector(".prev");
    var next = document.querySelector(".next");
    var subpoint = document.querySelector(".subpoint");
    var item = document.querySelector(".item");
    var menubox = document.querySelector(".menubox");
    var bg = document.querySelector(".search-bg");
    var close = document.querySelector(".close-img");
    var notebook = document.querySelector(".notebook");
    
    // 搜索框内字体变化
    text.addEventListener('focus',function() {
        console.log("hao");
        bg.style.display = "block";
        if(this.value === "搜索:手机品牌/手机参数"){
            this.value = '';
        }
        close.style.display = "block";
        this.style.color = "black";
    });
    text.addEventListener('blur',function() {
        bg.style.display = "none";
        if(this.value == ""){
            this.value = '搜索:手机品牌/手机参数';
            close.style.display = "none";
        }      
        this.style.color = "#ccc";
    });
    //搜索框清除按钮
    $(close).click(function() {
        text.value = "";
        close.style.display = "none";
    })
    //给左侧菜单栏添加事件
    for(var i = 0;i < item.children.length;i++){
        item.children[i].setAttribute('data-index',i);
        item.children[i].addEventListener('mouseenter',function() {
            var index = this.getAttribute("data-index");
            menubox.children[index].style.display = 'block';
        });
        item.children[i].addEventListener('mouseleave',function() {
            var index = this.getAttribute("data-index");
            menubox.children[index].style.display = 'none';
        });
    }
    // 保持弹出的左侧边栏
    for(var i = 0;i < menubox.children.length;i++){
            menubox.children[i].addEventListener('mouseenter',function(){
            this.style.display = 'block';
        })  
            menubox.children[i].addEventListener('mouseleave',function(){
            this.style.display = 'none';
        })
    }
    
    // 自动调整左侧菜单栏弹出位置
    for(var i = 0;i < menubox.children.length;i++){
        menubox.children[i].style.marginTop = i * 50 + "px";
    }

    
    // 轮播图移动ul，要获得ul的宽度
    var focusWidth = subimage.offsetWidth;
    //轮播图小箭头的出现/隐藏
    $(subimage).on({
        mousemove: function() {
            $(prev).css("display","block");
            $(next).css("display","block");
            clearInterval(timer);
            timer = null;
        },
        mouseout: function () {
            $(prev).css("display","none");
            $(next).css("display","none");
            timer = setInterval(function() {
                next.click();
            },2000);
        }
    });
    //轮播图左右箭头事件
    var num = 0;
    //轮播图小圆圈控制变量
    var circle = 0;
    // 节流阀flag
    var flag = true;
    // 左箭头点击事件
    prev.addEventListener('click',function() {
        if(flag){
            flag = false;
            if(num == 0){
                num = focus.children.length - 1;
                focus.style.left = -num * focusWidth +'px';
            }
            num--;
            animate(focus, -num * focusWidth,function() {
                flag = true;
            });
            circle--;
            //如果circle小于0就是需要跳转到最后一张图片
            if(circle < 0){
                circle = subpoint.children.length - 1;
            }
            circleChange();
        }
    })
    // 右箭头点击事件
    next.addEventListener('click',function() {
        if(flag){
            flag = false;
            // 走到最后一张图片时快速复原到第一张图片
            if(num == focus.children.length - 1){
                focus.style.left = 0;
                num = 0;
            }
            num++;
            animate(focus, -num * focusWidth,function() {
                flag = true;
            });
            circle++;
            //如果circle等于最大图片数置零
            if(circle == subpoint.children.length){
                circle = 0;
            }
            circleChange();
        }
    });

    //轮播图小圆圈排他
    function circleChange(){
            for(var i = 0;i < subpoint.children.length; i++){
            subpoint.children[i].className = '';
        }
        subpoint.children[circle].className = "selected";
    }
    
    //轮播图动态生成小圆点
    for(var i = 0;i < focus.children.length; i++){
        var li = document.createElement("li");
        //生成li的索引号
        li.setAttribute('index',i);
        // 向ul中插入li
        subpoint.appendChild(li);
        //为轮播图的小圆点添加点击事件
        li.addEventListener('click',function() {
            for(var i = 0; i < subpoint.children.length; i++){
                //清楚其他li的样式
                subpoint.children[i].className = "";
            }
            // 将被点击的li类名改为selected
            this.className = "selected";
            // 得到被点击的li的索引号
            var index = this.getAttribute("index");
            num = index;
            circle = index;
            //移动函数
            animate(focus,-index * focusWidth);
        })
    }

    //设置第一个li为selected
    subpoint.children[0].className = "selected";
    //克隆第一张图片
    var first = focus.children[0].cloneNode(true);
    focus.appendChild(first);

    // 自动轮播
    var timer = setInterval(function() {
        next.click();
    },2000);

    // banner到顶端的数值
    var bannerTop = banner.offsetTop;
    // 侧边栏固定变化后的数值
    var sliderboxTop = sliderbox.offsetTop - bannerTop;
    // 购机指南点击事件
    for(var i = 0; i< tabs.length;i++){
        tabs[i].index = i;
        tabs[i].onclick = function(){ 
            for(var i = 0; i<tabs.length;i++){
                tabs[i].className="";
                this.className = 'selected';
                contents[i].style.display="none";
            };
            contents[this.index].style.display = 'block';
        }
    }
    //固定右侧边栏
    document.addEventListener('scroll',function() {
        if(window.pageYOffset >= 116){
            backTop.style.display = 'block';
            sliderbox.style.position = 'fixed';
            sliderbox.style.top = sliderboxTop+ 'px';
        }else{
            backTop.style.display = 'none';
            sliderbox.style.position = 'absolute';
            sliderbox.style.top = '420px';
        }
    })

    // 精灵图组件弹出动画
    function pop(obj){
        if(flag){
            flag = false;
            animate(obj, -120,function () {
                flag = true;
            });
            obj.style.background = 'rgb(68, 70, 182)';
        }
    }
    // 精灵图收回动画
    function recover(obj){
        if(flag){
            flag = false;
            animate(obj, 0,function () {
                flag = true;
            });
            obj.style.background = 'rgb(146, 148, 243)';
        }
    }
    // 用户中心精灵图动画
    $(usericon).mouseenter(function () { 
        pop(con1);
    });
    $(usericon).mouseleave(function () { 
        recover(con1);
    });
    // 荐机记事本精灵图动画
    notebook.addEventListener('mouseenter',function() {
        pop(con2);
    })
    notebook.addEventListener('mouseleave',function() {
        recover(con2);
    })
    // 返回顶部精灵图动画
    backTop.addEventListener('mouseenter',function() {
        pop(con5);
    })
    backTop.addEventListener('mouseleave',function() {
        recover(con5);
    })
    // 点击按钮，返回顶部
    $(".backTop").click(function() {
        $("body, html").stop().animate({
            scrollTop: 0
        });
    });
    //缓动动画加上回调函数
    function animate(obj,target,callback) {
        //先清除之前的定时器
        clearInterval(obj.tiemr);
        //给不同元素指定不同的定时器
        obj.timer = setInterval(function() {
            //变化的移动值
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(obj.offsetLeft == target){
                //停止定时器
                clearInterval(obj.timer);
                //把回调函数写到定时器结束位置
                if(callback){
                    callback();
                }
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        })
    }
})

