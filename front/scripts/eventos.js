// ao carregar documento
$(document).ready(function() {
    /*******************************************
    EVENTOS
    *******************************************/
    // LINKS
    $(document).on('click','a', function(evento) {
        // previnindo evento padrao
        evento.preventDefault();
        // obtendo pagina destino
        var pagina = $(this).attr('href');
        // se pagina for logout
        if (pagina == 'logout') {
            // efetua logout
            logout();
        // se for deletar
        } else if (pagina == 'deletar'){
            // obtendo id da nota
            var id = $(this).parent().siblings('.id').html().trim();
            // deletando nota
            deletar(id);
        } else if (pagina == 'editar'){
            // obtendo id da nota
            var id = $(this).parent().siblings('.id').html().trim();
            // deletando nota
            editar(id);
        } else {
            // chamando pagina
            chamar_pagina(pagina);
        }
    });

    // FORMULÁRIOS
    $(document).on('submit','form', function(evento) {
        // previnindo evento padrao
        evento.preventDefault();
        // enviando formulário e obtendo resposta
        enviar_formulario($(this), URLS);
    });

    /*******************************************
    INICIANDO APLICATIVO
    *******************************************/
    // carregando urls
    carregar_urls();
    // iniciando aplicativo
    iniciar_aplicativo();
});