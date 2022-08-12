window.addEventListener('load',function() {
    var mask = document.querySelector(".mask");
    var big = document.querySelector(".big");
    var preimg = document.querySelector(".pre-img");
    preimg.addEventListener('mousemove',function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })

    preimg.addEventListener('mouseout',function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preimg.addEventListener('mousemove',function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskMax = preimg.offsetWidth - mask.offsetWidth;
        console.log(x+"and"+y);
        if(maskX <= 0){
            maskX = 0;
        }else if(maskX >= maskMax){
            maskX = maskMax;
        }
        if(maskY <= 0){
            maskY = 0;
        }else if(maskY >= maskMax){
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        var bigImg = document.querySelector(".bigImg");
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax  / bigMax;
        var bigY = maskY * bigMax / bigMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })
})