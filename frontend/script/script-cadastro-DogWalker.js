$(document).ready(function () {
    M.AutoInit();
    $('#celular').mask('(99) 9 9999 - 9999');
});

var localizacao = null;
geocoder.on('result', function (ev) {
    $('#search').val(ev.result.place_name)
    localizacao = ev.result;
});

$('#next').click(function () {
    let begin = 1, max = 4, next = 1;
    setContext(begin, max, next);
});
$('#preview').click(function () {
    let begin = 2, max = 5, next = -1;
    setContext(begin, max, next);
});
$('#send').click(function () {
    let data = $("#resp").get(0);
    if (validateData(data)) {
        request(getJson(data))        
        window.location.href = "../login.html";
        alertUsuario(1);
    }
    else
        alertUsuario(2);
});

function request(dados) {
    const URL_DOGWALKER = "http://localhost:8080/dogsteps/dogwalkers/";
    let dogWalker = requestPadrao(URL_DOGWALKER, "POST", dados, "login.html");
}

function setContext(begin, max, next) {
    while (begin < max) {
        if ($('ul#pags>li:nth-child(' + begin + ')').attr("class") == "active waves-effect #00796b teal darken-2") {
            $('ul#pags>li:nth-child(' + begin + ')').attr("class", "");
            $('ul#pags>li:nth-child(' + (begin + next) + ')').attr("class", "active waves-effect #00796b teal darken-2");

            inputs(begin + next);
            break;
        }
        begin++;
    }
}

function inputs(index) {
    $('#select-endereco').hide();
    $('.card-title').hide();
    $('.input-field').hide();
    $('#send').hide();
    $('#texto').hide();
    $('#next').show();
    $('.imagem-identidade-label').hide();
    $('#preview').css('display', 'block');
    $('.content-container').show();
    $('form#resp>input.resposta:nth-child(' + 13 + ')').hide();
    $('#label').css('margin-top', '10px');

    if (index == 1) {
        showCampos(1, 7);
        esconderCampos(7, 10);
        $('#pergunta').hide();
        $('#preview').css('display', 'none');

        $('#label').css('margin-top', '15px');
        $('#label').show();
    }
    if (index == 2) {
        esconderCampos(1, 6);
        showCampos(7, 13);
        $('#pergunta').hide();
        $('#label').css('margin-top', '-5px');
        $('#label').show();
    }

    if (index == 2) {
        esconderCampos(1, 14);
        $('.card-title').html('Um pouco mais sobre suas preferencias: ');
        $('.card-title').show();
        $('#label').css('margin-top', '40px');
        $('#preview').css('display', 'block');
        $('.input-field').show();
        $('#label').show();
        $('#select-endereco').hide();
    }
    if (index == 3) {

        $('.card-title').html('Sobre você: ');
        $('.card-title').show();
        $('#texto').show();
        $('#label').show();
        $('#label').css('margin-top', '40px');
        $('#descricao').show();
    }

    if (index == 4) {
        $('.card-title').show();
        $('.card-title').html('Escolha o seu endereço : ');
        $('#descricao').hide();
        $('#select-endereco').show();
        $('#texto').hide();
        $('#label').hide();
        $('#next').hide();
        $('#send').show();
    }

}

function showCampos(min, max) {
    for (j = min; j < max; j++) {
        $('form#resp>input.resposta:nth-child(' + j + ')').show();
    }
}
function esconderCampos(min, max) {
    for (j = min; j <= max; j++) {
        $('form#resp>input.resposta:nth-child(' + j + ')').hide();
    }
}
var contador = 0;
function validateData(data) {
    let result = true;
    for (let i = 0; i < data.length; i++) {
        if (data[i].value == null || data[i].value.length <= 0) {
            result = false;
        }
    }

    if (!validarCPF(data[2].value)) {
        alertUsuario(3);
        result = false;
    }

    if (!validarSenha(data[5].value)) {
        alertUsuario(5);
        result = false;
    }

    if (idade(toDate(data[1].value), new Date()) < 18) {
        alertUsuario(6);
        result = false;
    }

    if (localStorage.getItem("Image") == null)
        result = false;
    localStorage.setItem("dogWalkerLogin", JSON.stringify({
        "email": data[4].value,
        "senha": data[5].value
    }));
    return result;
}

function idade(nascimento, hoje) {
    var diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
    if (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
        new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()))
        diferencaAnos--;
    return diferencaAnos;
}

