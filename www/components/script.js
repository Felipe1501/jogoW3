window.onload = function(){
  jogoInicio();

  document.querySelector("#direita").addEventListener("click", function(){
     right();
  });

   document.querySelector("#esquerda").addEventListener("click", function(){
     left();
  });

   document.querySelector("#subir").addEventListener("click", function(){
     sobe();
  });

   document.querySelector("#descer").addEventListener("click", function(){
     desce();
  });
}

var personagemObj;

function jogoInicio(){
  jogoArea.start();
  personagemObj = new componentes("#F00", 10, 120, 30, 30);
}

let jogoArea = {
   canvas : document.createElement("canvas"),
   start: function(){
     this.canvas.height = 300,
     this.context = this.canvas.getContext("2d");
     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
     this.intervalo = setInterval(jogoAtualizar, 20);
   },
   limpa: function(){
     this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
   }
}

function componentes(cor, x, y, altura, largura){
      this.altura = altura,
      this.largura = largura,
      this.x = x,
      this.y = y,
      this.veloX = 0,
      this.veloY = 0,
      this.atualizar = function(){
      contexto = jogoArea.context;
      contexto.fillStyle = cor,
      contexto.fillRect(this.x, this.y, this.altura, this.largura);
      },
      this.posicaoNova = function(){
        this.x += this.veloX;
        this.y += this.veloY; 
      }
}

function jogoAtualizar(){
  jogoArea.limpa();
  personagemObj.posicaoNova();
  personagemObj.atualizar();
}

function sobe(){
  personagemObj.veloY -= 1;
}

function desce(){
  personagemObj.veloY += 1;
}

function right(){
  personagemObj.veloX += 1;
}

function left(){
  personagemObj.veloX -= 1;
}