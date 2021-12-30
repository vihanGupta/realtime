function setup() {
  canvas = createCanvas(200, 200);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",modelloaded);
}

function modelloaded()
{
  console.log("model_loaded")
}

function draw()
{
  image(video, 0, 0, 200, 200);
  classifier.classify(video, gotResult);
}

previousResult = "";

function gotResult(error,result)
{
if(error)
{
  console.log(error)
}else
{
  if((result[0].confidence > 0.5) && (previousResult != result[0].label))
  {
    console.log(result);
    previousResult = result[0].label;
    snyth = window.speechSynthesis;
    speakData = "object detected"+result[0].label;
    utterthis = new SpeechSynthesisUtterance(speakData);
    snyth.speak(utterthis);
    document.getElementById("span").innerHTML = result[0].label;
    document.getElementById("span2").innerHTML = result[0].confidence.toFixed(2);
  }
    
  }
}