function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function getJson(data) {
    const LIST_DIAS = ['', 'DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
    const LIST_PORTE = ['', 'MINI', 'SMALL', 'MEDIUM', 'BIG'];
    const LIST_HORARIOS = ['', 'MANHA', 'TARDE', 'NOITE'];
    const LIST_TEMPERAMENTO = ['', 'CALMO', 'BRINCALHAO', 'PREGUICOSO', 'AGRESSIVO'];

    let diasSelecionados = $('#dias-passeio').val();
    let portesSelecionados = $('#preferencia').val();
    let horariosSelecionados = $('#horarios-passeio').val();
    let temperamentosSelecionados = $('#temperamento').val();


    let dias = popularArraysAgenda(LIST_DIAS, diasSelecionados);
    let portes = popularArraysAgenda(LIST_PORTE, portesSelecionados);
    let horarios = popularArraysAgenda(LIST_HORARIOS, horariosSelecionados);
    let temperamentos = popularArraysAgenda(LIST_TEMPERAMENTO, temperamentosSelecionados);

    center = localizacao.center;
    rua = localizacao.place_name.split(',')[0];
    bairro = localizacao.place_name.split(',')[1];
    cidade = localizacao.place_name.split(',')[2].split('-')[0];
    estado = localizacao.place_name.split(',')[2].split('-')[1];
    cep = localizacao.place_name.split(',')[3];

    let response = {
        "nome": data[0].value,
        "idade": idade(toDate(data[1].value), new Date()),
        "cpf": data[2].value,
        "celular": data[3].value,
        "email": data[4].value,
        "senha": data[5].value,
        "endereco": {
            "estado": estado,
            "cidade": cidade,
            "bairro": bairro,
            "rua": rua,
            "CEP": cep,
            "coordenada": {
                "longitude": center[0],
                "latitude": center[1]
            }
        },
        "agenda": {
            "horario": horarios,
            "dias": dias
        },
        "descricao": $('#descricao').val(),
        "preferencias": {
            "porte": portes,
            "temperamento": temperamentos
        },
        "photoUrl": localStorage.getItem("Image")
    }
    return response;
}


function popularArraysAgenda(lista, valores) {
    let array = new Array();
    for (i = 0; i < valores.length; i++) {
        array[i] = lista[valores[i]];
    }
    return array;
}

function getImage(e1) {
    var filename = e1.target.files[0];
    var fr = new FileReader();
    fr.onload = function (e2) {
        localStorage.setItem("Image", e2.target.result);
        $('#imagem-perfil').attr({
            src: localStorage.getItem("Image"),
            class: 'responsive-img medium circle',
            title: 'Selecionar outra foto'
        });
        $('#imagem-perfil').css('opacity', '1');
    };
    fr.readAsDataURL(filename);
}

window.onload = function () {
    $('#add-imagem').change(getImage);
    this.inputs(1);
}

function validarTelefone(number) {
    let resultado = true;
    let a;

    for (i = 0; i < number.length; i++) {
        a = parseInt(number.charAt(i));

        if (isNaN(a))
            resultado = false
        if (!isNumber(a)) {
            resultado = false;
        }
    }
    return resultado;
}


function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;
    // Valida 1o digito	
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;
    return true;
}


function isNumber(val) {
    let result = true;
    if ((typeof val === "number") || val === undefined) {
        result = true;
    }
    else {
        result = false;
    }
    return result;
}

function validarSenha(ObjSenha) {
    if (ObjSenha.length <= 6) {
        return false;
    }
    else
        return true;
}

$(document).ready(function () {
    $('.datepicker').datepicker(
        {
            i18n: {
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
                weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
                weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                today: 'Hoje',
                clear: 'Limpar',
                cancel: 'Sair',
                done: 'Confirmar',
                labelMonthNext: 'Próximo mês',
                labelMonthPrev: 'Mês anterior',
                labelMonthSelect: 'Selecione um mês',
                labelYearSelect: 'Selecione um ano',
                selectMonths: true,
                selectYears: 15,

            },
            yearRange: 100,
            format: 'dd/mm/yyyy',
            container: 'body',
            minDate: new Date(1800, 01, 01),
            autoClose: true,
        });
});
;

$(document).ready(function () {
    $('select').formSelect();
});

function alertUsuario(i) {
    let duration = 1300;
    if (i == 1)
        M.toast({ html: 'Cadastro realizado com sucesso', displayLength: duration });

    if (i == 2)
        M.toast({ html: 'É necessário preencher todos os campos!', displayLength: duration })


    if (i == 3) {
        M.toast({ html: 'CPF Inválido!', displayLength: duration })
    }

    if (i == 5) {
        M.toast({ html: 'A senha deve ter no mínimo 6 digitos!', displayLength: duration })
    }

    if (i == 6)
        M.toast({ html: 'Somente maiores de idade podem ser DogWalkers', displayLength: duration })
    if (i == 7)
        M.toast({ html: 'email inválido', displayLength: duration })
}