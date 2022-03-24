    //THIS CODE INCLUDES SOME DEBUG FUNCTIONS EG. CONSOLE.LOG() IN ORDER TO MAKE SURE THE CODE IS WORKING CORRECTLY
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    //LOADING AUDIO
    var audio = new Audio('creepy-vocal-ambience-6074.mp3');
    audio.volume= 0.2;
    audio.loop=true;
    //LOADING INTRO VID AND DISPLAYING ALL NECESSARY ELEMENTS AFTER VID IS DONE
    vid=document.getElementById("video");
    vid.onended=function(){
        vid.style.display="none";
        document.getElementById("title").style.display="block";
        document.getElementById("canvas").style.display="block";
        document.getElementById("Start").style.display="block";
        document.getElementById("startbtn").style.display="block";
        document.getElementById("boy").style.display="block";
        document.getElementById("girl").style.display="block";
        document.getElementById("boychar").style.display="block";
        document.getElementById("girlchar").style.display="block";
        audio.play();

    }
    //LOADING ALL OUTCOMES OF THE GAME
    girlenter=document.getElementById("girlenter");
    girlstick=document.getElementById("girlstick");
    girlsword=document.getElementById("girlsword");
    boyenter=document.getElementById("boyenter");
    boystick=document.getElementById("boystick");
    boysword=document.getElementById("boysword");

    //LOADING OUR DEFAULT CHARACTER CHOICE AND DEFINING THE CHARACTER SELECTION FUNCTIONS
    choice="boy";
    function ChooseBoy(){
        choice="boy";
        console.log(choice);
    };
    function ChooseGirl(){
        choice="girl";
        console.log(choice);
    };

    //LOADING THE MAIN MENU SCREEN
    var menuScreen= new Image();
    menuScreen.onload=function(){
        ctx.drawImage(this,0,0,600,350);
    }

    //CREATING CLASS OBJECTS
    var imageObj= new Image();
    var char = new Image();
    var sword = new Image();
    var stick = new Image();
    var flag=false;
    //DEFINING POINTS AROUND CHARACTER FOR WALL DETECTION    
    leftTop=ctx.getImageData(85, 95, 1,1).data;
    rightTop=ctx.getImageData(235, 95, 1,1).data;
    leftBottom=ctx.getImageData(85, 195, 1,1).data;
    rightBottom=ctx.getImageData(235, 195, 1,1).data;
    //WE DETECT THE TRANSPARENCY AROUND THE CHARACTER
    function getColour(data){
        var rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        console.log(data[3]);
        if (data[3]/255 == 0){
            console.log(rgba);
            console.log(JSON.stringify(rgba));
            flag=true;
        };
    };
    //INITIALIZING VARIABLES (MAP POSITION,BOOLEAN CHECK VALUE AND DIRECTION THE CHARACTER IS TRAVELLING IN)
    var sx=500;
    var sy=350;
    var value=false;
    var direction="up";

    //FUNCTION FOR THE CHARACTER TO MOVE
    function MoveLab(evt){
        console.log('Key code: ' + evt.keyCode);

        // Move to the right. 
        if (evt.keyCode == 39) {
            //DEFINING DIRECTION
            direction="right";
            //GETTING TRANSPARENCY DATA
            rightTop=ctx.getImageData(235, 95, 1,1).data;
            getColour(rightTop);
            if (flag==true){
                flag=false;
                console.log('move to the right');
                //MOVING THE MAP TO THE RIGHT
                if ((sx <= imageObj.width)){
                    sx += 2;
                    console.log(sx);
                    //IF END OF THE LABYRINTH IS REACHED
                    if (sy>=596){
                        document.getElementById("Lab").style.display="none";
                        document.getElementById("title").style.display="none";
                        document.getElementById("canvas").style.display="none";
                        document.getElementById("boychar").style.display="none";
                        document.getElementById("girlchar").style.display="none";
                        document.getElementById("startbtn").style.display="none";
                        //LOAD VIDEO PERSON ENTERING ROOM  
                        if (choice=="girl"){
                            girlenter.style.display="block";
                            girlenter.play();
                        }
                        else{
                            boyenter.style.display="block"
                            boyenter.play();
                        } 
                        document.getElementById("stick").style.display="block";
                        document.getElementById("sword").style.display="block";

                    }
                }
            }
            else{
                sx=sx;
            }
            
            imageObj.onload=function() {
                //ctx.drawImage(this, sx, sy, swidth, sheight, x, y, width, height);
                ctx.clearRect(0,0,600,350);
                ctx.drawImage(this, sx, sy, 150, 180, 0, 0, 600, 350);
            }
            char.onload=function(){
                ctx.drawImage(this, 88, 85, 150,100);
            }
            
            
        }

        // // Move to the left. 
        else if (evt.keyCode == 37) {
            //DEFINING DIRECTION
            direction="left";
            //GETTING TRANSPARENCY DATA
            leftTop=ctx.getImageData(85, 95, 1,1).data;
            getColour(leftTop);
            
            if (flag==true){
                flag=false;
                //MOVING TO THE LEFT
                console.log('move to the left');
                if ((sx > 0)){
                    sx -= 2;
                    console.log(sx);
                    //IF THE END OF THE LABYRINTH IS REACHED
                    if (sy>=596){
                        document.getElementById("Lab").style.display="none";
                        document.getElementById("title").style.display="none";
                        document.getElementById("canvas").style.display="none";
                        document.getElementById("boychar").style.display="none";
                        document.getElementById("girlchar").style.display="none";
                        document.getElementById("startbtn").style.display="none";
                        //LOAD VIDEO PERSON ENTERING ROOM  
                        if (choice=="girl"){
                            girlenter.style.display="block";
                            girlenter.play();
                        }
                        else{
                            boyenter.style.display="block"
                            boyenter.play();
                        } 
                        document.getElementById("stick").style.display="block";
                        document.getElementById("sword").style.display="block";
                    }
                }
        }
            else{
                sx=sx;
            }
            
                imageObj.onload=function() {
                //ctx.drawImage(this, sx, sy, swidth, sheight, x, y, width, height);
                ctx.clearRect(0,0,600,350);
                ctx.drawImage(this, sx, sy, 150, 180, 0, 0, 600, 350);
            }
            char.onload=function(){
                ctx.drawImage(this, 88, 85, 150,100);
            }
            
        }

        //Move up 
        else if (evt.keyCode == 38) {
            //DEFINING DIRECTION
            direction="up";
            //GETTING TRANSPARENCY INFORMATION
            leftTop=ctx.getImageData(85, 95, 1,1).data;
            getColour(leftTop);
            if (flag==true){
                flag=false;
                console.log('move up');
                //MOVING UP
                if ((sy > 0)){
                    sy -= 2;
                    console.log(sy);
                    //IF END OF LABYRINTH REACHED
                    if (sy>=596){
                        document.getElementById("Lab").style.display="none";
                        document.getElementById("title").style.display="none";
                        document.getElementById("canvas").style.display="none";
                        document.getElementById("boychar").style.display="none";
                        document.getElementById("girlchar").style.display="none";
                        document.getElementById("startbtn").style.display="none";
                        //LOAD VIDEO PERSON ENTERING ROOM  
                        if (choice=="girl"){
                            girlenter.style.display="block";
                            girlenter.play();
                        }
                        else{
                            boyenter.style.display="block"
                            boyenter.play();
                        } 
                        document.getElementById("stick").style.display="block";
                        document.getElementById("sword").style.display="block";
                    }
                }
            }
            else{
                sy=sy;
            }
            
                imageObj.onload=function() {
                //ctx.drawImage(this, sx, sy, swidth, sheight, x, y, width, height);
                ctx.clearRect(0,0,600,350);
                ctx.drawImage(this, sx, sy, 150, 180, 0, 0, 600, 350);
            }
            char.onload=function(){
                ctx.drawImage(this, 88, 85, 150,100);
            }
            
    
        }
        //Move down
        else if (evt.keyCode == 40) {
            //DEFINING DIRECTION OF MOVEMENT
            direction="down";
            //GETTING TRANSPARENCY DATA
            rightBottom=ctx.getImageData(235, 195, 1,1).data;
            getColour(rightBottom);
            if (flag==true){
                flag=false;
                console.log('move down');
                //MOVING DOWN
                if ((sy < imageObj.height) ){
                    sy += 2;
                    console.log(sy);
                    //IF END OF LABYRINTH REACHED
                    if (sy>=596){
                        document.getElementById("Lab").style.display="none";
                        document.getElementById("title").style.display="none";
                        document.getElementById("canvas").style.display="none";
                        document.getElementById("boychar").style.display="none";
                        document.getElementById("girlchar").style.display="none";
                        document.getElementById("startbtn").style.display="none";
                        //LOAD VIDEO PERSON ENTERING ROOM 
                        if (choice=="girl"){
                            girlenter.style.display="block";
                            girlenter.play();
                        }
                        else{
                            boyenter.style.display="block"
                            boyenter.play();
                        } 
                        document.getElementById("stick").style.display="block";
                        document.getElementById("sword").style.display="block";
                    }
                    
                }
            }
            else{
                sy=sy;
            }
            
                imageObj.onload=function() {
                //ctx.drawImage(this, sx, sy, swidth, sheight, x, y, width, height);
                ctx.clearRect(0,0,600,350);
                ctx.drawImage(this, sx, sy, 150, 180, 0, 0, 600, 350);
            }
            char.onload=function(){
                ctx.drawImage(this, 88, 85, 150,100);
            }
            
            }
            //LOADING THE SOURCE OF ALL OBJECTS
            imageObj.src="mazetry.svg"; 
            if (choice=="girl"){
                if (direction=="down"){
                    char.src="female character pixel down 1.png"; 
                }
                else if(direction=="up"){
                    char.src="female character pixel up 1.png"
                } 
                else if(direction=="left"){
                    char.src="female character pixel left 2.png"
                }
                else if(direction=="right"){
                   char.src="female character pixel right 2.png" 
                }
            }
            else{
                if (direction=="down"){
                    char.src="male character pixel down 1.png"; 
                }
                else if(direction=="up"){
                    char.src="male character pixel up 1.png"
                } 
                else if(direction=="left"){
                    char.src="male character pixel left 2.png"
                }
                else if(direction=="right"){
                   char.src="male character pixel right 2.png" 
                }
                
            }
           
          
    };

    //FUNCTION FOR INSIDE THE LABYRINTH
    function Labyrinth(){
    document.getElementById("startbtn").innerHTML="Restart";
    document.getElementById("boy").style.display="none";
    document.getElementById("girl").style.display="none";
    document.getElementById("Start").style.display="none";
    document.getElementById("Lab").style.display="block";
    if(choice=="girl"){
        document.getElementById("boychar").style.display="none";
    }
    else{
        document.getElementById("girlchar").style.display="none";
    }

    ctx.clearRect(0,0,600,350);
    imageObj.onload=function() {
        //ctx.drawImage(this, sx, sy, swidth, sheight, x, y, width, height);
        ctx.drawImage(this, 500, 350, 150, 180, 0, 0, 600, 350);
            
    }
    char.crossOrigin = "Anonymous";
    char.onload=function(){
        ctx.drawImage(this, 88, 85, 150,100);
    }
        
        
    window.addEventListener("keydown", MoveLab, false);
        
   
    imageObj.src="mazetry.svg"; 
    if (choice=="girl"){
        char.src="female character pixel down 1.png";  
    }
     else{
        char.src="male character pixel down 1.png"; 
    }
    
    };
//FUNCTION IF STICK IS CHOSEN
    function ChooseStick(){
        document.getElementById("stick").style.display="none";
        document.getElementById("sword").style.display="none";
        
       
        if (choice=="girl"){
            girlenter.pause();
            girlenter.style.display="none";
            girlstick.style.display="block";
            girlstick.play();
        }
        else{
            boyenter.style.display="none";
            boyenter.pause();
            boystick.style.display="block";
            boystick.play();
        }
        
    }
  //FUNCTION IF SWORD IS CHOSEN  
    function ChooseSword(){
        document.getElementById("sword").style.display="none";
        document.getElementById("stick").style.display="none";

        if (choice=="girl"){
            girlenter.pause();
            girlenter.style.display="none";
            girlsword.style.display="block";
            girlsword.play();
        }
        else{
            boyenter.style.display="none";
            boyenter.pause();
            boysword.style.display="block";
            boysword.play();
        }

    }

    
    menuScreen.src="MenuScrenWithSW.png";
    


    