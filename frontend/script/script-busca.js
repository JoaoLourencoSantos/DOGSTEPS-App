const URL_BASE = "http://localhost:8080"
const ROTA_BASE = "dogsteps";

$(document).ready(function () {
  M.AutoInit();
  requestListagem(definirUrl("dogwalkers/filter"), "POST", null);
});

$('#btnBusca').click(function () {
  requestListagem(definirUrl("dogwalkers/filter"), "POST", getJson());
});

function getJson() {
  const LIST_DIAS = ['', 'DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
  const LIST_PORTE = ['', 'MINI', 'SMALL', 'MEDIUM', 'BIG'];
  const LIST_HORARIOS = ['', 'MANHA', 'TARDE', 'NOITE'];

  let porteSelecionado = $('#preferencia').val();
  let diasSelecionados = $('#dias-passeio').val();
  let horariosSelecionados = $('#horarios-passeio').val();

  let porte = porteSelecionado != undefined ? LIST_PORTE[porteSelecionado] : null;
  let dias = popularArraysAgenda(LIST_DIAS, diasSelecionados);
  let horarios = popularArraysAgenda(LIST_HORARIOS, horariosSelecionados);

  let arrayCoordenadas = updateRoute();
  let coordenadas = updateRoute() == null ? null : getArrayCoordenada(arrayCoordenadas)


  return {
    "coordenadas": coordenadas,
    "porte": porte,
    "agenda": {
      "horario": horarios.length == 0 ? null : horarios,
      "dias": dias.length == 0 ? null : dias
    }
  };
}

function getArrayCoordenada(arrayCoordenadas) {

  let menorLongitude = arrayCoordenadas[0][0];
  let maiorLongitude = arrayCoordenadas[0][0];

  let menorLatitude = arrayCoordenadas[0][1];
  let maiorLatitude = arrayCoordenadas[0][1];

  for (i = 1; i < arrayCoordenadas.length; i++) {
    proxLatitude = arrayCoordenadas[i][1];
    proxLongitude = arrayCoordenadas[i][0];
    if (proxLatitude < menorLatitude) {
      menorLatitude = arrayCoordenadas[i][1];
    }

    if (proxLatitude > maiorLatitude) {
      maiorLatitude = arrayCoordenadas[i][1];
    }

    if (proxLongitude < menorLongitude) {
      menorLongitude = arrayCoordenadas[i][0];
    }

    if (proxLongitude > maiorLongitude) {
      maiorLongitude = arrayCoordenadas[i][0];
    }

  }

  let array = new Array();
  array[0] = {
    "latitude": menorLatitude,
    "longitude": menorLongitude
  };
  array[1] = {
    "latitude": maiorLatitude,
    "longitude": maiorLongitude
  };

  return array;
}

function popularArraysAgenda(lista, valores) {
  let array = new Array();
  for (i = 0; i < valores.length; i++) {
    array[i] = lista[valores[i]];
  }
  return array;
}

function alertarUsuario(sobre) {
  let duracao = 1600;

  switch (sobre) {
    case 1:
      M.toast({ html: 'Preencha todos os campos!', displayLength: duracao });
      break;
    case 2:
      M.toast({ html: 'Preencha o campo endereço!', displayLength: duracao });
      break;
    case 3:
      M.toast({ html: 'Selecione o porte do cão!', displayLength: duracao });
      break;
    case 4:
      M.toast({ html: 'Preencha a data do passeio!', displayLength: duracao });
      break;
  }
}

function organizarData(data) {
  data = data.split("/");
  data = data[2] + data[1] + data[0];
  return data;
}

function definirUrl(rotaModulo, id = "") {
  return `${URL_BASE}/${ROTA_BASE}/${rotaModulo}/${id}`;
}

function requestListagem(url, tipoRequisicao, dados) {
  $.ajax({
    url: url,
    type: tipoRequisicao,
    data: JSON.stringify(
      dados != null ?
        dados :
        {
          "endereco": null,
          "porte": null,
          "coordenadas": null,
          "porte": null,
          "agenda": null
        }
    ),
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (response) {
      setLista(response);
    }
  });
}

function setLista(dados) {
  let toAppend = `<article class="col s12 row">`;

  console.log(dados);
  for (i = 0; i < dados.length; i++) {
    toAppend += `<a id="${dados[i].id}" class="modal-trigger btn-modal" href="#open-modal">            
            <div class="box-dogwalker col s6">
                <div class="card-dowalker card horizontal black-text">
                    <label class="center col s4">
                        <img class="imagem-perfil circle"
                            src="${dados[i].photoUrl}" alt="Foto do seu pet"
                            title="DogWalker">
                    </label>
                    <div class="card-stacked col s4">
                        <div class="card-content col s12">
                            <div class="row">
                              `;
    toAppend += setAvaliacoes(dados[i].mediaAvaliacao);
    toAppend += `
                                <span class="grey-text right small">${dados[i].avaliacoes.length} Avaliações</span>
                            </div>
                            <p>${dados[i].descricao}</p>
                        </div>
                        <div class="card-action">
                            <h6>${dados[i].nome}</h6>                           
                        </div>                        
                    </div>                    
                </div>  
                <a id="${dados[i].id}" href="solicitar-passeio.html" class="btn-add-passeio teal lighten-2 modal-close btn-floating waves-effect waves-light btn-flat" title="Clique para selecionar este DogWalker">
                  <i class="material-icons">add</i>
                </a>  
            </div>            
        </a>
        `;
  }

  toAppend += `</article>`;

  $('#listagem-dogwalker').html("");
  $('#listagem-dogwalker').html(toAppend);
}

function setAvaliacoes(avaliacao) {
  let toAppend = ``;

  for (let i = 5; i > 0.0; i--) {
    if (avaliacao % 2 != 0 && i > avaliacao && i < (avaliacao + 1))
      toAppend += `<i class="material-icons right">star_half</i> `
    else if (i <= avaliacao)
      toAppend += `<i class="material-icons right">star</i>`
    else
      toAppend += `<i class="material-icons right">star_border</i> `
  }

  return toAppend;
}



$(document).on('click', '.btn-modal', function () {
  let id = $(this).attr('id');
  localStorage.setItem("dogWalkerId", id);
  getDogWalkerById(definirUrl("dogwalkers/" + id));
});

$(document).on('click', '.btn-add-passeio', function () { // metodo para setar o id no localStorage
  let id = $(this).attr('id');
  localStorage.setItem("dogWalkerId", id);
});


function getDogWalkerById(url, tipoRequisicao) {
  $.ajax({
    url: url,
    type: tipoRequisicao,
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (response) {
      setModal(response);
    }
  });
}

async function setModal(response) {
  let toAppend = `
  <div class="box-image-modal col s12">
				<img class="imagem-perfil-modal circle"
					src="${response.photoUrl}"
					alt="Foto de perfil do dogwalker">
				<h4>${response.nome}</h4>
			</div>
			<div>
				<div class="detalhes col s12">
					<div>
						<h6 class="col s6">Endereço:</h6>
						<h6>${response.endereco.rua}</h6>
					</div>
					<div>
						<h6 class="col s6">Idade:</h6>
						<h6>${response.idade}</h6>
					</div>
				</div>
				<div class="detalhes col s12">
					<div>
						<h6 class="col s6">Email:</h6>
						<h6>${response.email}</h6>
					</div>
					<div>
						<h6 class="col s6">Telefone:</h6>
						<h6>3135135135</h6>
					</div>
        </div>	     
        
        <div class="detalhes col s1">
          <h6 class="col s6">Preferencias:</h6>
       </div>
        		
				<div class="detalhes col s12">
					<div>
						<h6 class="col s6">Porte:</h6>
						<h6>${response.preferencias.porte}</h6>
					</div>
					<div>
						<h6 class="col s6">Temperamento:</h6>
						<h6>${response.preferencias.temperamento}</h6>
					</div>
        </div>
        <div class="detalhes col s12">
					<div>
						<h6 class="col s6">Horario:</h6>
						<h6>${response.agenda.horario}</h6>
					</div>
					<div>
						<h6 class="col s6">Dias:</h6>
						<h6>${response.agenda.dias}</h6>
					</div>
				</div>
			</div>
  `;

  $('.container-detail').html('');
  $('.container-detail').html(toAppend);
}

let styleLine = {
  "id": "gl-draw-line",
  "type": "line",
  "filter": ["all", ["==", "$type", "LineString"],
    ["!=", "mode", "static"]
  ],
  "layout": {
    "line-cap": "round",
    "line-join": "round"
  },
  "paint": {
    "line-color": "#438EE4",
    "line-dasharray": [0.2, 2],
    "line-width": 4,
    "line-opacity": 0.7
  }
};
let stylePoligono = {
  "id": "gl-draw-polygon-and-line-vertex-halo-active",
  "type": "circle",
  "filter": ["all", ["==", "meta", "vertex"],
    ["==", "$type", "Point"],
    ["!=", "mode", "static"]
  ],
  "paint": {
    "circle-radius": 12,
    "circle-color": "#FFF"
  }
};
let styleVertice = {
  "id": "gl-draw-polygon-and-line-vertex-active",
  "type": "circle",
  "filter": ["all", ["==", "meta", "vertex"],
    ["==", "$type", "Point"],
    ["!=", "mode", "static"]
  ],
  "paint": {
    "circle-radius": 8,
    "circle-color": "#438EE4",
  }
}

var canvas = map.getCanvasContainer();

let draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    line_string: true,
    trash: true
  },
  styles: [styleLine, stylePoligono, styleVertice]
})

