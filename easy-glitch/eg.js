var EasyGlitch = function(){
	//register canvas to object
	this.registerCanvas = function(node){
		this.canvas = node;
		this.context = this.canvas.getContext("2d");
		this.canvas.onmousemove=this.canvas.onmousedown=null; //AUUGHH! use Init?
	}
	this.registerFile = function(node){
		this.fileNode = node;
		this.fileNode.onload = function(){
			if(this.value!=""){
			}
		}
	}
	//swap canvas for preservation algorithms
	this.swapCanvas = document.createElement("canvas");
	this.swapContext = this.swapCanvas.getContext("2d");
	//image space for loading and uploading of images
	this.img = new Image();
	this.canDraw = false;
	this.i = 0;
	this.drawOnLoad = true; //OPTIONABLE
	this.loadImage = function(){
		this.canDraw = true;
		if(this.drawOnLoad){
			this.canvas.height=this.swapCanvas.height=img.height;
			this.canvas.width=this.swapCanvas.width=img.width;
			this.context.drawImage(img,0,0);
		}
	}
	this.img.onload=this.loadImage;
	this.sq=[
				[25,4],
				[50,2],
				[100,1]
			];
	this.cSq = 0;
	this.sx=this.sy=this.dx=this.dy=0;
	var sx,sy,dx,dy;
	this.randomInt = function(integer){
		return Math.floor(integer*Math.random());
	}
	this.randomFloat = function(floaty){
		return floaty*Math.random();
	}
	this.getcSq = function(sq){
		var denom=0
		for(var i in sq){
			denom+=sq[i][1];
		}
		var value=this.randomFloat(denom);
		for(var i in sq){
			if(value > sq[i]){
				value -= sq[i][1];
			}else{
				return sq[i][0];
			}
		}
	}
	this.preserve = false;
	var swa = this.img;
	this.drawScramble = function(e){
		//How do draw??
	}
	this.playing = false;
	this.randomScramble = function (){
		var e;
		this.playing = !this.playing;
		if(this.playing){
			this.setUndo();
			this.interval = window.setInterval(function(){
				e={which:1,layerX:randomInt(img.width),
				layerY:randomInt(img.height)
			};
			this.drawScramble(e);
			},1000/200);
		}else{
			clearInterval(this.interval);
		}
	}
	this.openFile = function(){
		if(this.fileNode){
			this.fileNode.value="";
			this.fileNode.click();
		}
	}
	this.fr = new FileReader();
	this.fr.onload = function(){
		this.img.src=this.fr.result;
	}

	this.init = function(){
		this.img.src="/hk.jpg"
	}

}