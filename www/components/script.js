window.onload = function(){
  jogoInicio();

  function configuracoes(){
    let inverso = {
      canvas : "url('https://acegif.com/wp-content/gif/outerspace-63.gif')",
      body : "#FFEBCD",
      botoes : "#0000FF"
    }

    localStorage.setItem("inverso", JSON.stringify(inverso));

    let desinverso = {
      canvas : "url('https://tionitroblog.files.wordpress.com/2013/05/zb3bzcv.gif')",
      body : "#E0FFFF",
      botoes : "#FF1493"
    }

    localStorage.setItem("desinverso", JSON.stringify(desinverso));
  }

  configuracoes();

  document.querySelector("#direita").addEventListener("click", function(){
     right();
     setTimeout(pare, 1000);
  });

   document.querySelector("#esquerda").addEventListener("click", function(){
     left();
     setTimeout(pare, 1000);
  });

   document.querySelector("#subir").addEventListener("click", function(){
     sobe();
     setTimeout(pare, 1000);
  });

   document.querySelector("#descer").addEventListener("click", function(){
     desce();
     setTimeout(pare, 1000);
  });

  document.querySelector("#reset").addEventListener("click", function(){
     reload();
  });

  var valor = 0;

//$(document).on("click", "#corA", function(){
 // var dados = {mudar: $("#reset").val(style.color = "#0000FF"), mudar2: $("canvas").val(style.backgroundImage = "url('https://acegif.com/wp-content/gif/outerspace-63.gif')")};
 // localStorage.setItem(valor,JSON.stringify(dados));
  //valor++;
//});


    //document.querySelector("#corA").addEventListener("click", function(){
    //document.querySelector("#reset").style.color = "#0000FF";
    //document.querySelector("#subir").style.color = "#0000FF";
    //document.querySelector("#esquerda").style.color = "#0000FF";
    //document.querySelector("#direita").style.color = "#0000FF";
    //document.querySelector("#descer").style.color = "#0000FF";
    //document.querySelector("body").style.backgroundColor = "#F5F5F5";
    //document.querySelector("canvas").style.backgroundImage = "url('https://acegif.com/wp-content/gif/outerspace-63.gif')";
  //});

    //document.querySelector("#corB").addEventListener("click", function(){
    //document.querySelector("#reset").style.color = "#FF1493";
    //document.querySelector("#subir").style.color = "#FF1493";
    //document.querySelector("#esquerda").style.color = "#FF1493";
    //document.querySelector("#direita").style.color = "#FF1493";
    //document.querySelector("#descer").style.color = "#FF1493";
    //document.querySelector("body").style.backgroundColor = "#B0E0E6";
    //document.querySelector("canvas").style.backgroundImage = "url('https://tionitroblog.files.wordpress.com/2013/05/zb3bzcv.gif')";
  //});

  document.querySelector("#corA").addEventListener("click", function(){
    let temas = JSON.parse(localStorage.getItem("inverso"));
    document.querySelector("canvas").style.backgroundImage = temas.canvas;
    document.querySelector("body").style.backgroundColor = temas.body;

    const botoes = document.querySelectorAll(".bao");

    Array.prototype.filter.call(botoes, function(botoes){
      botoes.style.color = temas.botoes;
    });
  });

    document.querySelector("#corB").addEventListener("click", function(){
    let temas = JSON.parse(localStorage.getItem("desinverso"));
    document.querySelector("canvas").style.backgroundImage = temas.canvas;
    document.querySelector("body").style.backgroundColor = temas.body;

    const botoes = document.querySelectorAll(".bao");

    Array.prototype.filter.call(botoes, function(botoes){
      botoes.style.color = temas.botoes;
    });
  });

}

var personagemObj;

var osbtaculos = [];

var pontos;


function jogoInicio(){
  jogoArea.start();
  personagemObj = new componentes("#00BFFF", 10, 120, 30, 30);
  pontos = new componentes("#FFFF00", 30, 30, 'Consolas', '30px', 'texto');
  //osbtaculos = new componentes('yellow', 120, 80, 10, 100);
}

let jogoArea = {
   canvas : document.createElement("canvas"),
   start: function(){
     this.canvas.height = 300,
     this.context = this.canvas.getContext("2d");
     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
     this.frame = 0;
     this.intervalo = setInterval(jogoAtualizar, 20);
   },
   limpa: function(){
     this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
   },
   stop: function(){
     clearInterval(this.interval);
   }
}

function contarI(n){
  if((jogoArea.frame / n ) % 1 == 0) {
    return true;
  }else {
    return false;
  }
}

function componentes(cor, x, y, largura, altura, tipo){
      this.tipo = tipo,
      this.altura = altura,
      this.largura = largura,
      this.texto = 0,
      this.x = x,
      this.y = y,
      this.veloX = 0,
      this.veloY = 0,
      this.atualizar = function(){
      contexto = jogoArea.context;
      if(this.tipo == 'texto'){
      contexto.font = this.altura + " " + this.largura;  
      contexto.fillStyle = cor;
      contexto.fillText(this.texto, this.x, this.y);
      }else{
      contexto.fillStyle = cor,
      contexto.fillRect(this.x, this.y, this.altura, this.largura);
      }
      },
      this.posicaoNova = function(){
        this.x += this.veloX;
        this.y += this.veloY; 
      },
      this.colisao = function(obj){
        let esq = this.x;
        let dir = this.x + this.largura;
        let sup = this.y;
        let inf = this.y + this.altura;
        
        let objEsq = obj.x;
        let objDir = obj.x + obj.altura;
        let objSup = obj.y;
        let objInf = obj.y + obj.largura;

        let batida = true;

        if(
          (inf < objSup) || (sup > objInf) ||
          (dir < objEsq) || (esq > objDir)
          ){
          batida = false;

          }
          return batida;
      }
}

function jogoAtualizar(){
  let x, y;

  for(i = 0 ; i < osbtaculos.length; i++){
    if(personagemObj.colisao(osbtaculos[i])){
    jogoArea.stop();
    return;
     }
  }
  
  jogoArea.limpa();
  jogoArea.frame += 1;

  if(jogoArea.frame == 1 || contarI(150)) {
   x = jogoArea.canvas.width;
   miniAltura = 20;
   maxAltura = 200; 
   altura = Math.floor (Math.random() * (maxAltura - miniAltura + 1 ) + miniAltura);
   minVazio = 50
   maxVazio = 200;
   vazio = Math.floor(Math.random() * (maxVazio - minVazio + 1) + minVazio);
   //y = jogoArea.canvas.height - 200;
   osbtaculos.push(new componentes('#87CEEB', x, 0 , altura, 10));
   osbtaculos.push(new componentes('#87CEEB', x, altura  + vazio , x - altura - vazio, 10));
  }

  //osbtaculos.atualizar();

  for(i = 0; i < osbtaculos.length; i++) {
    osbtaculos[i].x += -1;
    osbtaculos[i].atualizar();
  }

  pontos.texto = "PONTOS: " + jogoArea.frame;
  pontos.atualizar();
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

function pare() {
  personagemObj.veloX = 0;
  personagemObj.veloY = 0;
}

function reload() {
location.reload();
}