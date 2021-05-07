$(document).ready(function () {
    getData();
});

var respostas = new Array();

function getData() {
    const base = "http://localhost:8080/dogsteps/estatisticas/";
    $.ajax({
        type: "GET",
        async: false,
        url: base,
        contentType: "aplication/json",
        dataType: "json",
        success: (response) => {
            mostraEstatisticas(response);

        }
    })
}

function mostraEstatisticas(data) {
    $("#media-idade-passeador").html(data.media_idade_passeadores.media_idade_passeador)
    $("#total-cadastrados").html(data.total_de_cadastros.cadastros)
    $("#total-passeio").html(data.passeios.total);
    $("#passeio-finalizado").html(data.passeios.COMPLETED);
    $("#passeio-em-andamento").html(data.passeios.INITIALIZED);
    $("#passeio-aguardando-avaliacao").html(data.passeios.TO_FINISH);
    $("#passeio-aceito").html(data.passeios.ACCEPTED);
    $("#passeio-pendente").html(data.passeios.PENDING);
    $("#pets-por-tutor").html(data.pets_por_tutor.media);
    $("#horarios-uma-hora").html(data.media_duracao_passeio.E1HORA);
    $("#horario-meia-hora").html(data.media_duracao_passeio.E30MINUTOS);
    const dados = {
        total: data.passeios.total,
        finalizado: data.passeios.COMPLETED,
        emAndamento: data.passeios.ONGOING,
        aguardandoAvl: data.passeios.TO_FINISH,
        aceitos: data.passeios.ACCEPTED,
        pendentes: data.passeios.PENDING
    }
    constroiGraficos(dados);
}

function constroiGraficos(data) {
    console.log(data)

    var ctx = document.getElementById('grafico-passeio').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Quantidade total', 'Finalizados', 'Em andamento', 'Aguardando avaliação'],
            datasets: [{
                data: [data.total, data.finalizado, data.emAndamento, data.aguardandoAvl],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'green',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'green',
                ],
                borderWidth: 1,

            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'white',
                        fontSize: 15
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'white',
                        fontSize: 15
                    }
                }]
            },
            legend: {
                display: false
            }
        }

    });



}

