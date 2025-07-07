/*
//BOTON SOBRE NOSOTRAS
const buttonSobreNosotras = document.querySelector('a[href="#sobreNosotras"]')

buttonSobreNosotras.addEventListener('click', goToSobreNosotras)

function goToSobreNosotras(e) {
    e.preventDefault(); // para evita el comportamiento por defecto del link
    document.querySelector('.sobreNosotras').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

//BOTON CENTRO DE AYUDA
const buttonCentroDeAyuda = document.querySelector('a[href="#centroDeAyuda"]')

buttonCentroDeAyuda.addEventListener('click', goToCentroDeAyuda)

function goToCentroDeAyuda(e) {
    e.preventDefault(); 
    document.querySelector('.centroDeAyuda').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

//BOTON CONTACTO
const buttonContacto = document.querySelector('a[href="#contacto"]');

buttonContacto.addEventListener('click', goToContacto);

function goToContacto(e) {
    e.preventDefault(); // para evitar el comportamiento por defecto del link
    document.querySelector('.contacto').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
*/