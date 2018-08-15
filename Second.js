// JavaScript Document
/*create by 10/7/18*/
var per = String.fromCharCode(37);
var n = 0;
var f = 0;
var init_animate = true;
var ssss = [-100,-20,-10];
var tttt = [500,100,10];

	
var imgs = [];
for (var i = 0;i < 4;i++){
	imgs[i] = new Image();
	imgs[i].src = "img/img-"+(i+1).toString()+".png";
}
i=null;

$(document).ready(function() {
	var hong = document.querySelector("#h1 div");
	var cs = document.querySelectorAll("#bannar div:nth-child(n+2) img");
	var ss = document.querySelectorAll("#bannar div:nth-child(n+2)");
	var bs = document.querySelector(".pro_bar div");
	var hs = document.getElementById("h");
	var hs_s = document.querySelectorAll("#h p");
	var b = init_animation(cs,ss,n,init_animate,hs,hs_s);
	animation_n(hong,hs,hs_s,cs,ss,bs,b);
});

function init_animation(cs,ss,h,init,hs,hs_s) {
	var tt = init;
	for (var i = 0;i<5;i++) {
			cs[i].src = imgs[h].src;
			if(i !== 0 && tt) {
				cs[i].style.right = (i*100).toString()+per;
				ss[i].style.cssText += "left:"+(i*20).toString()+per+";";
				
			}
		}
	h_animation(hs,hs_s);
	return tt;
}

function animation_n(ho,hs,hs_s,cs,ss,bs,t) {//animation_n是无限轮播
	var sss = document.querySelector("#bannar div img");
	var  ti = Math.floor(Math.random()*3+1);
	t = false;
	setTimeout(function(){
	sss.src = imgs[(f+1<=3?f+1:0)].src;
	hidden_aniamte(hs);
	hong_animate = null;
	var hong_animate = new css_animate(ho,"left",90);
	hong_animate.css_animate_strat();
	animation(hong_animate,hs,hs_s,cs,ss,bs,t,ti);
	},7000);
}

function animation(hong_animate,hs,hs_s,cs,ss,bs,t,ti) {//animation是执行五个小页扇
	t = false;
	setTimeout(function(){
		animate_ss(hong_animate,hs,hs_s,cs,ss,bs,n,ti);
		n++;
		if(n<=5)setTimeout(animation(hong_animate,hs,hs_s,cs,ss,bs,t,ti),tttt[(ti-1)]);
		else n=0;	
	},tttt[(ti-1)]);
}

function animate_ss(hong_animate,hs,hs_s,cs,ss,bs,h,ti) {//animate_ss是执行小页扇动起来的关键
	var s = 0;
	cancelAnimationFrame(timer);
		var timer = requestAnimationFrame(function nn(){
			s--;
			texiao(hs,hs_s,true,ss,ti,(h-1),s,-ssss[ti-1]);
			if(h==5&&s==ssss[ti-1]){//animate_ss------finish
			f++;
			if(f==4)f = 0;
			hong_animate.css_animate_end();
			bs.style.left = (f*25).toString()+per;
			for(var c = 0;c<=4;c++) {
				cs[c].src = imgs[f].src;
				texiao(hs,hs_s,false,ss,ti,c);
			}
			animation_n(hong_animate.name,hs,hs_s,cs,ss,bs);
		}
			s>ssss[ti-1]?requestAnimationFrame(nn):cancelAnimationFrame(timer);
		});
		
}

function texiao(hs,hs_s,T,ss,n,p,m,m_s) { //n--是case，s--是h..c，m--是s,m_s--是初始值
	switch(n){
			case 1:
				if(T){ss[p].style.height = (m_s+m).toString()+per;}
				else{ss[p].style.height = "100%";h_animation(hs,hs_s);}
				break;
			case 2:
				if(T){ss[p].style.width = (m_s+m).toString()+per;}
				else{ss[p].style.width = "20%";	h_animation(hs,hs_s);}
			
				break;
			default:
				if(T){ss[p].style.opacity = (m_s*0.1+m*0.1).toString();}
				else{ss[p].style.opacity = "1";h_animation(hs,hs_s);}
				
				break;
			}
}


function h_animation(hs,hs_s){
	setTimeout(function(){
		hs_animate(hs,hs_s);
	},1000);
}

function hs_animate(hs,hs_s) {
	var s = 0;
	var hss = requestAnimationFrame(function m(){
		s++;
		hs.style.transform = "rotate("+(s-100).toString()+"deg)";
		hs.style.opacity = (s*0.01).toString();
		hs_s[0].style.opacity = (s*0.01).toString();
		hs_s[0].style.left = (100-s).toString()+per;
		hs_s[1].style.opacity = (s*0.01).toString();
		hs_s[1].style.right = (60 - (s<=60?s:60)).toString()+per;
		s>=100?cancelAnimationFrame(hss):requestAnimationFrame(m);
	});
	
}

function hidden_aniamte(hs){
	var hid = 10;
	cancelAnimationFrame(hi);
	var hi = requestAnimationFrame(function dd() {
		hid--;
		hs.style.opacity = (hid*0.1).toString();
		hid > 0?requestAnimationFrame(dd):cancelAnimationFrame(hi);
	});
}

function css_animate(name,attr,time){
	this.name = name;
	this.attr = attr;
	this.time = time;
}

css_animate.prototype = {
	css_animate_strat:function(){
		var t = 0;
		var css_name = this.name,css_attr = this.attr,css_time = this.time;
		cancelAnimationFrame(timer);
		var timer = requestAnimationFrame(function cc(){
			t++;
			css_name.style.cssText += css_attr+":"+(100-t).toString()+per+";";
		if(t<=css_time){requestAnimationFrame(cc);}else{cancelAnimationFrame(timer);}
		});
	},
	css_animate_end:function(){
		this.name.style.cssText = this.attr+":100%;";
	}
}

