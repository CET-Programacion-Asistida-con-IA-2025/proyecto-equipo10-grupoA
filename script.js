
//BOTON ENCONTRA TU PRESTADOR
const buttonEncontraTuPrestador = document.querySelector('.boton button')

buttonEncontraTuPrestador.addEventListener('click', goToSection)

function goToSection() {
    document.querySelector('.prestadores').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

