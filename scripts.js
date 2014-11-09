//All the Scripts. Let's Do this

var eG = {
	sqSize:20,
	sens:0.5,
	controlNode:null, //dom element (assinged with on setControls)
	display:null, //dom element (assigned with setDisplay)
	mouseDown:false,
	startDraw:false,
	controls:[{
			section:"Layers",
			inputs:[{
				label:"Base",
				method:this.showBase,
				type:"radio"
			},{
				label:"Alpha",
				method:this.showAlpha,
				type:"radio"
			},{
				label:"Render",
				method:this.showRender,
				type:"radio"
			}]
		},{
			section:"Parameters",
			inputs:[{
				label:"Tile Size",
				method:this.setTileSize,
				type:"text"
			},{
				label:"Threshold",
				method:this.setThreshold,
				type:"text"
			},{
				label:"X offset",
				method:this.setXoffset,
				type:"text",
				alttext:"Set's glitch offset for glitch mode"
			},{
				label:"Y offset",
				method:this.setYoffset,
				type:"text"
			},{
				label:"Random Offset",
				method:this.randomOffset,
				type:"button"
			},{
				label:"Random Pen",
				method:this.setDrawRandom,
				type:"checkbox"
			}]
		},{
			section:"Draw Mode",
			inputs:[{
				label:"Scramble",
				method:this.setMode,
				type:"radio",
				value:"scramble"
			},{
				label:"Glitch",
				method:this.setMode,
				type:"radio",
				value:"glitch"
			}]
		}],
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
	img2Alpha:function(img,c){
		c = (typeof c === "undefined")?"v":c; //makes c optional, uses v as alpha
		//turns
	},
	setDisplay:function(obj){
		this.display=obj;
		this.display.appendChild(this.canvas);
	},
	setControls:function(obj){
		this.controlNode=obj;
		this.controlNode.innerHTML="";

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
	showBase:function(){
		//draw currently saved base image to canvas
	},
	showAlpha:function(){
		//draw currently saved alpha layer to canvas over base image
	},
	showRender:function(){
		//draw curently saved render image to canvas
	},
	setTileSize:function(){

	},
	setThreshold:function(){

	},
	setXoffset:function(){

	},
	setYoffset:function(){

	},
	randomOffset:function(){

	},
	setDrawRandom:function(){

	},
	setMode:function(){

	},
}