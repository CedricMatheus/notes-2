
# importando os
import os
# importando os.path
import os.path
# verificando se não existe banco de dados
if not os.path.exists('notes/db.sqlite3'):
    # verificando se existe arquivo de configuração
    if not os.path.exists('notes/notas/migrations/0001_initial.py'):
        # criando arquivo de configuração
        os.system('python notes/manage.py makemigrations')
    # criando banco de dados
    os.system('python notes/manage.py migrate')
# inicializando django
os.system('python notes/manage.py runserver')