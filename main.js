x = 0;
y = 0;
apple = "";
draw_apple = "";
speak_data = ""
var SpeechRecognition = window.webkitSpeechRecognition;
to_number = 0;
var recognition = new SpeechRecognition();

function preload(){
  apple = loadImage("apple.png");
}
function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;
 to_number = Number(content);
 document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
 if(Number.isInteger(to_number)){
  draw_apple = "set";
  document.getElementById("status").innerHTML = "started Drawing apple";
 }
 else{
  document.getElementById("status").innerHTML = "not recognized a number"
 }
}

function setup() {
 canvas = createCanvas(600, 600);
}

function draw() {
  if(draw_apple == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak_data = to_number + "apples drawn";
    for(var i = 1; i <= to_number; i++){
      x = Math.floor(Math.random() * 600);
      y = Math.floor(Math.random() * 600);
      image(apple, x, y, 50, 50);

    }
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
