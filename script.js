var canvas=document.getElementById("chess");
var img=new Image();
img.src="logo1.png";
var me=true;
var keyboard=[];
var win=[];
var count=0;
var mywin=[];
var computerwin=[];
var over;
var computerscore=[];
var myscore=[];

for(var i=0;i<15;i++){
	    keyboard[i]=[];
	for(var j=0;j<15;j++){
		keyboard[i][j]=0;
	}
}
for(var i=0;i<15;i++){
	    win[i]=[];
	for(var j=0;j<15;j++){
		win[i][j]=[];
	}
}
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
            win[i][j+k][count]=true;   
		}
		count++;
		}
	}
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
            win[j+k][i][count]=true;   
		}
		count++;
		}
	}
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
            win[i+k][j+k][count]=true;   
		}
		count++;
		}
	}
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
            win[i+k][j-k][count]=true;   
		}
		count++;
		}
	}
console.log(count);
for(var i=0;i<count;i++){
	mywin[i]=0;
	computerwin[i]=0;
}
var context=canvas.getContext("2d");
img.onload=function(){
	context.drawImage(img,0,0,450,450);
	draw();
	//onestep(0,0,true);
	//onestep(1,1,false);
}
var draw=function(){
	for(var i=0;i<15;i++)
       {
          context.moveTo(15+i*30,15);
          context.lineTo(15+i*30,435);
          context.stroke();
          context.moveTo(15,15+i*30);
          context.lineTo(435,15+i*30);
          context.stroke();
       }
}
var onestep=function(i,j,me){
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	var grad=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if(me){
	grad.addColorStop(0,"#0A0A0A");
	grad.addColorStop(1,"#636766");}
	else{
    grad.addColorStop(0,"#D1D1D1");
	grad.addColorStop(1,"#F9F9F9");
	}
	context.fillStyle=grad;
    context.fill();
}
canvas.onclick=function(e){
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	
	if(over){
		return;
	}
	if(!keyboard[i][j]){
	onestep(i,j,me);
    keyboard[i][j]=1;
	for(var k=0;k<count;k++){
		if(win[i][j][k]){
            mywin[k]++;
            computerwin[k]=6;
           if(mywin[k]==5){
        	alert("你赢啦!!!!")
        	over=true;
            }
	    }
    }
    if(!over){
    	me=!me;
    	computerAi();
    }
    }
}
function computerAi(){
   var max=0;
   var u=0,v=0;
   for(var i=0;i<15;i++){
   	  myscore[i]=[];
   	  computerscore[i]=[];
   	  for(var j=0;j<15;j++){
           myscore[i][j]=0;
   	       computerscore[i][j]=0;
   	  }
   }
   for(var i=0;i<15;i++){
   	  for(var j=0;j<15;j++){
           if(!keyboard[i][j]){
           	for(var k=0;k<count;k++){
           		if(win[i][j][k]){
           		if(mywin[k]==1){
                    myscore[i][j]+=200;
           		}
           		if(mywin[k]==2){
                    myscore[i][j]+=500;
           		}
           		if(mywin[k]==3){
                    myscore[i][j]+=2000;
           		}
           		if(mywin[k]==4){
                    myscore[i][j]+=20000;
           		}
           		if(computerwin[k]==1){
                    computerscore[i][j]+=220;
           		}
           		if(computerwin[k]==2){
                    computerscore[i][j]+=520;
           		}
           		if(computerwin[k]==3){
                    computerscore[i][j]+=2200;
           		}
           		if(computerwin[k]==4){
                    computerscore[i][j]+=22000;
           		}
           	}
            }
           if(max<myscore[i][j]){
               max=myscore[i][j];
               u=i;
               v=j
           }
           else if(max==myscore[i][j]){
           	   if(computerscore[i][j]>computerscore[u][v]){
               u=i;
               v=j
              }
           }
           if(max<computerscore[i][j]){
               max=computerscore[i][j];
               u=i;
               v=j
           }
           else if(max==computerscore[i][j]){
           	   if(myscore[i][j]>myscore[u][v]){
               u=i;
               v=j
              }
           }
           }
   	  }
   }
   onestep(u,v,false);
   keyboard[u][v]=2;
   for(var k=0;k<count;k++){
		if(win[u][v][k]){
            computerwin[k]++;
            mywin[k]=6;
           if(computerwin[k]==5){
        	alert("哈,计算机赢啦!!!!")
        	over=true;
            }
	    }
    }
   if(!over){
   	me=!me;
   }
}
