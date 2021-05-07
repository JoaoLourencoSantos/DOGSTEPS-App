const URL_BASE = "http://localhost:8080/"
const ROTA_BASE = "dogsteps/";
const URL_PET = URL_BASE + ROTA_BASE + "pets/";
const URL_TUTOR = URL_BASE + ROTA_BASE + "tutores/"
const URL_PASSEIOS = URL_BASE + ROTA_BASE + "tours/"

$(document).ready(function () {
    $('.tabs').tabs(
        {
            swipeable: true,
        }
    );
    const login = localStorage.getItem("tutorIdLogado");
    carregaPerfil(login);
    document.querySelector('.tabs-content.carousel').style.height = (window.innerHeight / window.innerWidth > 1) ?
        (window.innerHeight / 1.6) + "px" : window.innerHeight + "px";
    $('.fixed-action-btn').floatingActionButton();
});

$(".listagem-pets").on('click', 'a.btn-floating.halfway-fab.waves-effect', () => {
    carregarModal(2, $(this))
    $("#salvar-edicao-pet").on('click', () => {
        update($("#form-pet :input"))
    })
});

$("#submit-config").click(function () {
    handler($("#form-configuracoes :input"));
});

$("#form-configuracoes").submit(function () {
    handler($("#form-configuracoes :input"));
});

function carregaPerfil(login) {
    let tutor = requestPadrao(URL_TUTOR + login, "GET", null);
    let passeios = requestPadrao(URL_PASSEIOS + "filter/", "POST", {
        idTutor: login
    });

    if (tutor) {
        $("#username").html(tutor.nome);
        $("#foto-perfil").attr("src", tutor.photoUrl);
        $("#foto-perfil-menor").attr("src", tutor.photoUrl);
        preencheOsCamposConfiguracoes(tutor)
    }

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

    if (data) {
        passeios = data;
        pets = data.pets;
    }

    $("#count").html(passeios.length);

    if (passeios.length > 0) {
        $(".listagem").html("");
        passeios.forEach(passeio => {
            let horario = passeio.agenda.horario.toString().toLowerCase();
            let dias = passeio.agenda.dias.toString().toLowerCase();
            let status = passeio.status.toString().toLowerCase();
            $(".listagem").append(`
            <div class="col s10 m4">
                <div class="card">
                    <div class="card-image">
                            <img src="assets/dog.jpg">                                            
                            <span  style="background:rgba(0,0,0,0.5); width:100%" class="card-title"> ${getStringStatus(status)}</span>
                            </div>
                    <div class="card-content">
                        <p>
                            Passeio marcado para ser realizado no(s) dias <b>${dias}</b> 
                            na parte da <b>${horario}</b>
                        </p>
                    </div>
            </div>
            </div>`).fadeIn(2000);
        });
    } else {
        $(".listagem").html("");
        $("#sem-passeios").fadeIn(1300).css('text-align', 'center');
    }
}

function preencheOsCamposConfiguracoes(data) {
    console.log(data);
    if (data) {
        $("#nome").attr("value", data.nome);
        $("#password").attr("value", data.senha);
        $("#email").attr("value", data.email);
    }
    if (data.pets.length > 0) {
        pets = data.pets;
        $("#pets").html("");
        pets.forEach(pet => {
            $("#pets").append(`
            <div id="box-pet" class="col s10 m4">
                <div class="card">
                    <div class="card-image">
                        <img src="${pet.foto}">
                        <span style="background:rgba(0,0,0,0.5); width:100%" class="card-title">${pet.nome}</span>
                        <a style="position:fixed;" 
                    </div>
                </div>
            </div>`);
        });
    } else {
        $("#sem-pets").fadeIn(300).css('text-align', 'center');
    }
}

function carregarModal(modo, dados) {

    if (modo == 1) {
        $(".modal-content h4").html(`<i class="material-icons">priority_high</i>Deseja cancelar o passeio?`)
        $(".modal-form").html('');
        $(".modal-footer").html(`<a href="#!" class="modal-close waves-effect waves-green btn">Não</a>
    <a class="modal-close waves-effect waves-grenn red darken-3 btn" id="cancelar-passeio">Confirmo</a>`)
    } else {

        $(".modal-content h4").html(`Editar Pet`)
        $(".modal-form").html(`<form class="col s12" id="form-pet">
                                    <h5>Altere o nome de ` + $(dados).attr("data-nome-pet") + `</h5>
                                <div class="row">
                                    <div class="input-field col s6 m6">
                                        <input id="nome" type="text" class="validate" placeholder="Nome">
                                    </div>
                                </div>
                                <h5>Alterar foto</h5>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <input id="file-input" type="file" accept="image/x-png,image/gif,image/jpeg" />
                                    </div>
                                </div>
                            </form>`)
        $(".modal-footer").html(`
                                <button class="btn waves-effect waves-light modal-close red" id="delete-pet" type="button">excluir
                                    <i class="material-icons right">delete</i>
                                </button>

                                <button class="btn waves-effect waves-light modal-close" id="salvar-edicao-pet" type="button">salvar
                                    <i class="material-icons right">send</i>
                                </button>

        `)

    }

}

function handler(formulario) {
    const dataObject = validarCampos(formulario);
    if (dataObject != null) {
        update(dataObject);
    }
}

function validarCampos(data) {
    const email = data[2].value;
    const nomeInvalido = data[0].value == 0;
    const senhaInvalida = data[1].value == 0;
    const emailInvalido = data[2].value == 0 ? true : checaEmailInvalido(email.toString());
    const algoInvalido = nomeInvalido || emailInvalido || senhaInvalida;

    if (algoInvalido) {
        if (nomeInvalido)
            M.toast({ html: 'nome inválido' })
        else if (emailInvalido)
            M.toast({ html: 'email inválido' })
        else if (senhaInvalida)
            M.toast({ html: 'senha inválida' })
        else
            M.toast({ html: 'Preencha todos os campos' })
    }

    else {
        return {
            "type": "tutor",
            "id": localStorage.getItem("Login"),
            "agenda": {},
            "cpf": "25324554879",
            "email": data[2].value,
            "endereco": {},
            "idade": 20,
            "nome": data[0].value,
            "photoUrl": localStorage.getItem("Dogsteps") ? localStorage.getItem("Dogsteps") : 'assets/perfil.png',
            "senha": data[1].value,
            "passeios": [],
            "pets": []
        };
    }
}

function checaEmailInvalido(email) {
    const characteres = email.length;
    let i;
    for (i = 0; i < characteres; i++) {
        if (email[i] === "@")
            return false
    }
    return true;
}

function add(data) {
    $.ajax({
        type: 'POST',
        url: URL_TUTOR,
        contentType: 'application/json',
        data: JSON.stringify(data),
        sucess: M.toast({ html: 'Solicitação realizada com sucesso !' })
    });
}

function update(data) {
    $.ajax({
        type: "PUT",
        url: URL_TUTOR,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {
            carregaPerfil();
            M.toast({ html: 'Solicitação realizada com sucesso !' })
        }, error: function (response) {
            M.toast({ html: response })
        },
    });
}

function apagar(id, url) {
    $.ajax({
        type: "DELETE",
        url: url + id,
        dataType: 'json',
        success: function (response) {
            M.toast({ html: 'Solicitação realizada com sucesso !' })
        }
    });
}

