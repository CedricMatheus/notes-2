/*******************************************
REQUISIÇÕES AJAX
*******************************************/
// CARREGAR URLS
function carregar_urls(){
    // usando ajax para obter urls
    $.ajax({
        // definindo url
        url: 'urls.json',
        // definindo método
        type: 'GET',
        // definindo tipo de dado a obter
        dataType: 'json',
        // urls obtidas com sucesso
        success: function(resposta) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('as urls carregaran', resposta);
            // atribuindo urls
            URLS = resposta;
        },
        // urls não obtidas
        error: function(erro) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('as urls não carregaram', erro);
        },
        // requisição completada
        complete: function(xhr, status) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('A requisição foi completada!');
        }
    });
}

// CHAMAR PÁGINA
function chamar_pagina(pagina) {
    // usando ajax para obter pagina
    $.ajax({
        // definindo url
        url: pagina,
        // definindo método
        type: 'GET',
        // definindo tipo de dado a obter
        dataType: 'text',
        // pagina obtida com sucesso
        success: function(resposta) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('a pagina carregou', resposta);
            // insere página bloco de conteúdo.
            $('#conteudo').html(resposta);
            // obtem pagina
            pagina = pagina.split('/')[1];
            // verificando se página é listagem.
            if (pagina == 'listar.html') {
                // listando notas
                listar_notas();
            } 
        },
        // pagina não obtida
        error: function(erro) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('a pagina não carregou', erro);
        },
        // requisição completada
        complete: function(xhr, status) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('A requisição foi completada!');
        }
    });
}

// EXIBIR MENSAGEM
function exibir_mensagem(tipo, mensagem) {
    // variavel para armazenar a classe da mensagem
    var classe;
    // verifcando tipo de mensagem
    switch (tipo) {
        // caso seja alerta
        case 'aviso':
            // definindo classe de alerta
            classe = 'alert-warning';
            // encerrando caso
            break;
        // caso seja alerta
        case 'sucesso':
            // definindo classe de sucesso
            classe = 'alert-success';
            // encerrando caso
            break;
        // caso seja informação
        case 'info':
            // definindo classe de informação
            classe = 'alert-info';
            // encerrando caso
            break;
    }
    // usando ajax para obter html da mensagem
    $.ajax({
        // definindo url
        url: 'blocos/mensagem.html',
        // definindo método
        type: 'GET',
        // definindo tipo de dado a obter
        dataType: 'text',
        // mensagem obtida com sucesso
        success: function(resposta) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('mensagem carregada', resposta);
            // inserindo classe
            resposta = resposta.replace('#CLASSE#', classe);
            // inserindo mensagem
            resposta = resposta.replace('#MENSAGEM#', mensagem);
            // exibindo mensagem
            $('#conteudo').prepend(resposta);
        },
        // mensagem não obtida
        error: function(erro) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('mensagem não carregada', erro);
        },
        // requisição completada
        complete: function(xhr, status) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('A requisição foi completada!');
        }
    });
}

// ENVIAR FORMULÁRIO
function enviar_formulario(formulario, urls) {
    // verifica se usuario está autenticado
    if (autenticar_usuario()) {
        // atribui username ao formulário
        $('#username').val(sessionStorage.username);
        // atribui password ao formulário
        $('#password').val(sessionStorage.password);
    }
    // nome do formulario
    var nome = formulario.attr('name');
    // obtendo url destino
    var destino = urls[nome];
    // usando ajax para enviar formulário
    $.ajax({
        // definindo url
        url: destino,
        // definindo método
        type: 'POST',
        // definindo dados a enviar
        data: formulario.serialize(),
        // definindo tipo de dado a obter
        dataType: 'json',
        // formulário enviado com sucesso
        success: function(resposta) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('formulário enviado', resposta);
            // redirecionando evento para ação
            switch (nome) {
                // caso seja login
                case 'login':
                    // efetua login
                    efetuar_login(resposta);
                    // encerrando caso
                    break;
                // caso seja cadastrar
                case 'cadastrar':
                    // efetua cadastro
                    efetuar_cadastro(resposta);
                    // encerrando caso
                    break;
                // outros casos
                default:
                    // efetua envio
                    listar_mensagem(resposta);
            }
        },
        // formulário não enviado
        error: function(erro) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('formulário não enviado', erro);
        },
        // requisição completada
        complete: function(xhr, status) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('A requisição foi completada!');
        }
    });
}

// BOAS VINDAS
function boas_vindas() {
    // usando ajax para obter html de boas vindas
    $.ajax({
        // definindo url
        url: 'blocos/boas_vindas.html',
        // definindo método
        type: 'GET',
        // definindo tipo de dado a obter
        dataType: 'text',
        // boas vindas obtida com sucesso
        success: function(resposta) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('mensagem carregada', resposta);
            // inserindo nome
            resposta = resposta.replace('#NOME#', sessionStorage.nome);
            // exibindo boas vindas
            $('#cabecalho').append(resposta);
        },
        // mensagem não obtida
        error: function(erro) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('mensagem não carregada', erro);
        },
        // requisição completada
        complete: function(xhr, status) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('A requisição foi completada!');
        }
    });
}

