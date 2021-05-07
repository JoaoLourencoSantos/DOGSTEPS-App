$(document).ready(function () {
	M.AutoInit();

	if (localStorage.getItem("tutorLogin") != null) {
		$(".email").val(JSON.parse(localStorage.getItem("tutorLogin")).email)
		$("#password").val(JSON.parse(localStorage.getItem("tutorLogin")).senha);

	}
	if (localStorage.getItem("dogWalkerLogin") != null) {
		$(".email").val(JSON.parse(localStorage.getItem("dogWalkerLogin")).email)
		$("#password").val(JSON.parse(localStorage.getItem("dogWalkerLogin")).senha);
	}
	$('.parallax').parallax();

});

$('#botao-login').click(function () {
	let data = $('#form-login').get(0);

	if (validarPreenchimentoCampos(data))
		realizarLogin(obterJsonRequest(data));
});



function realizarLogin(dados) {

	const URL_LOGIN = "http://localhost:8080/dogsteps/login/";
	let user = requestPadrao(URL_LOGIN, "POST", dados);

	if (user) {
		if (user.type !== "") {
			if (user.type == "Tutor") {
				localStorage.setItem("tutorIdLogado", user.id);
				setTimeout(function () {
					window.location.href = "../home-tutor.html";
				}, 1500);
			}
			if (user.type == "DogWalker") {
				localStorage.setItem("dogWalkerIdLogado", user.id);
				setTimeout(function () {
					window.location.href = "../home-dogwalker.html";
				}, 1500);
			}
		}
		else {
			M.toast({ html: 'Verifique email e a senha', displayLength: 600 })
		}
	}
}

function obterJsonRequest(dados) {
	return { "email": dados[0].value, "senha": dados[1].value };
}

function validarPreenchimentoCampos(dados) {
	return (dados[0].value != null || dados[1].value != null)
}