from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # Mensagem personalizada que aparece no Card 2
    dados_namorado = {
        "nome": "Gabriel", 
        "mensagem_principal": "Lilo disse: 'Ohana significa família. Família significa que ninguém é deixado para trás ou esquecido'. Eu não quero te deixar mais, Experimente ser minha Ohana!",
    }
    return render_template('index.html', dados=dados_namorado)

if __name__ == '__main__':
    app.run(debug=True)
