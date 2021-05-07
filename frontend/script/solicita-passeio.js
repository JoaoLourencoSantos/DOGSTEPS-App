const URL = "http://localhost:8080"
const ROTA = "dogsteps";
var cont;
$(document).ready(function () {
  $('select').formSelect();
  request(definirUrl("dogwalkers", localStorage.getItem("dogWalkerId")), "GET", null);
});

$('#botao').click(function () {
  let data = $('#formulario').get(0);

  if (validarDados(data)) {
    requestAgendarPasseio(getJSON())
  }
  else if (cont == 2)
    alertUsuario(cont);
  else if (cont == 3)
    alertUsuario(cont);
  else if (cont == 4)
    alertUsuario(cont);
  else if (cont == 5)
    alertUsuario(cont);
  else if (cont == 6)
    alertUsuario(cont);
  else
    alertUsuario(1);
});

function requestAgendarPasseio(dados) {
  // pegando json para preencher com o pagamento e finalizar a requisição
  console.log(JSON.parse(localStorage.getItem("jsonPasseio")));

  let url = "http://localhost:8080/dogsteps/tours/";
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(dados),
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    statusCode: {
      400: () => { alertUsuario(7) },
      200: () => {
        alertUsuario(1);
        window.location.href = "../home-tutor.html";
      }
    }
  });
}

function getJSON() {

  const LIST_DIAS = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
  const LIST_HORARIOS = ['MANHA', 'TARDE', 'NOITE'];
  const LIST_DURACAO = ['E30MINUTOS', 'E1HORA'];

  let diasSelecionados = $('#dias-passeio option:selected').text();
  let horariosSelecionados = $('#horarios-passeio option:selected').text();
  let duracaoSelecionados = $('#duracao-passeio  option:selected').text();


  let dias = mudaDiasParaEnum(LIST_DIAS, diasSelecionados);
  let horarios = mudaHorariosParaEnum(LIST_HORARIOS, horariosSelecionados);
  let duracao = trocarParaEnum(LIST_DURACAO, duracaoSelecionados);

  return {
    "agenda": {
      "dias": dias,
      "horario": horarios
    },
    "duracao": duracao,
    "pets": null,
    "status": "PENDING",
    "avaliacao": null,
    "dogWalkerId": localStorage.getItem("dogWalkerId"),
    "tutorId": localStorage.getItem("tutorIdLogado"),
  }

};

function trocarParaEnum(lista, valores) {
  let array;

  if (valores === "30 Minutos") {
    array = lista[0];
  }
  if (valores === "1 Hora")
    array = lista[1];
  return array;
}

function mudaDiasParaEnum(lista, valores) {
  let val;

  if (valores === "Sábado")
    val = lista[6]
  if (valores === "Domingo")
    val = lista[0]
  if (valores === "Segunda")
    val = lista[1]
  if (valores === "Terça")
    val = lista[2]
  if (valores === "Quarta")
    val = lista[3]
  if (valores === "Quinta")
    val = lista[4]
  if (valores === "Sexta")
    val = lista[5]

  return val;
}

function mudaHorariosParaEnum(lista, valores) {
  let val;
  if (valores === "Manhã")
    val = lista[1]
  if (valores === "Tarde")
    val = lista[2]
  if (valores === "Noite")
    val = lista[3]

  return val;
}

function popularArraysAgenda(lista, valores) {
  let array = new Array();
  for (i = 0; i < valores.length; i++) {
    array[i] = lista[valores[i]];
  }
  return array;
}

function definirUrl(rotaModulo, id) {
  return `${URL}/${ROTA}/${rotaModulo}/${id}`;
}

function request(url, tipoRequisicao, dados) {

  $.ajax({
    url: url,
    type: tipoRequisicao,
    data: JSON.stringify(
      dados != null ?
        dados : {
          "endereco": null,
          "porte": null
        }
    ),
    datatype: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (response) {
      setConteudo(response);
    }
  });
}

function getDogWalkerById(url, tipoRequisicao) {
  $.ajax({
    url: url,
    type: "GET",
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
  });
}


