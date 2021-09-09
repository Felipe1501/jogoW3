window.onload = function(){
  jogoInicio();
}

function jogoInicio(){
  jogoArea.start();
  personagem = componentes("#F00", 10, 120, 30, 30);
}

let jogoArea = {
   canvas : document.createElement("canvas"),
   start: function(){
     this.canvas.height = 300,
     this.context = this.canvas.getContext("2d");
     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
   }
}

function componentes(cor, x, y, altura, largura){
      this.altura = altura,
      this.largura = largura,
      this.x = x,
      this.y = y,
      contexto = jogoArea.context;
      contexto.fillStyle = cor,
      contexto.fillRect(this.x, this.y, this.altura, this.largura);
}