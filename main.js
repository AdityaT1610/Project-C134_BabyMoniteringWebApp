status="";
objects = [];

function preload() 
{
   song = loadSound("Alarm.mp3");
}

function setup() 
{
    canvas = createCanvas(480, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 350);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status - detecting objects";
    video.hide();
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
}

function gotRsults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() 
{
    image(video, 0, 0, 480, 350);
    if(status != "")
    {

        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotRsults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status - Object Detected !!";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +"  "+ percent +" % ", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("detected_or_not").innerHTML = "Baby Found!!";
                song.stop();
            }
            else
            {
                document.getElementById("detected_or_not").innerHTML = "Baby NOT Found!!";
                song.play();
            }

            if(objects[i].label == "")
            {
                document.getElementById("detected_or_not").innerHTML = "Baby NOT Found!!";
                song.play();
            }
        } 
    }



}


