var btn = document.querySelector('button');
var text = document.querySelector('input');
var con = document.querySelector('.con');
var ul = document.querySelector('ul');
text.addEventListener('focus',function(){
    if(text.value == ''){
        return false;
    }else{
        con.className = 'con appear';
    }
})
text.addEventListener('blur',function(){
    con.className = 'con';
})
text.addEventListener('keyup',function(){
    con.className = 'con appear';
    con.innerHTML = text.value;
})
btn.onclick = function(){
    if(text.value == '' || text.value === '说些什么吧'){
        alert('说点什么吧');
    }else{
        var li = document.createElement('li');
        li.innerHTML = text.value + "<a href='javascript:;'>删除</a>";
        ul.insertBefore(li,ul.children[0]);
        // 删除评论
        var as = document.querySelectorAll('a');
        for(var i = 0;i < as.length;i++){
            as[i].onclick = function(){
                ul.removeChild(this.parentNode);
            }
        }
        text.value = '';
    }
}
var s = 4;
var timer = null;
btn.addEventListener('click',function(){
    btn.disabled = true;
    timer = setInterval(function(){
        btn.innerHTML = s+'秒后可再次发布';
        s -= 1;
        if(s == -1){
            clearInterval(timer);
            btn.disabled = false;
            btn.innerHTML = '发布';
            s = 5;
        }
    },1000)
})
