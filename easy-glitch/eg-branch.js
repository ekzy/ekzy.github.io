function EasyGlitch(canvasNode){

/*
* s is for self
* and for object oriented scoping
*/
    var s = this;

/*
* private vars
* undoData; image data from currently stored image value, default is null.
*/
    var undoData;
    /*
* Private functions
*
* randomInt: returns random integer that is a multiple of mod that is a value between 0 and integer
*/
    var randomInt = function(integer,mod){
        mod = (typeof mod === "undefined") ? 1 : mod;
        return Math.floor( integer * Math.random()/mod ) * mod;
    }
/*
* randomFloat: return random floating value between 0 and floaty, called floaty because of namespace
*/
    var randomFloat = function(floaty){
        return floaty * Math.random();
    }

/*
* PUBLIC variables
*
* canvas: the main canvas dom element
*/
    s.canvas = canvasNode;
/*
* buffer: hidden canvas to hold temporary image data. Multiple buffers can be supported
*/
    s.buffer = document.createElement("canvas");
/*
* context: the canvas element's context to hold the image data
*/
    s.context = s.canvas.getContext("2d");
/*
* buffercxt: the buffer canvas's context for temporary image data.
*/
    s.buffcxt = s.buffer.getContext("2d");
/*
* img: the base image to draw on the canvas. changing it's source calls loadImage function
*/
    s.img = new Image();
/*
* sourceImg: where the image data is drawn from. Could be the main img or any image variable. Can be swapped with buffer
*/
    s.sourceImg = s.img;
/*
* canDraw: default false. makes it so that javascript doesn't error out if there is no image loaded
*/
    s.canDraw = false;
/*
* drawOnLoad: default true. can be made false so that image can be loaded into buffer(s) instead or in pieces instead
*/
    s.drawOnLoad = true;
    s.preserve = false;
    s.manualSize = false;
    s.sloppy = false;
    s.cSq = 25;
    s.sq = [[25,4],[50,2],[100,1]];
    s.cSq = 0;
    s.sx = s.sy = s.dx = s.dy = 0;
    s.playing = false;
    s.interval = null;
    s.image = "";

/*
* PUBLIC functions
*/
    s.loadImage = function(){
        s.canDraw = true;
        if(s.drawOnLoad){
            undoData = undefined;
            s.canvas.height = s.buffer.height = s.img.height;
            s.canvas.width = s.buffer.width = s.img.width;
            s.context.drawImage(s.img,0,0);
        }
    }
    s.reset = function (){
        s.loadImage();
    }
    //TODO ADD string support and add dimension support
    //Should also add advanced mode.
    s.getcSq = function(sq){
        var denom=0;
        for(var i in sq){
            denom+=sq[i][1];
        }
        var value=randomFloat(denom);
        var i = 0;
        do {
            if(value > sq[i][1]){
                value -= sq[i][1];
                i++;
            }else{
                return sq[i][0];
            }
        } while (value > 0);
    }
    s.drawScramble = function(e){
        s.sourceImg = (s.preserve)?s.canvas:s.img;
        if((e.which===1 && e.buttons === undefined)|| e.buttons % 2 == 1){
            s.cSq = (s.manualSize) ? s.cSq - (!s.sloppy) * (s.cSq % 1) : s.getcSq(s.sq);
            s.sx=randomInt(s.sourceImg.width,s.cSq);
            s.sy=randomInt(s.sourceImg.height,s.cSq);
            s.dx=Math.floor(e.layerX/s.cSq) * s.cSq;
            s.dy=Math.floor(e.layerY/s.cSq) * s.cSq;
            if(s.preserve){
                s.buffcxt.drawImage(s.sourceImg, s.sx ,s.sy ,s.cSq, s.cSq, s.sx , s.sy, s.cSq, s.cSq);
                s.context.drawImage(s.sourceImg, s.dx ,s.dy ,s.cSq, s.cSq, s.sx , s.sy, s.cSq, s.cSq);
                s.context.drawImage(s.buffer, s.sx ,s.sy ,s.cSq, s.cSq, s.dx , s.dy, s.cSq, s.cSq);
            } else {
                s.context.drawImage(s.sourceImg, s.sx ,s.sy ,s.cSq, s.cSq, s.dx , s.dy, s.cSq, s.cSq);
            }
        }
    }
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
        } else {
            clearInterval(s.interval);
        }
    }

    s.openFile = function(){
        s.fileNode.value = "";
        s.fileNode.click();
    }

    s.fr.onload = function(){
        s.img.src = s.fr.result;
    }


    s.saveImage = function(){
        s.image = s.canvas.toDataURL("image/jpeg");
        window.open(s.image); //don't crash please!!!
    }
    s.changeTileSize = function(){
        //don't know how to do yet with current implementation but OO helps!!!
    }

    s.setUndo = function() {
        undoData = s.context.getImageData(0,0,canvas.width,canvas.height);
    }
    s.undo = function(){
        s.context.putImageData(undoData,0,0);
    }
    s.makeObama = function(){
        s.img.src="/obama.jpg";
    }
    s.makeHK = function(){
        s.img.src="/hk.jpg";
    }
/*
* Private Function Init, initalizes all public and handlers
*/
    var init = function() {
        s.fr = new FileReader();
        s.fileNode = document.createElement("input");
        s.fileNode.setAttribute("type","file");
        s.fileNode.onchange = function(){
            if( this.value != ""){
                s.fr.readAsDataURL( s.fileNode.files[0] );
            }
        }
        s.canvas.onmousemove = s.canvas.onmousdown = s.drawScramble;
        s.canvas.onmousedown = s.setUndo;
        s.img.onload = s.loadImage;
        s.img.src = "/hk.jpg"; //this should go away, or at least be put at the end of the object :/
    }

    init();

}