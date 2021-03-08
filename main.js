img = "";
status = "";
objectDetector="";
object = [];


function preload() {
    sound = loadSound('videoplayback.mp3');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status = Detecting Object';
}

function modelLoaded(){
    console.log('Model Loaded');
    status = true;
    console.log(status);
}

function draw() {
    image(video,0,0,380,380);
    
    if(status != ""){
        objectDetector.detect(video, gotResult);

        for(i = 0; i<object.length; i++){

            if(object[i].label == 'person'){
                document.getElementById('status').innerHTML = 'Status : Object Detected'
                document.getElementById('number_of_objects').innerHTML = 'Baby Found';
                sound.stop();
            }
            if(object[i].label != 'person'){
                if(object.length > 0){
                    document.getElementById('status').innerHTML = 'Status : Object not Detected'
                    document.getElementById('number_of_objects').innerHTML = 'Baby not Found';
                    sound.play();
                }
            }
    }

}

}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}
