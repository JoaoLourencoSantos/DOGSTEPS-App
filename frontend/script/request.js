function requestPadrao(url, method, data, redirection) {
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