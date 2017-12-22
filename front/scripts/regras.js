/*******************************************
REGRAS
*******************************************/
// GLOBAL URLS
var URLS;

// AUTENTICAR USUÁRIO
function autenticar_usuario() {
    // variavel para armazenar autenticação : padrão falso
    var autenticado = false;
    // verifica se existe um username na sessão
    if (sessionStorage.nome) {
        // usuario autenticado : true
        autenticado = true;
    }
    // retorna autenticação
    return autenticado;
}

// EFETUAR LOGIN
function efetuar_login(resposta) {
    // verificando se foi efetuado login
    if(resposta.estado != 'erro'){
        // salvando nome na sessão
        sessionStorage.setItem('nome', resposta.nome);
        // salvando username na sessão
        sessionStorage.setItem('username', resposta.username);
        // salvando password na sessão
        sessionStorage.setItem('password', resposta.password);
        // reiniciando aplicativo
        iniciar_aplicativo();
        // exibir mensagem
        exibir_mensagem('sucesso', resposta.mensagem);
    // se não logou
    } else {
        // exibe mensagem
        exibir_mensagem('aviso', resposta.mensagem);
    }
}

// EFETUAR CADASTRO
function efetuar_cadastro(resposta) {
    // verificando se foi efetuado o cadastro
    if(resposta.estado != 'erro'){
        // reiniciando aplicativo
        iniciar_aplicativo();
        // exibir mensagem
        exibir_mensagem('sucesso', resposta.mensagem);
    // se não logou
    } else {
        // exibe mensagem
        exibir_mensagem('aviso', resposta.mensagem);
    }
}

// LISTAR COM MENSAGEM
function listar_mensagem(resposta) {
    // variavel para armazenar tipo de mensagem
    var tipo;
    // verificando se foi efetuado o cadastro
    if(resposta.estado != 'erro'){
        tipo = 'sucesso';
    // se não logou
    } else {
        tipo = 'aviso';
    }
    // chamando pagina listar
    chamar_pagina('paginas/listar.html')
    // exibir mensagem
    exibir_mensagem(tipo, resposta.mensagem);
}

// INICIAR APLICATIVO
function iniciar_aplicativo() {
    // variavel para armazenar pagina inicial
    var pagina = 'paginas/login.html';
    // se usuário estiver autenticado
    if (autenticar_usuario())
    {
        // adicionando boas vindas
        boas_vindas();
        // carrega página de listagem
        pagina = 'paginas/listar.html';
    }
    // carregando link do logo
    $('#logo').attr('href',pagina);

    // carregando pagina de login
    chamar_pagina(pagina);
}

// OBTER SESSÃO
function obter_sessao() {
    // criando variavel e obtendo sessão em string json
    var sessao = JSON.stringify(sessionStorage);
    // convertendo string json em objeto json
    sessao = JSON.parse(sessao);
    // convertendo objeto json em parametro url
    sessao = $.param(sessao);
    // retornando dados da sessão
    return sessao;
}

// LOGOUT
function logout() {
    // limpando sessão
    sessionStorage.clear();
    // removendo mensagem de boas vindas
    $('.logout').remove();
    // reiniciando aplicativo
    iniciar_aplicativo();
    // exibindo mensagem de logout
    exibir_mensagem('info', 'Você saiu do aplicativo!');
}