// LISTAR NOTAS
function listar_notas() {
    // dados da sessão
    var sessao = obter_sessao();
    // obtendo url destino
    var destino = URLS['listar'];
    // usando ajax para obter notas do usuário
    $.ajax({
        // definindo url
        url: destino,
        // definindo método
        type: 'POST',
        // definindo dados a enviar
        data: sessao,
        // definindo tipo de dado a obter
        dataType: 'json',
        // notas obtidas com sucesso
        success: function(resposta) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('notas obtidas', resposta);
            // verificando se estado é de sucesso
            if (resposta.estado == 'sucesso') {
                // usando ajax para obter html nota
                $.ajax({
                    // definindo url
                    url: 'blocos/nota.html',
                    // definindo método
                    type: 'GET',
                    // definindo tipo de dado a obter
                    dataType: 'text',
                    // nota obtida com sucesso
                    success: function(html) {
                        // APAGAR: exibe mensagem de aviso no console
                        console.log('nota carregada', html);
                        // convertendo mensagem em json
                        notas = $.parseJSON(resposta.mensagem);
                        // percorrendo array de notas
                        $.each(notas, function (chave, valor){
                            // copiando html
                            nota = html;
                            // tratando data
                            data = new Date(Date.parse(valor.fields.data))
                                .toLocaleDateString();
                            // inserindo id
                            nota = nota.replace('#ID#', valor.pk);
                            // inserindo titulo
                            nota = nota.replace('#TITULO#', valor.fields.titulo);
                            // inserindo data
                            nota = nota.replace('#DATA#', data);
                            // exibindo boas vindas
                            $('#notas').append(nota);
                        });
                    },
                    // nota não obtida
                    error: function(erro) {
                        // APAGAR: exibe mensagem de aviso no console
                        console.log('nota não carregada', erro);
                    },
                    // requisição completada
                    complete: function(xhr, status) {
                        // APAGAR: exibe mensagem de aviso no console
                        console.log('A requisição foi completada!');
                    }
                });
            // verificando
            } else if (resposta.estado == 'vazia'){
                // exibe mensagem
                exibir_mensagem('info', resposta.mensagem);
            }
        },
        // notas não obtidas
        error: function(erro) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('notas não obtidas', erro);
        },
        // requisição completada
        complete: function(xhr, status) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('A requisição foi completada!');
        }
    });
}

// DELETAR
function deletar(id) {
    // mensagem de exclusão
    var mensagem = 'Você está prestes a excluir uma nota.\n';
    mensagem += 'Essa ação não poderá ser desfeita.\n';
    mensagem += 'Deseja continuar?'
    // confirmando exclusão
    var excluir = confirm(mensagem)
    if (excluir) {
        // montando dados do post
        var dados = obter_sessao() + '&id_nota=' + id;
        // usando ajax para deletar nota
        $.ajax({
            // definindo url
            url: URLS['deletar'],
            // definindo método
            type: 'POST',
            // definindo dados a enviar
            data: dados,
            // definindo tipo de dado a obter
            dataType: 'json',
            // exclusão efetuada com sucesso
            success: function(resposta) {
                // APAGAR: exibe mensagem de aviso no console
                console.log('exclusão efetuada', resposta);
                // atualiza lista
                listar_mensagem(resposta);
            },
            // exclusão não efetuada
            error: function(erro) {
                // APAGAR: exibe mensagem de aviso no console
                console.log('exclusão não efetuada', erro);
            },
            // requisição completada
            complete: function(xhr, status) {
                // APAGAR: exibe mensagem de aviso no console
                console.log('A requisição foi completada!');
            }
        });
    }
}

// EDITAR NOTA
function editar(id) {
    // montando dados do post
    var dados = obter_sessao() + '&id_nota=' + id;
    // usando ajax para obter nota
    $.ajax({
        // definindo url
        url: URLS['carregar'],
        // definindo método
        type: 'POST',
        // definindo dados a enviar
        data: dados,
        // definindo tipo de dado a obter
        dataType: 'json',
        // nota obtida com sucesso
        success: function(resposta) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('nota obtida com sucesso', resposta);
            // verificando se o estado é sucesso
            if (resposta.estado == 'sucesso'){
                // usando ajax para carregar pagina editar
                $.ajax({
                    // definindo url
                    url: 'paginas/editar.html',
                    // definindo método
                    type: 'GET',
                    // definindo tipo de dado a obter
                    dataType: 'text',
                    // pagina obtida com sucesso
                    success: function(html) {
                        // APAGAR: exibe mensagem de aviso no console
                        console.log('pagina editar carregada', html);
                        // convertendo mensagem em json
                        nota = $.parseJSON(resposta.mensagem)[0];
                        // carregnado página
                        $('#conteudo').html(html);
                        // adicionando id_nota
                        $('#id_nota').val(nota.pk)
                        // adicionando título
                        $('#titulo').val(nota.fields.titulo)
                        // adicionando corpo
                        $('#nota').val(nota.fields.nota)
                    },
                    // pagina não obtida
                    error: function(erro) {
                        // APAGAR: exibe mensagem de aviso no console
                        console.log('pagina editar não carregada', erro);
                    },
                    // requisição completada
                    complete: function(xhr, status) {
                        // APAGAR: exibe mensagem de aviso no console
                        console.log('A requisição foi completada!');
                    }
                });
            } else {
                exibir_mensagem('aviso', resposta.mensagem);
            }
        },
        // nota não obtida
        error: function(erro) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('nota não obtida', erro);
        },
        // requisição completada
        complete: function(xhr, status) {
            // APAGAR: exibe mensagem de aviso no console
            console.log('A requisição foi completada!');
        }
    });
}