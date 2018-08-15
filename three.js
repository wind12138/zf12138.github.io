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
	for(var i = 0;i < 5;i++) {
		b_img[i].src = imgs[0].src;
		if(i != 0){
			b_img[i].style.right = (i*100).toString()+"%";
			b_div[i].style.left = (i*20).toString()+"%";
		}
	}
	i = null;
	bannar_animate(b_div,b_img,bannar_fistimg);
} 

/*编写对象封装动画效果*/
function css_animate (name,attr,time,element,n) {
	this.name = name;
	this.attr = attr;
	this.time = time;
	this.element = element;
	this.n = n;
	this.value = document.defaultView.getComputedStyle(this.name,null)[this.attr];
}

css_animate.prototype = {
	css_animate_strat:function(end_function){
		var t = 0;
		var css_name = this.name, css_value = parseInt(this.value), css_attr = this.attr, css_time = this.time;
		var css_set = this.css_set, css_element = this.element, css_n = this.n, css_end = this.css_animate_end;
		
		function css_animate(){
			(css_time>css_value)?t++:t--;
					css_name.style[css_attr] = (css_value+t*10).toString()+"px";
			if(css_time>css_value){if(t<=css_time)requestAnimationFrame(css_animate);}
			else {if(t*10 >= -css_time){requestAnimationFrame(css_animate);}else{end_function();}}
		}
		requestAnimationFrame(css_animate);
	}
}

/*编写轮播的动画*/
function bannar_animate(ba_div,ba_img,fim){
	var five_n = 0;
	setTimeout (function(){
		if(img_n>=imgs.length){img_n = 0;}
		fim.src = imgs[(img_n>imgs.length?0:img_n)].src;
		FB_animate(five_n,ba_div,ba_img,fim);
	},4000);
}

/*编写五个小的轮播*/
function FB_animate(n,di,im,fim){
	FB = null;
	var FB = new css_animate(di[n],"height",910,di,n);
	setTimeout (function(){
		FB.css_animate_strat(function(){
			if(n == di.length){
				for(var i = 0;i <= imgs.length;i++){
					im[i].src = imgs[img_n].src;
					di[i].style[FB.attr] = parseInt(FB.value).toString()+"px";
				}
				img_n++;
			bannar_animate(di,im,fim);		
			}
		});
		n++;
		if(n<di.length)FB_animate(n,di,im,fim);
	},500);
}