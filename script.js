
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