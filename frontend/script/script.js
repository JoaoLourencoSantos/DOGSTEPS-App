const URL_NOTIFY = "http://localhost:8080/dogsteps/tours/filter";
const URL_PASSEIO = "http://localhost:8080/dogsteps/tours/";
const URL_DOGWALKER = "http://localhost:8080/dogsteps/dogwalkers/";

const ONGOING = "ONGOING";
const TO_FINISH = "TO_FINISH";

$(document).ready(function () {
  M.AutoInit();

  $('.modal').modal();
  $('.sidenav').sidenav();
  $('select').formSelect();
  if (localStorage.getItem("tutorLogin") != null) {
    localStorage.removeItem("tutorLogin");
  }
  if (localStorage.getItem("dogWalkerLogin") != null) {
    localStorage.removeItem("dogWalkerLogin");
  }
  let jsonStatus;
  jsonStatus = {
    "status": ONGOING,
    "idDogWalker": "",
    "idTutor": localStorage.getItem("tutorIdLogado")
  }

  let listaPasseiosAtivos = requestPadrao(URL_NOTIFY, "POST", jsonStatus);

  if (listaPasseiosAtivos.length > 0) {
    setNotification();
    caminhar(1, 0, listaPasseiosAtivos[0]);
  }

  jsonStatus = {
    "status": TO_FINISH,
    "idDogWalker": "",
    "idTutor": localStorage.getItem("tutorIdLogado")
  }

  let passeioASerFinalizado = requestPadrao(URL_NOTIFY, "POST", jsonStatus);
  console.log(passeioASerFinalizado);


  if (passeioASerFinalizado.length > 0) {
    console.log(passeioASerFinalizado[0].dogWalkerId);
    setModalAvaliacao(passeioASerFinalizado[0].dogWalkerId);
    $('#modal-passeio-finalizado').modal('open');
  }

});

$('#sair-dogwalker').on("click", function () { sairLogado("dogWalkerIdLogado") });
$('#sair-tutor').on("click", function () { sairLogado("tutorIdLogado") });

function sairLogado(login) {
  localStorage.removeItem(login);
}

$('section.container>i').on("click", function () {

  let id = $(this).attr("id");
  localStorage.setItem("valorAvaliacao", id);

  iteratorStars(5, "star_border");
  iteratorStars(id, "star");
});

$('#btn-send-avaliation').on("click", function () {
  if (!localStorage.getItem("valorAvaliacao")) {
    M.toast({ html: 'Selecione um valor para a avaliação!', displayLength: 1500 });
  } else {
    jsonStatus = {
      "status": TO_FINISH,
      "idDogWalker": "",
      "idTutor": localStorage.getItem("tutorIdLogado")
    }

    let passeioASerFinalizado = requestPadrao(URL_NOTIFY, "POST", jsonStatus);

    passeioASerFinalizado[0]['status'] = "COMPLETED";
    passeioASerFinalizado[0]['avaliacao'] = { "nota": localStorage.getItem("valorAvaliacao") };

    requestPadrao(URL_PASSEIO, "PUT", passeioASerFinalizado[0]);
    localStorage.removeItem("valorAvaliacao");
    $('#modal-passeio-finalizado').modal('close');
    location.reload();
  }
});

function iteratorStars(limit, value) {
  for (let i = 1; i <= limit; i++) {
    $("section.container>i#" + i).html(value);
  }
}

function setNotification() {
  $('li#btn-notification>a').show();
}

function setModalAvaliacao(dogWalkerId) {
  let dados = requestPadrao(URL_DOGWALKER + dogWalkerId, "GET", null);
  if (dados) {

    $('section#container-passeio-finalizado').html(
      `<img class="imagem-perfil circle"
          src="${dados.photoUrl}"
          alt="Foto do seu pet" title="DogWalker">
  
      <div class="card-content center">
          <h6>${dados.nome}</h6>
        </div>
    `);
  }
}

$('#btn-notification').on('click', function () {
  $('#modal-passeio-em-andamento').modal('open');
});

function caminhar(passo, progress, passeio) {
  let left, right;

  left = parseInt($('.pata-left').css('left'));
  right = parseInt($('.pata-right').css('left'));

  if (left < 40) {
    if (passo == 1) {
      $('.pata-left').css('left', (parseInt(left) + 25) + 'px');
    } else {
      $('.pata-right').css('left', (parseInt(right) + 23.5) + 'px');
    }
    passo = passo * -1;
    progress = progress + 1.8;
    setProgressBar(progress);
    setTimeout(function () { caminhar(passo, progress, passeio) }, 1000);
  } else {
    passeio['status'] = "TO_FINISH";
    requestPadrao(URL_PASSEIO, "PUT", passeio);
    location.reload();
  }
}

function setProgressBar(value) {
  $('#bar-progress-bar').css('width', value + "%");
}


