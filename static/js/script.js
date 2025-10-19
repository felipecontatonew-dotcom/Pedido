document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const restartButton = document.querySelector('.restart-btn');
    const submitCodeButton = document.getElementById('submit-code');
    const passToNextButton = document.getElementById('pass-to-next');

    // NOVOS ELEMENTOS
    const acceptBtn = document.getElementById('accept-btn');
    const backgroundMusic = document.getElementById('background-music');
    const finalImages = document.querySelectorAll('.final-gallery img');
    
    let currentCardIndex = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            if (i === index) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // LÓGICA DO BOTÃO ACEITO (NOVA)
    acceptBtn.addEventListener('click', () => {
        currentCardIndex++;
        showCard(currentCardIndex); // Mostra o Card 6

        // Toca a música
        backgroundMusic.play().catch(error => {
            console.log("O navegador bloqueou o autoplay. A interação do usuário é necessária.");
        });

        // Inicia a sequência de fade das imagens
        // A primeira imagem (pedido) aparece depois de 1 segundo
        setTimeout(() => {
            finalImages[0].classList.add('visible');
        }, 1000);

        // A segunda imagem (beijo) substitui a primeira depois de 5 segundos
        setTimeout(() => {
            finalImages[0].classList.remove('visible'); // Esconde a primeira
            finalImages[1].classList.add('visible');   // Mostra a segunda
        }, 5000);

        
    // Imagem 3 (nos) aparece depois de 9 segundos
        setTimeout(() => {
            finalImages[1].classList.remove('visible'); // Esconde a imagem 2
            finalImages[2].classList.add('visible');   // Mostra a imagem 3
        }, 9000);

        // Imagem 4 (nos_copia) aparece depois de 13 segundos
        setTimeout(() => {
            finalImages[2].classList.remove('visible'); // Esconde a imagem 3
            finalImages[3].classList.add('visible');   // Mostra a imagem 4
        }, 13000);
    });

        


    // (O resto do seu código JS continua aqui sem alterações...)
    // ... nextButtons.forEach, prevButtons.forEach, etc.

    // Navegação para o PRÓXIMO card
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (cards[currentCardIndex].id === 'card-3' && button.id !== 'pass-to-next') {
                return;
            }
            if (currentCardIndex < cards.length - 1) {
                currentCardIndex++;
                showCard(currentCardIndex);
            }
        });
    });

    // Navegação para o card ANTERIOR
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentCardIndex > 0) {
                currentCardIndex--;
                showCard(currentCardIndex);
            }
        });
    });

    // Lógica do DESAFIO DE SENHA
    submitCodeButton.addEventListener('click', () => {
        const accessCodeInput = document.getElementById('access-code');
        const feedback = document.getElementById('code-feedback');
        const correctAnswer = 'ohana'; 

        if (accessCodeInput.value.trim().toLowerCase() === correctAnswer) {
            feedback.textContent = 'ACESSO CONCEDIDO. BEM-VINDO DE VOLTA.';
            feedback.className = 'feedback-message success';
            submitCodeButton.style.display = 'none'; 
            passToNextButton.style.display = 'inline-block'; 
        } else {
            feedback.textContent = 'SENHA INCORRETA. PROTOCOLO HERMÍNIA AINDA ATIVO.';
            feedback.className = 'feedback-message error';
            accessCodeInput.focus();
        }
    });

    // Reiniciar a "simulação"
    restartButton.addEventListener('click', () => {
        // Para a música e reseta
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;

        // Esconde as imagens finais
        finalImages.forEach(img => img.classList.remove('visible'));

        currentCardIndex = 0;
        showCard(currentCardIndex);
        
        const accessCodeInput = document.getElementById('access-code');
        const feedback = document.getElementById('code-feedback');
        accessCodeInput.value = '';
        feedback.textContent = '';
        feedback.className = 'feedback-message';
        submitCodeButton.style.display = 'inline-block';
        passToNextButton.style.display = 'none';
    });

    // Inicia mostrando o primeiro card
    showCard(currentCardIndex);
});