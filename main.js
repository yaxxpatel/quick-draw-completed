quick_draw_data_set=["aircraft carrier","airplane","mobile","pencil","grapes","apple"];
random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
Element_of_array = quick_draw_data_set[random_no];
document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: "+Element_of_array;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = Element_of_array;

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
       line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check_sketch();
    if(drawn_sketch == sketch){
        timer_counter = 0;
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score: "+score;
    }
}

function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer: "+timer_counter;
    if(timer_counter>500){
        document.getElementById("your_sketch").innerHTML = "Your Sketch: ";
        document.getElementById("confidence").innerHTML = "Confidence: ";
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function updateCanvas(){
    background("white");
    Quick_draw_data_set=["aircraft carrier","airplane","mobile","pencil","grapes","apple"];
    Random_number = Math.floor((Math.random()*Quick_draw_data_set.length)+1);
    element_of_array = Quick_draw_data_set[Random_number];
    sketch = element_of_array;
    document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: "+sketch;
}

function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function classifyCanvas(){
    classifier.classify(canvas,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById("your_sketch").innerHTML = "Your Sketch: "+results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence: "+Math.round(results[0].confidence * 100)+"%";
}