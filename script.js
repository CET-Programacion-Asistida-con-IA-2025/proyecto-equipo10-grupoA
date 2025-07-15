
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



//FUNCION DE LOS FILTROS
// Función para aplicar filtros
        function applyFilters() {
            // Obtener todos los checkboxes seleccionados
            const selectedFilters = {
                especialidad: [],
                localidad: [],
                modalidad: [],
                horario: []
            };

            // Recopilar filtros seleccionados
            document.querySelectorAll('#especialidad input[type="checkbox"]:checked').forEach(checkbox => {
                selectedFilters.especialidad.push(checkbox.value);
            });

            document.querySelectorAll('#localidad input[type="checkbox"]:checked').forEach(checkbox => {
                selectedFilters.localidad.push(checkbox.value);
            });

            document.querySelectorAll('#modalidad input[type="checkbox"]:checked').forEach(checkbox => {
                selectedFilters.modalidad.push(checkbox.value);
            });

            document.querySelectorAll('#horarios input[type="checkbox"]:checked').forEach(checkbox => {
                selectedFilters.horario.push(checkbox.value);
            });

            // Obtener todos los especialistas
            const especialistas = document.querySelectorAll('.especialista');
            let visibleCount = 0;

            especialistas.forEach(especialista => {
                const especialidad = especialista.dataset.especialidad;
                const localidad = especialista.dataset.localidad;
                const modalidad = especialista.dataset.modalidad;
                const horario = especialista.dataset.horario;

                // Verificar si el especialista cumple con todos los filtros
                let shouldShow = true;

                // Si hay filtros de especialidad seleccionados, verificar coincidencia
                if (selectedFilters.especialidad.length > 0) {
                    shouldShow = shouldShow && selectedFilters.especialidad.includes(especialidad);
                }

                // Si hay filtros de localidad seleccionados, verificar coincidencia
                if (selectedFilters.localidad.length > 0) {
                    shouldShow = shouldShow && selectedFilters.localidad.includes(localidad);
                }

                // Si hay filtros de modalidad seleccionados, verificar coincidencia
                if (selectedFilters.modalidad.length > 0) {
                    shouldShow = shouldShow && selectedFilters.modalidad.includes(modalidad);
                }

                // Si hay filtros de horario seleccionados, verificar coincidencia
                if (selectedFilters.horario.length > 0) {
                    shouldShow = shouldShow && selectedFilters.horario.includes(horario);
                }

                // Mostrar u ocultar el especialista
                if (shouldShow) {
                    especialista.style.display = 'flex';
                    visibleCount++;
                } else {
                    especialista.style.display = 'none';
                }
            });

            // Mostrar mensaje si no hay resultados
            const noResults = document.getElementById('noResults');
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }

        // Función para limpiar filtros
        function resetFilters() {
            // Desmarcar todos los checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });

            // Mostrar todos los especialistas
            document.querySelectorAll('.especialista').forEach(especialista => {
                especialista.style.display = 'flex';
            });

            // Ocultar mensaje de no resultados
            document.getElementById('noResults').style.display = 'none';
        }

        // Agregar event listeners a todos los checkboxes
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', applyFilters);
            });
        });

// CENTRO DE AYUDA
// Obtener elementos del DOM
const tarjetaExpandida = document.getElementById('tarjetaExpandida');
const contenidoTarjeta = document.getElementById('contenidoTarjeta');
const cerrarTarjeta = document.getElementById('cerrarTarjeta');
const overlay = document.getElementById('overlay');
const opcionCards = document.querySelectorAll('.opcion-card');

// Función para mostrar contenido en la tarjeta expandida
function mostrarContenido(tipoContenido) {
    const contenido = document.getElementById(tipoContenido);
    if (contenido) {
        // Copiar el contenido HTML
        contenidoTarjeta.innerHTML = contenido.innerHTML;
        
        // Mostrar overlay y tarjeta expandida
        overlay.classList.add('visible');
        tarjetaExpandida.classList.add('visible');
        
        // Bloquear scroll del body
        document.body.style.overflow = 'hidden';
    }
}