map.addControl(draw);

function updateRoute() {
  let profile = "driving";
  let data = draw.getAll();
  if (data.features.length == 0) {
    return null;
  } else {
    let lastFeature = data.features.length - 1;
    let coords = data.features[lastFeature].geometry.coordinates;
    let newCoords = coords.join(';')
    let radius = [];
    coords.forEach(element => {
      radius.push(25);
    });
    return getMatch(newCoords, radius, profile)
  }
}


function getMatch(coordinates, radius, profile) {
  let radiuses = radius.join(';')
  let query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;
  let dados;

  $.ajax({
    method: 'GET',
    url: query,
    async: false, // ao acrescentar async: false,  ele faz com que ela tenha que esperar a função ser executada para deixar a proxima acabar a execução
    success: function (response) {
      return response.matchings[0].geometry;
    }
  }).done(function (data) {
    dados = data.matchings[0].geometry.coordinates;
  });

  return dados;
}

$('#btn-getCoord').click(function () {
  updateRoute()
});

geocoder.on('result', function (ev) {
  console.log(ev)
  localizacao = ev.result.place_name;
  bairro = localizacao.split(',')[0];
  cidade = localizacao.split(',')[1].split('-')[0];
  $('#search').val(bairro + " - " + cidade)
  localizacao = ev.result;
});












