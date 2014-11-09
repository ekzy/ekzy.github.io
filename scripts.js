//All the Scripts. Let's Do this

var eG = {
	sqSize:20,
	sens:0.5,
	controls:null, //dom element (assinged with on setControls)
	display:null, //dom element (assigned with setDisplay)
	mouseDown:false,
	startDraw:false,
	buttons:[],
	defaultImg:"", //find this thing
	init:function(){
		this.baseimg = new Image();
		this.aimg = new Image();
		this.render = new Image();
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");
		//register draw handling
		document.body.onmousdown=function(){
			eG.mouseDown=true;
		};
		document.body.onmouseup=function(){
			eG.mouseDown=false;
		}
		this.canvas.onmouseenter=this.startStroke;
		this.canvas.onmouseleave=this.stopStroke;
		this.canvas.onmousemove=this.strokeDraw;

	},
	setDisplay:function(obj){
		this.display=obj;
		this.display.appendChild(this.canvas);
	},
	setControls:function(obj){
		this.control=obj;
		this.control.innerHTML="";

	},
	drawRender:function(){
		 //Draw the thingy accounrding the instructionnns

	},
	C2R:function(){
		this.render.src=this.canvas.toDataURL("image/png");
	},
	saveImage:function(){
		this.C2R();
		window.location.href=this.render.src;
	},
	strokeStart:function(e){
		//on mouse down, call this function
		this.startDraw=true;
	},
	strokeStop:function(e){
		this.startDraw=false;
	},
	strokeDraw:function(e){
		if(this.mouseDown){
			
		}
	},//Steve, you're going to put this on facebook, don't worry about having a custom website yet to promot the thing. GAHh x)

}