//img = "";
song = "";
status = "";
objects = [];
function preload() {
    song = loadSound("alarm_r.mp3")
}
function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status :Detecting Object";
}
function modelLoaded() {
    console.log("model Loaded");
    status = true;
    //objectDetector.detect(img,gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);

    }
    else {
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(video, 0, 0, 400, 400);
    if (status != "") {
        r = random(255);
        b = random(255);
        g = random(255);
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            console.log("object detected")
            document.getElementById("status").innerHTML = "Status : Object Detected";
           // document.getElementById("number_of_objects").innerHTML = "number of objects detected are: " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else {
                document.getElementById("number_of_objects").innerHTML = "Baby not Found";
                console.log("play");
                song.play();
            }

        }
        if(object.length == 0)
        {
            document.getElementById("number_of_objects").innerHTML = "Baby not Found";
            console.log("play");
            song.play();
        }  
    }
}