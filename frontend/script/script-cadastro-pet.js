$('#next').click(function () {
    let begin = 1, max = 5, next = 1;
    setContext(begin, max, next);
});
$('#preview').click(function () {
    let begin = 2, max = 6, next = -1;
    setContext(begin, max, next);
});
$('#send').click(function () {
    let duration = 1300;
    let data = $("#resp").get(0);
    if (validateData(data)) {
        const URL_PET = "http://localhost:8080/dogsteps/pets/";

        requestPet(URL_PET, "POST", getJson(data));
        clearCash();
    }
    else
        M.toast({ html: 'É necessário preencher todos os campos!', displayLength: duration })
});

const asks = ['', 'Qual o nome do seu caõzinho?',
    'Qual a raça do seu cãozinho?',
    'Qual a idade do seu caozinho?',
    'É menino ou menina?',
    'Ele tem um temperamento muito forte, ou ele é um animalzinho mais calmo? Descreva-o um pouco mais!'];

function setContext(begin, max, next) {
    while (begin < max) {
        if ($('ul#pags>li:nth-child(' + begin + ')').attr("class") == "active waves-effect #00796b teal darken-2") {
            $('ul#pags>li:nth-child(' + begin + ')').attr("class", "");
            $('ul#pags>li:nth-child(' + (begin + next) + ')').attr("class", "active waves-effect #00796b teal darken-2");
            $('#pergunta').html(asks[begin + next]);
            inputs(begin + next);
            break;
        }
        begin++;
    }
}


function inputs(index) {
    if (index == 4) {
        $('#sexo').show();
        $('#resp').hide();
    } else {
        $('#sexo').hide();
        $('#resp').show();
        for (let i = 0; i < $('form#resp>input.resposta').length; i++) {
            if (i == index)
                $('form#resp>input.resposta:nth-child(' + i + ')').show();
            else
                $('form#resp>input.resposta:nth-child(' + i + ')').hide();
        }
    }
    if (index == 1) {
        $('#preview').css('display', 'none');
    } else if (index == 5) {
        $('form#resp>input.resposta:nth-child(' + 4 + ')').show();
        $('#send').show();
        $('#next').hide();
    } else {
        $('form#resp>input.resposta:nth-child(' + 4 + ')').hide();
        $('#next').show();
        $('#send').hide();
        $('#preview').show();
    }
}

function validateData(data) {
    let result = true;
    for (let i = 0; i < data.length; i++) {
        if (data[i].value == null && data[i].value.length <= 0)
            result = false;
    }
    if (data[2].value < 0)
        result = false;
    if ($("input[name='group1']:checked").val() == undefined)
        result = false;
    if (localStorage.getItem("Image") == null)
        result = false;
    return result;
}

function clearCash() {
    localStorage.removeItem("Image");
}

function getJson(data) {
    let response = {
        nome: data[0].value,
        raca: data[1].value,
        idade: data[2].value,
        descricao: data[3].value,
        sexo: $("input[name='group1']:checked").val(),
        foto: localStorage.getItem("Image"),
        tutorId: localStorage.getItem("tutorIdLogado")
    }
    return response;
}

function getImage(e1) {
    var filename = e1.target.files[0];
    var fr = new FileReader();
    fr.onload = function (e2) {
        localStorage.setItem("Image", e2.target.result);
        $('#imagem-pet').attr({
            src: localStorage.getItem("Image"),
            class: 'responsive-img medium circle',
            title: 'Selecionar outra foto'
        });
        $('#imagem-pet').css('opacity', '1');
    };
    fr.readAsDataURL(filename);
}

window.onload = function () {
    $('#add-imagem').change(getImage);
}


function requestPet(url, method, data) {
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
        statusCode: {
            200: () => {
                M.toast({ html: 'O seu cãozinho foi adicionado com sucesso!', displayLength: 1200 })
                setTimeout(function () {
                    window.location.href = "../home-tutor.html";
                }, 1200);
            }
        }
    });
    return dados;
}






