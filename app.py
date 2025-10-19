from flask import Flask, render_template, request, redirect, url_for, session
from cryptography.fernet import Fernet
import json
import os

app = Flask(__name__)

# Chave secreta para a sessão do Flask funcionar
app.secret_key = os.urandom(24)

# Função para carregar e descriptografar as credenciais
def load_credentials():
    try:
        with open('secret.key', 'rb') as key_file:
            key = key_file.read()
        f = Fernet(key)

        with open('credentials.enc', 'rb') as encrypted_file:
            encrypted_data = encrypted_file.read()
        
        decrypted_data_bytes = f.decrypt(encrypted_data)
        return json.loads(decrypted_data_bytes.decode('utf-8'))
    except FileNotFoundError:
        # Se os arquivos de credenciais não existirem, retorna None
        return None

@app.route('/')
def home():
    # Se o usuário não estiver logado, redireciona para a página de login
    if 'logged_in' not in session:
        return redirect(url_for('login'))
    # Se estiver logado, mostra a página principal do pedido
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    credentials = load_credentials()

    # Se os arquivos de credenciais não foram criados, exibe um erro
    if not credentials:
        error = 'Erro de configuração: arquivos de credenciais não encontrados.'
        return render_template('login.html', error=error)

    if request.method == 'POST':
        user_email = request.form['email']
        user_password = request.form['password']

        # Verifica se o email e a senha estão corretos
        if user_email == credentials['email'] and user_password == credentials['password']:
            session['logged_in'] = True # Marca o usuário como logado
            return redirect(url_for('home'))
        else:
            error = 'Credenciais inválidas. Tente novamente.'
            
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
