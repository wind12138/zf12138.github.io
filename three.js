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
    var Array_all_h_children_attr = [[[{transform:44,opacity:1}],[{opacity:1,left:-100},{opacity:1,left:80}],["opacity:0;transform:rotate(-45deg)","opacity:0;left:100%","opacity:0;left:-80%"]],[[{opacity:1}],[{width:100},{left:50},{bottom:-110},{bottom:-110}],["opacity:0","width:0%","left:-20%","bottom:200%","bottom:200%"]],[[{opacity:1}],[{opacity:1,top:20},{opacity:1,top:20},{opacity:1,top:20},{opacity:1,top:20}],["opacity:0","opacity:0,top:-20%","opacity:0,top:-20%","opacity:0,top:-20%","opacity:0,top:-20%"]],[[{opacity:1}],[{opacity:1},{opacity:1}],["opacity:0","opacity:0","opacity:0"]]];
    for(var i = 0;i < 5;i++) {
        b_img[i].src = imgs[0].src;
        if(i != 0){
            b_img[i].style.right = (i*100).toString()+"%";
            b_div[i].style.left = (i*20).toString()+"%";
        }
    }
    i = null;
    var pro_animate = new css_animate(pro_bar,{left:25},1);
    var div_animate = new css_animate(b_div,{height:-100},1);
    var font_animater = new font_animate(all_h[0],Array_all_h_children_attr,1,0);
    font_animater.create_aniamte();
    bannar_animate(div_animate,b_div,b_img,bannar_fistimg,pro_animate,all_h,font_animater);
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
        var string_p,init_value;
        var attr_length = Object.getOwnPropertyNames(this.attr).length;
        for(var p in this.attr){
            string_p = p.toString();
            init_value = css_animate_percent(true,this.name,string_p);
            if(n === attr_length-1){
                this.css_animate_strat(this.name,string_p,this.attr[p],this.speed,init_value,end_function);
            }
            else {
                this.css_animate_strat(this.name,string_p,this.attr[p],this.speed,init_value);
            }
            n++;
        }
    },
    /* BUG----opacity，transform使用end_function会出现bug-----目前弥补方式是将opacity和transform写在之前 */
    css_animate_strat:function(css_name,css_attr,css_time,css_speed,css_value,end_function){
        var t = 0;
        function css_strat(){
            if(css_attr === "opacity") {
                (css_value < 1) ? t++ : t--;
                css_name.style[css_attr] = (css_value + t * 0.01).toString();
                if (css_value < 1) {if (t * 0.01 <= 1) requestAnimationFrame(css_strat);}
                else {if (t * 0.01 >= -1) requestAnimationFrame(css_strat);}}
            if(css_attr === "transform"){
                (css_time>0)?t++:t--;
                css_name.style[css_attr] = "rotate("+(-45 + t*css_speed).toString()+"deg)";
                if(css_time>0){if(t*css_speed <= css_time)requestAnimationFrame(css_strat);}
                else {if(t*css_speed >= css_time)requestAnimationFrame(css_strat);}
                }
            else{
                (css_time>0)?t++:t--;
                css_name.style[css_attr] = (css_value+t*css_speed).toString()+"%";
                if(css_time>0){if(t*css_speed <= css_time){requestAnimationFrame(css_strat);}else{end_function();}}
                else {if(t*css_speed >= css_time){requestAnimationFrame(css_strat);}else{end_function();}}
            }
        }
        requestAnimationFrame(css_strat);
    }
}

/*编写轮播的动画*/
function bannar_animate(di_an,ba_div,ba_img,fim,pr_an,all,fo_an){
    var five_n = 0;
    img_n = (img_n>=imgs.length?0:img_n);
    fo_an.name = all[img_n];
    fo_an.w = img_n;
    setTimeout (function(){
        pr_an.css_animate_init(function(){
            var pro_width = css_animate_percent(false,pr_an.name.parentNode,"width");
            var pro_left = css_animate_percent(false,pr_an.name,"left");
            if(pro_left > parseInt(pro_width)){
                pr_an.name.style["left"] = "0px";
            }
        });
        fim.src = imgs[img_n].src;
        FB_animate(five_n,di_an,ba_div,ba_img,fim,pr_an,all,fo_an);
    },4000);
}

/*编写五个小的轮播*/
function FB_animate(n,di_an,di,im,fim,pr_an,all,fo_an){
    di_an.name = di[n];
    setTimeout (function(){
        di_an.css_animate_init(function(){
            if(n == di.length){
                for(var i = 0;i <= imgs.length;i++){
                    im[i].src = imgs[img_n].src;
                    di[i].style["height"] = "100%";
                }
                img_n++;
                fo_an.create_aniamte();
                bannar_animate(di_an,di,im,fim,pr_an,all,fo_an);
            }
        });
        n++;
        if(n<di.length)FB_animate(n,di_an,di,im,fim,pr_an,all,fo_an);
    },500);
}

/*获取百分比*/
function css_animate_percent(pd,name,attr){
    var children_value = parseInt(window.getComputedStyle(name,null)[attr]);
    var parent_value,parent_attr,return_value;
    if(pd){
        if(attr === "left" || attr ==="right")parent_attr = "width";
        else if(attr === "top" || attr ==="bottom")parent_attr = "height";
        else parent_attr = attr;
        parent_value = parseInt(window.getComputedStyle(name.parentNode,null)[parent_attr]);
        if(attr === "opacity" || attr === "transform") return_value = children_value;
        else return_value = Math.round((children_value/parent_value)*100);
    }
    else {
        return_value = children_value;
    }
    return return_value;
}

/*文字动画对象*/
function font_animate(name,attr,speed,w){
    this.name = name;
    this.attr = attr;
    this.speed = speed;
    this.w = w;
}

font_animate.prototype = {
    create_aniamte:function(){
        var i = 0;
        var name_children,name_animate,font_name,font_attr,font_w;
        font_name = this.name,font_attr = this.attr,font_w = this.w;
        var parent_animate = new css_animate(this.name,this.attr[this.w][0][0],this.speed);
        parent_animate.css_animate_init();
        parent_animate = null;
        setTimeout(function fu(){
            name_children = font_name.children[i];
            name_animate = new css_animate(name_children,font_attr[font_w][1][i],1);
            if(i !== font_name.children.length-1)name_animate.css_animate_init();
            else {name_animate.css_animate_init(function () {
                setTimeout(function () {
                    var ti = 0;
                    requestAnimationFrame(function tim() {
                        ti++;
                        font_name.style.opacity = (1-ti*0.01).toString();
                        if(ti<100)requestAnimationFrame(tim);
                        else {
                            for(var s = 0;s < font_name.children.length;s++){
                                font_name.children[s].style.cssText = font_attr[font_w][2][s+1];
                            }
                            name_animate = null;
                        }
                    });
                },500);
            })}
            i++;
            if(i < font_name.children.length) setTimeout(fu,500);
        },500);
    }
}
