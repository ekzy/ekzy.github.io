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
 s.sq = [[25,4],[50,2],[100,1]];
 s.cSq = 0;
 s.sx = s.sy = s.dx = s.dy = 0;
 s.randomInt = function(integer){
 	return Math.floor( integer * Math.random() );
 }
 s.randomFloat = function(floaty){
 	return floaty * Math.random();
 }
 s.getcSq = function(sq){
 	var denom=0
	for(var i in sq){
		denom+=sq[i][1];
	}
	var value=s.randomFloat(denom);
	for(var i in sq){
		if(value > sq[i]){
			value -= sq[i][1];
		}else{
			return sq[i][0];
		}
	}
 }
 s.preserve = false;

}