function setConteudo(dados) {
  let toAppend = `<img src = "${dados.photoUrl}" class = "imagem-perfil circle responsive-img">
                      <h5>${dados.nome}</h5>`
  $('.imagem-perfil-container').html(toAppend);
  toAppend = ` 
        <h4>Sobre Mim</h4>
        <p>${dados.descricao}</p> 
       <h5>
           Disponibilidade:
       </h5>
       <ul class = "disponabilidade-dias">
           <li>Dias:</li>
           <li id="dias-li">${dados.agenda.dias}</li>                        
       </ul>
       <ul class="disponabilidade-horario">
           <li>Horarios</li>
           <li id="horarios-li">${dados.agenda.horario}</li>
       </ul>            `
  $('.sobre-mim-content').html(toAppend);
  toAppend = `<h5>Contratar ${dados.nome}</h5>`
  $('.solicitar-title').html(toAppend);
  toAppend = `<li>${dados.agenda.horarios}</li>`

}


function replaceSpecialChars(str) {
  str = str.replace(/[ÀÁÂÃÄÅ]/, "A");
  str = str.replace(/[àáâãäå]/, "a");
  str = str.replace(/[ÈÉÊË]/, "E");
  str = str.replace(/[Ç]/, "C");
  str = str.replace(/[ç]/, "c");

  return str.replace(/[^a-z0-9]/gi, '');
}

function validarDados(dados) {
  var horario_dis = $('#horarios-li').text();
  var dias_dis = $('#dias-li').text();
  var horario2 = $("#horarios-passeio").val(); //veja isso
  var dias2 = $("#dias-passeio").val()

  let result = true;

  var horario_sel = $("#horarios-passeio option:selected").text();
  var dias_sel = $("#dias-passeio option:selected").text()
  let duracaoSelecionados = $('#duracao-passeio  option:selected').text();

  const LIST_DIAS = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
  const LIST_HORARIOS = ['', 'MANHA', 'TARDE', 'NOITE'];
  const LIST_DURACAO = ['', 'E30MINUTOS', 'E1HORA'];

  let arrayDeDiasOption = popularArraysAgenda(LIST_DIAS, dias2);
  var arraysplit1 = dias_dis.split(",").map(String)

  let arrayDeHorariosOption = popularArraysAgenda(LIST_HORARIOS, horario2);
  let arraysplit2 = horario_dis.split(",").map(String)


  var achou1 = false;
  for (i = 0; i < arraysplit1.length; i++) {
    if (arraysplit1.includes(arrayDeDiasOption[i])) {
      achou1 = true;
    }
  }
  if (!achou1) {
    result = false;
    cont = 5;
  }

  var achou2 = false;
  for (i = 0; i < arraysplit2.length; i++) {
    if (arraysplit2.includes(arrayDeHorariosOption[i])) {
      achou2 = true;
    }
  }
  if (!achou2) {
    result = false;
    cont = 6;
  }

  if (mudaDiasParaEnum(LIST_DIAS, dias_sel) === undefined) {
    result = false;
    cont = 2;
  }
  if (mudaHorariosParaEnum(LIST_HORARIOS, horario_sel) === undefined) {
    result = false;
    cont = 3;
  }
  if (trocarParaEnum(LIST_DURACAO, duracaoSelecionados) === undefined) {
    result = false;
    cont = 4;
  }
  for (i = 0; i < dados.length; i++) {
    if (dados[i].value == null || dados[i].value === "Dias" || dados[i].value === "Horários" || dados[i].value === "Duração") {
      result = false;
      cont = 1;
    }

  }
  return result;
}

function alertUsuario(i) {
  let duration = 1300;
  if (i == 1) {
    M.toast({ html: 'Por favor,preencha todos os campos!', displayLength: duration })
  }
  if (i == 2) {
    M.toast({ html: 'Por favor,selecione apenas um dia!', displayLength: duration })
  }
  if (i == 3)
    M.toast({ html: 'Por favor,selecione apenas um horário!', displayLength: duration })
  if (i == 4)
    M.toast({ html: 'Por favor,selecione apenas uma duração!', displayLength: duration })
  if (i == 5)
    M.toast({ html: 'Por favor,selecione um dia de acordo com a disponibilidade do DogWalker', displayLength: duration })
  if (i == 6)
    M.toast({ html: 'Por favor,selecione um horário de acordo com a disponibilidade do DogWalker', displayLength: duration })
}