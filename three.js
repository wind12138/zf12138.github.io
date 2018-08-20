// JavaScript Document

var img_n = 1;
var imgs = [];

/*初始化图片*/
for (var i = 0;i<4;i++){
    imgs[i] = new Image();
    imgs[i].src = "img/img-"+(i+1).toString()+".png";
}
i = null;

window.onload = function() {
    var b_img = document.querySelectorAll("#bannar div:nth-child(n+2) img");
    var b_div = document.querySelectorAll("#bannar div:nth-child(n+2)");
    init_bannar(b_div,b_img);
}

/*初始化轮播图*/
function init_bannar(b_div,b_img) {
    var bannar_fistimg = document.querySelector("#bannar div img");
    var pro_bar = document.querySelector(".pro_bar div");
    var all_h = document.querySelectorAll(".all_h");
    for(var i = 0;i < 5;i++) {
        b_img[i].src = imgs[0].src;
        if(i != 0){
            b_img[i].style.right = (i*100).toString()+"%";
            b_div[i].style.left = (i*20).toString()+"%";
        }
    }
    i = null;
    var all_h_0 = new css_animate(all_h[0],{transform:44,opacity:1},1);
    all_h_0.css_animate_init();
    all_h_0 = null;
    for(var s = 0;s<all_h[0].children.length;s++){
        var all_h_children = all_h[0].children[s];
        var all_h_children_attr = parseInt(window.getComputedStyle(all_h_children,null)["left"]);
        console.log(all_h_children_attr);
        var all_h_children_animate = new css_animate(all_h_children,{opacity:1,left:-all_h_children_attr},6);
        if(s == 1){all_h_children_animate.css_animate_init();}
        else {all_h_children_animate.css_animate_init(function(){
			setTimeout(function () {
                all_h[0].style.cssText = "opacity:0;transform:rotate(-45deg)";
                all_h[0].children[0].style.cssText = "opacity:0;left:100%";
                all_h[0].children[1].style.cssText = "opacity:0;left:-80%";
            },3000);
		});}
    }
    all_h_children_animate = null;
	bannar_animate(b_div,b_img,bannar_fistimg,pro_bar,all_h);
}

/*编写对象封装动画效果*/
function css_animate (name,attr,speed) {
    this.name = name;
    this.attr = attr;
    this.speed = speed;
}

css_animate.prototype = {
    css_animate_init:function(end_function){
        var n = 0;
        var attr_length = Object.getOwnPropertyNames(this.attr).length;
        for(var p in this.attr){
			var string_p = p.toString();
			var inita_value = parseInt(window.getComputedStyle(this.name,null)[string_p]);
			if(n == attr_length-1){
                this.css_animate_strat(this.name,string_p,this.attr[p],this.speed,inita_value,end_function);
            }
            else {
                this.css_animate_strat(this.name,string_p,this.attr[p],this.speed,inita_value);
            }
			n++;
        }
    },
    /* BUG----opacity，transform使用end_function会出现bug-----目前弥补方式是将opacity和transform写在前面 */
    css_animate_strat:function(css_name,css_attr,css_time,css_speed,css_value,end_function){
        var t = 0;
        function css_strat(){
            if(css_attr == "opacity"){
                (css_value < 1)?t++:t--;
                css_name.style[css_attr] = (css_value+t*0.01).toString();
                if(css_value < 1){if(t*0.01 <= 1){requestAnimationFrame(css_strat);}else{end_function();}}
                else{if(t*0.01 >= -1){requestAnimationFrame(css_strat);}else{end_function();}}
            }
            if(css_attr == "transform"){
                (css_time>0)?t++:t--;
                css_name.style[css_attr] = "rotate("+(-45 + t*css_speed).toString()+"deg)";
                if(css_time>0){if(t*css_speed <= css_time){requestAnimationFrame(css_strat);}else{end_function();}}
                else {if(t*css_speed >= css_time){requestAnimationFrame(css_strat);}else{end_function();}}
            }
            else{
                (css_time>0)?t++:t--;
                css_name.style[css_attr] = (css_value+t*css_speed).toString()+"px";
                if(css_time>0){if(t*css_speed <= css_time){requestAnimationFrame(css_strat);}else{end_function();}}
                else {if(t*css_speed >= css_time){requestAnimationFrame(css_strat);}else{end_function();}}
            }
        }
        requestAnimationFrame(css_strat);
    }
}

/*编写轮播的动画*/
function bannar_animate(ba_div,ba_img,fim,pro,all){
    var five_n = 0;
    var pro_width = parseInt(document.defaultView.getComputedStyle(pro.parentNode,null)["width"]);
    var pro_left = parseInt(document.defaultView.getComputedStyle(pro,null)["left"]);
    var pro_time = pro_width/4;
    pro_animate = null;
    var pro_animate = new css_animate(pro,{left:pro_time},4);
    setTimeout (function(){
        pro_animate.css_animate_init(function(){
            if(pro_left > parseInt(pro_width*3/4)){
                pro.style["left"] = "0px";
            }
        });
        if(img_n>=imgs.length){img_n = 0;}
        fim.src = imgs[(img_n>imgs.length?0:img_n)].src;
        FB_animate(five_n,ba_div,ba_img,fim,pro,all);
    },4000);
}

/*编写五个小的轮播*/
function FB_animate(n,di,im,fim,pro,all){
    FB = null;
    var FB_height = parseInt(window.getComputedStyle(di[n],null)["height"]);
    var FB = new css_animate(di[n],{height:-FB_height},10);
    setTimeout (function(){
        FB.css_animate_init(function(){
            if(n == di.length){
                for(var i = 0;i <= imgs.length;i++){
                    im[i].src = imgs[img_n].src;
                    di[i].style["height"] = "100%";
                }
                img_n++;
                bannar_animate(di,im,fim,pro);
            }
        });
        n++;
        if(n<di.length)FB_animate(n,di,im,fim,pro,all);
    },500);
}