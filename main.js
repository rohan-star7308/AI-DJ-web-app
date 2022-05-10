song="";
lwx="";
lwy="";
rwx="";
rwy="";
lwc="";
rwc="";

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modeloaded);
    posenet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("red");

    if(lwc>0.2){
    circle(lwx,lwy,20);
    nlwy= Number(lwy);
    decimal_remove_y= floor(nlwy);
    volume=decimal_remove_y/500;
    setVolume(volume);
    document.getElementById("volume").innerHTML="Volume = "+volume;

    }
    if(rwc>0.2){
    circle(rwx,rwy,20);
    if(rwy>0 && rwy<=100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML="Speed = 0.5x";
    }
    else if(rwy>100 && rwy<=200){
        song.rate(1);
        document.getElementById("speed").innerHTML="Speed = 1x";
    }
    else if(rwy>200 && rwy<=300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML="Speed = 1.5x";
    }
    else if(rwy>300 && rwy<=400){
        song.rate(2);
        document.getElementById("speed").innerHTML="Speed = 2x";
    }
    else if(rwy>400 && rwy<=500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML="Speed = 2.5x";
    }
}
    
    
}


function play1(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modeloaded(){
    console.log("posenet Initialized!!!");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        lwx=results[0].pose.leftWrist.x;
        rwx=results[0].pose.rightWrist.x;
        lwy=results[0].pose.leftWrist.y;
        rwy=results[0].pose.rightWrist.y;
        lwc=results[0].pose.keypoints[9].score;
        rwc=results[0].pose.keypoints[10].score;
    }
}

