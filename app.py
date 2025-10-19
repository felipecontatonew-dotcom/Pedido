from flask import Flask, render_template, request, redirect, url_for, session
from cryptography.fernet import Fernet
import json
import os # Importamos 'os' para a chave secreta

app = Flask(__name__)

# Configuração essencial para a 'session' do Flask funcionar
# Gera uma chave secreta aleatória para a sessão
app.secret_key = os.urandom(24)

# Função para carregar e descriptografar as credenciais
def load_credentials():
    # Carrega a chave de criptografia
    with open('secret.key', 'rb') as key_file:
        key = key_file.read()
    f = Fernet(key)

    # Lê e descriptografa o arquivo de credenciais
    with open('credentials.enc', 'rb') as encrypted_file:
        encrypted_data = encrypted_file.read()
    
    decrypted_data_bytes = f.decrypt(encrypted_data)
    # Converte os bytes de volta para um dicionário Python
    return json.loads(decrypted_data_bytes.decode('utf-8'))

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
    if request.method == 'POST':
        # Carrega as credenciais corretas
        credentials = load_credentials()
        
        # Pega o que o usuário digitou no formulário
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
    session.pop('logged_in', None) # Remove a marcação de 'logado'
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
