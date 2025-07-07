
//BOTONES

//BOTON ENCONTRA TU PRESTADOR
const buttonEncontraTuPrestador = document.querySelector('.boton button')

buttonEncontraTuPrestador.addEventListener('click', goToPrestadores)

function goToPrestadores() {
    document.querySelector('.prestadores').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// función genérica para scroll suave
function setupScrollButton(selector) {
    const button = document.querySelector(`a[href="${selector}"]`);
    if (!button) return;

    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetClass = selector.replace('#', '.');
        const target = document.querySelector(targetClass);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// configuración de los botones
setupScrollButton('#sobreNosotras');
setupScrollButton('#centroDeAyuda');
setupScrollButton('#contacto');
