/*
* Easy-Gltich v0.1
* Author: Eva Perman
*/

function EasyGlitch(canvasNode){

/*
* s is for self
* and for object oriented scoping. saves a LOT of trouble.
*/
    var s = this;

/*
* =======================================================
* Private Vars
* =======================================================
*
* undoData; image data from currently stored image value, default is null.
*/
    var undoData;
/*
* =======================================================
* Private functions
* =======================================================
*
* randomInt: returns random integer that is a multiple of mod that is a value between 0 and integer
*/
    var randomInt = function(integer,mod){
        mod = (typeof mod === "undefined") ? 1 : mod;
        return Math.floor( integer * Math.random() / mod ) * mod;
    }
/*
* randomFloat: return random floating value between 0 and floaty, called floaty because of namespace
*/
    var randomFloat = function(floaty){
        return floaty * Math.random();
    }

/*
* =======================================================
* PUBLIC variables
* =======================================================
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
/*
* preserve: default false, advises the drawing function to swap the source piece with the destination piece
*/
    s.preserve = false;
/*
* manualSize: default false, advises the drawing function to not use functions like getSq (should be deprecated)
*/
    s.manualSize = false;
/*
* sloppy: default false, cSq may be a float depending on the function assigning it a value.
* a sloppy value of true advises the drawing function to allow the pull and push image data with float coordinates
* on certain browsers, this results in a blurring effect.
*/
    s.sloppy = false;
/*
* cSq: int (or float if sloppy), Dominanante size parameter for the brush
*/
    s.cSq = 25;
/*
* sq: 2xN array [[settingvar, partProbability],...] first index of the 2 part array can be any var that the drawing function. can use
* muliple of these can be extended after new EasyGlitch is called.
* could be replaced with new Array()
*/
    s.sq = [[25,4],[50,2],[100,1]];
/*
* brush
*/
    s.brush = null;
/*
* source and destination vars.
*/
    s.sx = s.sy = s.dx = s.dy = 0;
/*
* playing: default false. advises any automatically running functions to continue automatically running.
*/
    s.playing = false;
/*
* interval: default is null but I'm making it directly accessible externally for support of other automatically running functions.
*/
    s.interval = null;
/*
* DataUrl for the image for downloading
*/
    s.image = "";

/*
* =======================================================
* PUBLIC functions
* =======================================================
*
*/
/*
* loadImage: runs when the src of the image after s.img has been loaded into the buffer.
* If drawOnLoad is true, change the canvas size to the image.
*/
    s.loadImage = function(){
        s.canDraw = true;
        if(s.drawOnLoad){
            undoData = undefined; //set undo data;
            s.canvas.height = s.buffer.height = s.img.height;
            s.canvas.width = s.buffer.width = s.img.width;
            s.context.drawImage(s.img,0,0);
        }
    }
/*
* reset: Forces a redraw of s.img
*/
    s.reset = function (){
        var temp = s.drawOnLoad; //stores to temp variable
        s.drawOnLoad = true;
        s.loadImage();
        s.drawOnLoad = temp; //restores previous
    }
/*
* getcSq: takes sq array and randomly pulls the first element of one of it's root entries based on it's part weight
* in the example default above we have
* s.sq = [[25,4],[50,2],[100,1]];
* this function add all of the second indecies (weights) and finds a random value between zero and that sum (in this case: 0 and 7)
* if the random number returned is less than the first weight, the function returns the first index (the value).
* if it's greater, it subjracts the weight from the random number and tests again with the next entry in the array
* It will continue until the random number is less than the weight of the current index.
* This allows for random values in the sq array to be preferred over others while keeping for a chaotic set
*/
    s.getcSq = function(sq){
        var denom = 0;
        for(var i in sq){
            denom+=sq[i][1];
        }
        var value = randomFloat(denom);
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
/*
* drawBrush
*/
    s.drawBrush = function(o){
        //ugh I don't even know
    }
/*
* vaporWave
*/
    s.vaporWave = function(){
        var idata = s.context.getImageData(0,0,s.canvas.width,s.canvas.height);
        var data = idata.data;
        var tmp;
        for (i = 0; i < data.length; i += 4){
            tmp = data[i+2];
            data[i+2] = (data[i] > data[i+1]) ? data[i]:data[i+1];
            data[i] = tmp;
        }
        s.context.putImageData(idata,0,0);
    }
    s.vaporWave2 = function(){
        var idata = s.context.getImageData(0,0,s.canvas.width,s.canvas.height);
        var data = idata.data;
        var tmp;
        for (i = 0; i < data.length; i += 4){
            if (data[i+1] > data[i+2])
            tmp = data[i+2];
            data[i+2] = data[i+1];
            data[i+1] = tmp;
        }
        s.context.putImageData(idata,0,0);
    }
/*
* drawScrample: actually does the work. This is the main function here that actually makes the result.
* runs when the mouse moves over the canvas or when the cursor mousedown's on it.
*/
    //TODO ADD string support (e.g. "100%" or 15p32)and add dimension support
    //Should also add advanced mode.
    s.drawScramble = function(e){
        s.sourceImg = (s.preserve) ? s.canvas : s.img;
        if((e.which === 1 && e.buttons === undefined) || e.buttons % 2 == 1){ //kludge to support both gecko and webkit
            s.cSq = (s.manualSize) ? s.cSq - (!s.sloppy) * (s.cSq % 1) : s.getcSq(s.sq); //all of the stuff on the left should be put in getcSq
            //get random places to pull from (TODO: limit this to an area or a source mask)
            //for drawscramble, there should be an xtraSloppy option that doesn't round like this
            s.sx = randomInt(s.sourceImg.width , s.cSq);
            s.sy = randomInt(s.sourceImg.height , s.cSq);
            s.dx = Math.floor(e.layerX / s.cSq) * s.cSq;
            s.dy = Math.floor(e.layerY / s.cSq) * s.cSq;
            // below should be put into it's own function called drawBrush
            if(s.preserve){
                //if preserve is true, first draw the source tile to the buffer in the source's spot
                s.buffcxt.drawImage(s.sourceImg, s.sx ,s.sy ,s.cSq, s.cSq, s.sx , s.sy, s.cSq, s.cSq);
                //then draw the CURRENT tile from the destination spot to the area on the source spot
                s.context.drawImage(s.sourceImg, s.dx ,s.dy ,s.cSq, s.cSq, s.sx , s.sy, s.cSq, s.cSq);
                //finally, take the one from the buffer and put it into the destination spot on the source image.
                s.context.drawImage(s.buffer, s.sx ,s.sy ,s.cSq, s.cSq, s.dx , s.dy, s.cSq, s.cSq);
            } else {
                //if no preserve, just take a tile and then put it where it needs to go leaving the source info where it is
                //essentially, it duplicates the tile from the source tial
                s.context.drawImage(s.canvas, s.sx ,s.sy ,s.cSq, s.cSq, s.dx , s.dy, s.cSq, s.cSq);
            }
        }
    }
/*
* randomScramble, runs drawScamble over an interval. hypnotic if preserve is on
*/
    s.randomScramble = function(){
        var e; //this way we don't kill the memory declaring it every time we want to draw something.
        s.playing=!s.playing; //turn off if on, turn on if off.
        if(s.playing){
            s.setUndo();
            s.interval = window.setInterval( function(){
                e = {which:1,layerX:randomInt(s.img.width),//emulates mouse event
                    layerY:randomInt(s.img.height) //if you think this looks like a kludge, it's because it is
                };
                s.drawScramble(e);
            },1000/200);
        } else {
            clearInterval(s.interval);
        }
    }
/*
* initiates file Dialog
*/
    s.openFile = function(){
        s.fileNode.value = "";
        s.fileNode.click();
    }
/*
* initiates save actions. has problems
*/
    s.saveImage = function(){
        s.image = s.canvas.toDataURL("image/png").replace("image/png","image/octet-stream");
        window.location.href = s.image; //don't crash please!!!
    }
    s.changeTileSize = function(){
        //don't know how to do yet with current implementation but OO helps!!!
    }
/*
* sets the undo data this should be replaced by pushUndo
*/
    s.setUndo = function() {
        undoData = s.context.getImageData(0,0,canvas.width,canvas.height);
    }
/*
* applies undo data, this should be replaced with pullUndo
*/
    s.undo = function(){
        s.context.putImageData(undoData,0,0);
    }
/*
* changes base image to Barack Obama
*/
    s.makeObama = function(){
        s.img.src="/obama.jpg";
    }
/*
* changes the base image back to Hong Kong
*/
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
        s.fr.onload = function(){
            s.img.src = s.fr.result;
        }
        s.canvas.onmousemove = s.canvas.onmousdown = s.drawScramble;
        s.canvas.onmousedown = s.setUndo;
        s.img.onload = s.loadImage;
        s.img.src = "../hk.jpg";
        s.cSq = 0;
    }

    init();

}