// Función para cerrar la tarjeta expandida
function cerrarTarjetaExpandida() {
    overlay.classList.remove('visible');
    tarjetaExpandida.classList.remove('visible');
    document.body.style.overflow = 'auto';
}

// Agregar event listeners a cada tarjeta
opcionCards.forEach(card => {
    card.addEventListener('click', function() {
        const tipoContenido = this.getAttribute('data-contenido');
        mostrarContenido(tipoContenido);
    });
});

// Event listener para cerrar la tarjeta
cerrarTarjeta.addEventListener('click', cerrarTarjetaExpandida);

// Cerrar al hacer clic en el overlay
overlay.addEventListener('click', cerrarTarjetaExpandida);

// Cerrar con la tecla Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && tarjetaExpandida.classList.contains('visible')) {
        cerrarTarjetaExpandida();
    }
});

// Funcionalidad del buscador (opcional)
const buscador = document.querySelector('.buscador');
buscador.addEventListener('input', function() {
    const texto = this.value.toLowerCase();
    // Aquí puedes agregar lógica de búsqueda si lo necesitas
    console.log('Buscando:', texto);
});

// Asegurar que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    console.log('Centro de Ayuda cargado correctamente');
});



//FOOTER
// Funcionalidad del botón de envío
const submitButton = document.querySelector('.fs-button');
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animación de click
    submitButton.style.transform = 'translateY(2px)';
    submitButton.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    
    setTimeout(() => {
        submitButton.style.transform = '';
        submitButton.style.boxShadow = '';
        
        // Aquí puedes agregar la lógica para enviar el formulario
        alert('Mensaje enviado correctamente!');
        
        // Opcional: limpiar el formulario
        form.reset();
    }, 150);
});

// Opcional: Validación adicional
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        alert('Por favor, complete todos los campos obligatorios.');
        return false;
    }
    
    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un email válido.');
        return false;
    }
    
    return true;
}

// Mejorar la funcionalidad del envío con validación
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Animación de click
        submitButton.style.transform = 'translateY(2px)';
        submitButton.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        
        setTimeout(() => {
            submitButton.style.transform = '';
            submitButton.style.boxShadow = '';
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando fetch para enviar a tu backend
            alert('Mensaje enviado correctamente!');
            
            // Opcional: limpiar el formulario
            form.reset();
        }, 150);
    }
});

//animacion carousel
class Carousel {
            constructor() {
                this.cards = document.querySelectorAll('.card');
                this.indicators = document.querySelectorAll('.indicator');
                this.currentIndex = 0;
                this.totalCards = this.cards.length;
                
                this.init();
            }

            init() {
                document.getElementById('prevBtn').addEventListener('click', () => this.prev());
                document.getElementById('nextBtn').addEventListener('click', () => this.next());
                
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.goToSlide(index));
                });

                // Auto-advance every 5 seconds
                setInterval(() => this.next(), 5000);
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prev();
                    if (e.key === 'ArrowRight') this.next();
                });
            }

            updateCards() {
                this.cards.forEach((card, index) => {
                    card.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2');
                    
                    const position = this.getCardPosition(index);
                    if (position !== null) {
                        card.classList.add(position);
                    }
                });

                this.updateIndicators();
            }

            getCardPosition(cardIndex) {
                const diff = (cardIndex - this.currentIndex + this.totalCards) % this.totalCards;
                
                switch(diff) {
                    case 0: return 'active';
                    case 1: return 'next-1';
                    case 2: return 'next-2';
                    case 3: return 'prev-2';
                    case 4: return 'prev-1';
                    default: return null;
                }
            }

            updateIndicators() {
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentIndex);
                });
            }

            getPrevIndex() {
                return this.currentIndex === 0 ? this.totalCards - 1 : this.currentIndex - 1;
            }

            getNextIndex() {
                return this.currentIndex === this.totalCards - 1 ? 0 : this.currentIndex + 1;
            }

            prev() {
                this.currentIndex = this.getPrevIndex();
                this.updateCards();
            }

            next() {
                this.currentIndex = this.getNextIndex();
                this.updateCards();
            }

            goToSlide(index) {
                this.currentIndex = index;
                this.updateCards();
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new Carousel();
        });
