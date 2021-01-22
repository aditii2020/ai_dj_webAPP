song = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
song = loadSound("song.mp3");
};

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded(){
console.log("MODEL LOADED !")


};

function play(){
song.play();
song.rate(1);
song.volume(1);
};

function gotPoses(results){
    
if(results.length > 0){
    console.log(results);

    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("score right wrist =" + scoreRightWrist+ "score left wrist "+scoreLeftWrist);
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log(" right wristX =" + rightWristX+ "right wristY "+rightWristY);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log(" left wristX =" + leftWristX+ "left wristY "+leftWristY);
}
}

function draw(){
image(video,0,0,500,400)

fill("#FF0000");
stroke("#FF0000");
 if(scoreRightWrist > 0.2){
     circle(rightWristX,rightWristY,20)

     if(rightWristX >0 && rightWristY<=100){
         document.getElementById("speed").innerHTML = "speed = 0.5"
         song.rate(0.5);
        }
         else if(rightWristX >100 && rightWristY<=200){
            document.getElementById("speed").innerHTML = "speed = 1"
         song.rate(1); 
         }

         else if(rightWristX >200 && rightWristY<=300){
            document.getElementById("speed").innerHTML = "speed = 1.5"
         song.rate(1.5); 
        }

         else if(rightWristX >300 && rightWristY<=400){
            document.getElementById("speed").innerHTML = "speed = 2"
         song.rate(2); 
         }

         else if(rightWristX >400 && rightWristY<=500){
            document.getElementById("speed").innerHTML = "speed = 2.5"
         song.rate(2.5); 
         }
         
    
 }


if(scoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY = Number(leftWristY);
    removeDecimal = floor(InNumberLeftWristY);
    volume = removeDeciaml/500;
    document.getElementById("volume").innerHTML = "Volume" + volume;
    song.setVolume(volume);
}
};