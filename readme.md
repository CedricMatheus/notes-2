# NOTES

Aplicativo para cadastro e controle de notas.

Cada usuário possui a sua própria conta e pode cadastrar suas notas pessoais,
que são visíveis apenas para o próprio usuário.

## BACK-END

**Linguagem:** Python 3.x

**Framework:** Django

**Banco de dados:** SQLite3

API back-end exclusiva para requisições HTTP.

### DEPENDÊNCIAS

1. Python 3.x

2. Django

### EXECUTANDO

1. Rode o script _iniciar.py_ que se encontra dentro da pasta _back_.

## FRONT-END

**Linguagens:** JavaScript, HTML e CSS.

**SPA (Single Page Application):** Toda a pagina é montada utilizando
JavaScript. Requisições são feitas com AJAX.

Front independente que se comunica com a API através de requisições HTTP.

### CONFIGURANDO

Caso esteja rodando o back-end e o front em maquinas independentes, e necessite
reconfigurar as URLS das requisições, basta alterá-las no arquivo _urls.json_,
que se encontra dentro da pasta _front_.

### EXECUTANDO

1. Certifique-se de ter executado o servidor.

2. Abra o arquivo _index.html_ que se encontra dentro da pasta _front_.