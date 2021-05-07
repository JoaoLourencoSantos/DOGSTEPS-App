const URL_BASE = "http://localhost:8080/"
const ROTA_BASE = "dogsteps/";
const URL_PET = URL_BASE + ROTA_BASE + "pets/";
const URL_DOGWALKER = URL_BASE + ROTA_BASE + "dogwalkers/";
const URL_PASSEIOS = URL_BASE + ROTA_BASE + "tours/"

$(document).ready(() => {
    M.AutoInit();
    $('.tabs').tabs(
        {
            swipeable: true,
        }
    );
    const login = localStorage.getItem("dogWalkerIdLogado");
    carregaPerfil(login);
    document.querySelector('.tabs-content.carousel').style.height = (window.innerHeight / window.innerWidth > 1) ?
        (window.innerHeight / 1.6) + "px" : window.innerHeight + "px";
    $('.fixed-action-btn').floatingActionButton();
})

$("#listagem").on('click', "a.rejeitar-passeio", function () {
    updateStatus($(this).attr("data-id-passeio"), "REFUSED")
});

$("#listagem").on('click', "a.aceitar-passeio", function () {
    updateStatus($(this).attr("data-id-passeio"), "ONGOING")
});

function updateStatus(id, status) {
    let passeio = requestPadrao(URL_PASSEIOS + id, "GET", null);
    console.log("oii");
    console.log(passeio);
    if (passeio) {
        passeio.status = status;
        request(URL_PASSEIOS, "PUT", passeio)
    }
}

function requestPadrao(url, method, data) {
    let dados;
    $.ajax({
        url: url,
        type: method,
        async: false,
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (response) {
            dados = response;
        }
    });
    return dados;
}


function request(url, tipoRequisicao, dados) {
    console.log(dados)
    $.ajax({
        url: url,
        type: tipoRequisicao,
        data: JSON.stringify(
            dados
        ),
        datatype: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function () {
            carregaPerfil(dados.dogWalkerId);

        }
    });
}

function carregaPerfil(login) {
    let dogWalker = requestPadrao(URL_DOGWALKER + login, "GET", null);
    let passeios = requestPadrao(URL_PASSEIOS + "filter/", "POST", {
        idDogWalker: login
    });

    if (dogWalker) {
        if (dogWalker) {
            $("#username").html(dogWalker.nome);
            $("#foto-perfil").attr("src", dogWalker.photoUrl);
            $("#foto-perfil-menor").attr("src", dogWalker.photoUrl);
        }
        preencheOsCamposConfiguracoes(dogWalker)
    }

    console.log(passeios);

    if (passeios) {
        constroiCards(passeios);
    }
}


function getStringStatus(status) {
    if (status === "pending") {
        return "Passeio Pendente";
    }
    if (status === "completed") {
        return "Passeio Completo";
    }
    if (status === "ongoing") {
        return "Passeio Em Andamento";
    }
    if (status === "refused") {
        return "Passeio Recusado";
    }
    if (status === "to_finish") {
        return "Aguardando Avaliação";
    }
    return "Passeio";
}


function constroiCards(data) {
    $("#carregando").slideUp(2000).fadeOut(300);

    let passeios;
    let passeiosPendentes;

    if (data) {
        passeiosPendentes = data.filter(data => (data.status === "PENDING"));
        passeios = data.filter(data => data.status !== "PENDING")
    }

    $('#count').html(passeios.length);

    if (passeiosPendentes && passeiosPendentes.length > 0) {
        $("#listagem").html("");

        passeiosPendentes.forEach(passeio => {
            let horario = passeio.agenda.horario.toString().toLowerCase();
            let dias = passeio.agenda.dias.toString().toLowerCase();
            let status = passeio.status.toString().toLowerCase();
            
            $("#listagem").append(`<div class="col s10 m4">

                                <div class="card">
                                    <div class="card-image">
                                         <img src="assets/dog.jpg">
                                         <span style="background:rgba(0,0,0,0.5); width:100%"  class="card-title"> ${getStringStatus(status)} </span>
                                           
                                            </div>
                                    <div class="card-content">
                                        <p>Passeio está marcado para ser realizado ${dias} de
                                            ${horario}
                                        </p>
                                        <div class="opcoes">
                                        
                                            <a class="botao-opcao waves-effect waves-red red darken-3 btn 
                                            rejeitar-passeio" data-id-passeio="${passeio.id}"><i class="material-icons rejeitar-passeio" 
                                            
                                                >cancel</i>Rejeitar
                                            </a>
                                            <a class="botao-opcao waves-effect waves-grenn darken-3 btn
                                                    aceitar-passeio" data-id-passeio="${passeio.id}">
                                                    <i class="material-icons aceitar-passeio"
                                                    
                                                >check_circle</i>Confirmar
                                            </a>
                                        </div>

                                    </div>
                            </div>
                            </div>`).fadeIn(2000);
        });
    } else {
        $("#listagem").html("");
        $("#sem-passeios").fadeIn(1300).css('text-align', 'center');
    }
    if (passeios && passeios.length > 0) {
        $("#historico").html("");

        passeios.forEach(passeio => {
            let horario = passeio.agenda.horario.toString().toLowerCase();
            let dias = passeio.agenda.dias.toString().toLowerCase();
            let status = passeio.status == undefined ? "Passeio" : passeio.status.toLowerCase();

            $("#historico").append(`<div class="col s10 m4">

                                <div class="card">
                                    <div class="card-image">
                                         <img class="circle" src="assets/dog.jpg">
                                            <span style="background:rgba(0,0,0,0.5); width:100%"  class="card-title"> ${getStringStatus(status)} </span>                                    
                                    </div>
                                    <div class="card-content">
                                        <p>Passeio marcado para ser realizado no(s) dias <b>${dias}</b> 
                                            na parte da <b>${horario}</b></p>
                                    </div>
                            </div>
                            </div>`).fadeIn(2000);
        });
    } else {
        $("#historico").html("");
        $("#sem-pets").fadeIn(300).css('text-align', 'center');
    }

}

function carregarModal() {
    $(".modal-content h4").html(`Deseja cancelar o passeio?`)
    $(".modal-form").html('');
    $(".modal-footer").html(`
                                <button class="btn waves-effect waves-light modal-close red" id="delete-pet" type="button">excluir
                                    
                                </button>

                                <button class="btn waves-effect waves-light modal-close" id="salvar-edicao-pet" type="button">sair
                                    
                                </button>

        `)

}


function preencheOsCamposConfiguracoes(data) {
    if (data) {
        $("#nome").attr("value", data.nome);
        $("#password").attr("value", data.senha);
        $("#email").attr("value", data.email);
    }
}