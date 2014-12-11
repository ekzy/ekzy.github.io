function EasyGlitch(canvasNode){
 var s = this; //s is for self
 s.canvas = canvasNode;
 s.buffer = document.createElement("canvas");
 s.context = s.canvas.getContext("2d");
 s.buffcxt = s.buffer.getContext("2d");
 s.img = new Image();
 s.sourceImg = s.img;
 var canDraw = false;
 s.drawOnLoad = true;
 s.loadImage = function(){
 	s.canDraw = true;
 	if(s.drawOnLoad){
 		s.canvas.height = s.buffer.height = s.img.height;
 		s.canvas.width = s.buffer.width = s.img.width;
 		s.context.drawImage(s.img,0,0);
 	}
 }
 s.img.onload = s.loadImage;
 s.img.src = "/hk.jpg";
 s.sq = [[25,4],[50,2],[100,1]];
 s.cSq = 0;
 s.sx = s.sy = s.dx = s.dy = 0;
 var randomInt = function(integer,mod){
 	mod = (typeof mod === "undefined") ? 1 : mod;
 	return Math.floor( integer * Math.random()/mod ) * mod;
 }
 var randomFloat = function(floaty){
 	return floaty * Math.random();
 }
 s.getcSq = function(sq){
 	var denom=0
	for(var i in sq){
		denom+=sq[i][1];
	}
	var value=randomFloat(denom);
	for(var i in sq){
		if(value > sq[i]){
			value -= sq[i][1];
		}else{
			return sq[i][0];
		}
	}
 }
 s.preserve = false;
 s.drawScramble = function(e){
 	s.sourceImg = (s.preserve)?s.canvas:s.img;
 	if((e.which===1 && e.buttons === undefined)|| e.buttons % 2 == 1){
 		s.cSq = s.getcSq(s.sq);
 		s.sx=randomInt(s.sourceImg.width,s.cSq);
		s.sy=randomInt(s.sourceImg.height,s.cSq);
		s.dx=Math.floor(e.layerX/cSq) * cSq;
		s.dy=Math.floor(e.layerY/cSq) * cSq;

		if(s.preserve){
			buffcxt.drawImage(s.sourceImg, s.sx ,s.sy ,s.cSq, s.cSq, s.sx , s.sy, s.cSq, s.cSq);
			context.drawImage(s.sourceImg, s.dx ,s.dy ,s.cSq, s.cSq, s.sx , s.sy, s.cSq, s.cSq);
			context.drawImage(s.buffer, s.sx ,s.sy ,s.cSq, s.cSq, s.dx , s.dy, s.cSq, s.cSq);
		} else {
			context.drawImage(s.sourceImg, s.sx ,s.sy ,s.cSq, s.cSq, s.dx , s.dy, s.cSq, s.cSq);
		}
 	}
 }
	s.playing = false;
	s.interval;
	s.randomScramble = function(){
		var e;
		s.playing=!s.playing;
		if(s.playing){
			s.setUndo();
			s.interval = window.setInterval( function(){
				e={which:1,layerX:randomInt(s.img.width),
				layerY:randomInt(s.img.height)
				};
				s.drawScramble(e);
			},1000/200);
		}
 	}
 	s.canvas.onmousemove = s.canvas.onmousdown = s.drawScramble;
 	s.fileNode = document.createElement("input");
 	s.fileNode.setAttribute("type","file");
 	s.openFile = function(){
 		s.fileNode.value = "";
 		s.fileNode.click();
 	}
 	s.fr = new FileReader();
 	s.fr.onload = function(){
 		s.img.src = s.fr.result;
 	}
 	s.fileNode.onchange = function(){
 		if( this.value != ""){
 			s.fr.readAsDataURL( s.fileNode.files[0] );
 		}
 	}
 	s.image = "";
 	s.saveImage = function(){
 		s.image = s.canvas.toDataURL("image/jpeg");
 		window.open(s.image); //don't crash please!!!
 	}
 	s.changeTileSize = function(){
 		//don't know how to do yet with current implementation but OO helps!!!
 	}
 	var undoData;
 	s.setUndo = function() {
 		undoData = s.context.getImageData(0,0,canvas.width,canvas.height);
 	}
 	canvas.onmousedown = s.setUndo;
 	s.undo = function(){
 		s.context.putImageData(undoData,0,0);
 	}
}