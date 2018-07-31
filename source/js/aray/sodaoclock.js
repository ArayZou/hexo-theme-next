$(document).ready(function(){
    if($('.mmclock').length){
        $('.mmclock').hide();
        getMMimg();
        getMMimg_gt();
        setInterval("secCanvas()", 100);
        setInterval("setmmimg()", 1000);
    }
});

//获取当前时间的图片信息
function getMMimg(){
    $.ajax({
        url: '/ajax/soudaoClock/gt',
        error:function(item){
            console.log('加载图片失败');
        },
        success: function(item){
            var json = eval(item);
            var src = json[0].path;
            if (src) {
                $(".mmclock").show();
                $(".mmclock").attr("href", src);
                $('.mmclock .mmclock_img_link').attr('href',src);
                $(".mmclock .mmclock_img").attr("src", src);
            }
        }
    });
}

//获取下一分钟的图片信息
function getMMimg_gt(){

    $.ajax({
        url: '/ajax/soudaoClock/gt1',
        error:function(mminfo){
            console.log('加载图片失败');
        },
        success: function(mminfo){
            var mminfo = eval(mminfo);
            mmsrc = mminfo[0].path;
            $('.mmclock').attr('data-nextimg',mmsrc);
        }
    });
}

//canvas绘制扇形倒计时
function secCanvas(){
    var myDate = new Date();
    var sec = myDate.getSeconds();
    var secDeg = (sec-1)*10 + Math.floor(myDate.getMilliseconds()/100);

    var cSec = $("#canvas_seconds").get(0);
    var ctx = cSec.getContext("2d");

    ctx.clearRect(0, 0, cSec.width, cSec.height);
    ctx.beginPath();
    ctx.strokeStyle = "#06c";

    ctx.arc(25,25,12.5, deg(0), deg(0.6*secDeg));
    ctx.lineWidth = 25;
    ctx.stroke();

    function deg(deg) {
        return (Math.PI/180)*deg - (Math.PI/180)*90
    }
}

//设置秒钟倒计时，每分钟的0秒替换图片并请求下一分钟的图片
function setmmimg(){
    var myDate = new Date();
    var sec = myDate.getSeconds();

    $('.seconds_block').text(sec);
    if(sec===0){
        $(".mmclock").attr("href", $('.mmclock').attr('data-nextimg'));
        $(".mmclock .mmclock_img").attr("src", $('.mmclock').attr('data-nextimg'));
        $('.mmclock .mmclock_img_link').attr('href',$('.mmclock').attr('data-nextimg'));
        getMMimg_gt();
    }
}
