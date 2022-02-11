canvas = document.getElementById("canvas");
btnStart = document.getElementById("btnStart");
div_canvas = document.getElementById("div-w");
btnLyrics = document.getElementById("btn-l");
inLyrics = document.getElementById("in-l");
ul_l = document.getElementById("ul-l-t");

var palabra = '';
btnLyrics.onclick = tryLyrics;
btnStart.onclick = juego;

function juego(){
  clearWords();
  getPalabra();
  // Draw();
  // createDiv();
}

function getPalabra(){
  fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
  .then(response => response.json())
  .then((data) => palabra = data.body.Word.toUpperCase());
  palabra = palabra.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").toUpperCase();

  setTimeout(function(){
    console.log(palabra);
    console.log(palabra.length);
    Draw();
    createDiv();
  }, 500);
}

function Draw(){
  var x = 5;
  var contextCanvas = canvas.getContext("2d");
  createCanvas(contextCanvas);
  contextCanvas.clearRect(0,0,500,150);
  contextCanvas.fillStyle = "blue";
  for(i = 0; i < palabra.length; i++){
    contextCanvas.fillRect(x, 0, 25, 5);
    x = x+30;
  }
}

function createCanvas(canvas){
  this.canvas.width = 30 * palabra.length + 5;
  var w = 30 * palabra.length + 5;
  div_canvas.style.width = w.toString() + "px";
}

function createDiv(){

  for(i = 0; i < palabra.length; i++){
    var div = document.createElement("div");
    // div.appendChild(document.createTextNode(palabra[i]));
    div.setAttribute("class", "div-word");
    div.setAttribute("id", "div-word");
    div_canvas.appendChild(div);
  }
}

function clearWords(){

  var listDiv = document.getElementById("div-w")
  
  for(i = div_canvas.childNodes.length - 1; i > 2; i--){
    div_canvas.removeChild(div_canvas.childNodes[i]);
  }
}

function tryLyrics(){
  var lyrics = inLyrics.value.toUpperCase();
  var aux = 0;
  for(i = 0; i < palabra.length; i++){
    if(lyrics == palabra[i]){
      div_canvas.childNodes[i+3].textContent = lyrics;
    }
  }

  if(aux == 1){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(lyrics));
    ul_l.appendChild(li);
    aux = 0;
  }

}