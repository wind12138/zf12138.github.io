// JavaScript Document

var pro_time = 0;
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
	for(var i = 0;i < 5;i++) {
		b_img[i].src = imgs[0].src;
		if(i != 0){
			b_img[i].style.right = (i*100).toString()+"%";
			b_div[i].style.left = (i*20).toString()+"%";
		}
	}
	i = null;
	bannar_animate(b_div,b_img,bannar_fistimg,pro_bar);
} 

/*编写对象封装动画效果*/
function css_animate (name,attr,time,speed,element,n) {
	this.name = name;
	this.attr = attr;
	this.time = time;
	this.speed = speed;
	this.element = element;
	this.n = n;
	this.value = document.defaultView.getComputedStyle(this.name,null)[this.attr];
}

css_animate.prototype = {
	css_animate_strat:function(end_function){
		var t = 0;
		var css_name = this.name, css_value = parseInt(this.value), css_attr = this.attr, css_time = this.time ,css_speed = this.speed;
		var css_set = this.css_set, css_element = this.element, css_n = this.n, css_end = this.css_animate_end;
		
		console.log("css_value = "+css_value);
		
		function css_strat(){
			if(css_attr == "opacity"){
				(css_value < 1)?t++:t--;
					css_name.style[css_attr] = (css_value+t*0.01).toString();
				if(css_value < 1){if(t*0.01 <= 1)requestAnimationFrame(css_strat);}
				else{if(t*0.01 >= -1)requestAnimationFrame(css_strat);}
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
function bannar_animate(ba_div,ba_img,fim,pro){
	var five_n = 0;
	var pro_left = parseInt(window.getComputedStyle(pro.parentNode,null)["width"]);
	var pro_time = pro_left/4;
	pro_animate = null;
	var pro_animate = new css_animate(pro,"left",pro_time,4);
	setTimeout (function(){
		pro_animate.css_animate_strat(function(){
			if(pro_animate.value > "584px"){
				pro.style["left"] = "0px";
			}
			console.log("pro = "+pro_animate.value);
		});
		if(img_n>=imgs.length){img_n = 0;}
		fim.src = imgs[(img_n>imgs.length?0:img_n)].src;
		FB_animate(five_n,ba_div,ba_img,fim,pro);
	},4000);
}

/*编写五个小的轮播*/
function FB_animate(n,di,im,fim,pro){
	FB = null;
	var FB_height = parseInt(window.getComputedStyle(di[n],null)["height"]);
	var FB = new css_animate(di[n],"height",-FB_height,10,di,n);
	setTimeout (function(){
		FB.css_animate_strat(function(){
			if(n == di.length){
				for(var i = 0;i <= imgs.length;i++){
					im[i].src = imgs[img_n].src;
					di[i].style[FB.attr] = parseInt(FB.value).toString()+"px";
				}
				img_n++;
			bannar_animate(di,im,fim,pro);		
			}
		});
		n++;
		if(n<di.length)FB_animate(n,di,im,fim,pro);
	},500);
}