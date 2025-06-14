// NEURORED - JavaScript para funcionalidad interactiva
// Sistema completo para plataforma de apoyo neurodivergente

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURACIÓN INICIAL =====
    const config = {
        animationDuration: 300,
        searchDelay: 500,
        chatResponseDelay: 1000
    };

    // ===== BASE DE DATOS SIMULADA DE PROFESIONALES =====
    const profesionales = [
        {
            id: 1,
            nombre: "Dra. María González",
            matricula: "MP 12345",
            especialidad: ["psicologo"],
            modalidad: "ambas",
            tipoSesion: ["individual", "familiar"],
            comunicacion: ["lenguaje-claro", "apoyos-visuales"],
            zona: "caba-centro",
            horarios: ["mañana", "tarde"],
            valoracion: 4.8,
            opiniones: 23,
            telefono: "11-1234-5678",
            email: "mgonzalez@email.com",
            descripcion: "Psicóloga especializada en TEA y TDAH",
            estilo: "Terapia cognitivo-conductual con enfoque sensorial. Uso de apoyos visuales y comunicación clara."
        },
        {
            id: 2,
            nombre: "Dr. Carlos Mendez",
            matricula: "MN 67890",
            especialidad: ["terapista-ocupacional"],
            modalidad: "presencial",
            tipoSesion: ["individual", "grupal"],
            comunicacion: ["pictogramas", "lenguaje-claro"],
            zona: "zona-norte",
            horarios: ["mañana", "tarde"],
            valoracion: 4.9,
            opiniones: 31,
            telefono: "11-9876-5432",
            email: "cmendez@email.com",
            descripcion: "Terapista Ocupacional en integración sensorial",
            estilo: "Terapia lúdica con herramientas sensoriales. Comunicación mediante pictogramas y rutinas estructuradas."
        },
        {
            id: 3,
            nombre: "Lic. Ana Rodríguez",
            matricula: "MP 11223",
            especialidad: ["fonoaudiologo"],
            modalidad: "ambas",
            tipoSesion: ["individual"],
            comunicacion: ["lenguaje-claro", "comunicacion-escrita"],
            zona: "caba-sur",
            horarios: ["tarde", "noche"],
            valoracion: 4.7,
            opiniones: 18,
            telefono: "11-5555-4444",
            email: "arodriguez@email.com",
            descripcion: "Fonoaudióloga especializada en dislexia y TEL",
            estilo: "Método multisensorial con apoyo tecnológico. Sesiones adaptadas al ritmo individual."
        },
        // Profesionales adicionales para mejor demostración
        {
            id: 4,
            nombre: "Dr. Roberto Silva",
            matricula: "MN 33445",
            especialidad: ["psiquiatra"],
            modalidad: "presencial",
            tipoSesion: ["individual"],
            comunicacion: ["lenguaje-claro"],
            zona: "zona-oeste",
            horarios: ["mañana"],
            valoracion: 4.6,
            opiniones: 42,
            telefono: "11-7777-8888",
            email: "rsilva@email.com",
            descripcion: "Psiquiatra especializado en TDAH adulto",
            estilo: "Enfoque integral con seguimiento farmacológico personalizado."
        },
        {
            id: 5,
            nombre: "Lic. Carmen López",
            matricula: "MP 55667",
            especialidad: ["neurologo"],
            modalidad: "virtual",
            tipoSesion: ["individual", "familiar"],
            comunicacion: ["apoyos-visuales", "comunicacion-escrita"],
            zona: "zona-sur",
            horarios: ["tarde", "noche"],
            valoracion: 4.5,
            opiniones: 15,
            telefono: "11-3333-2222",
            email: "clopez@email.com",
            descripcion: "Neuróloga especializada en evaluación neurocognitiva",
            estilo: "Evaluaciones comprehensivas con informes detallados y seguimiento."
        }
    ];

    // ===== SISTEMA DE NAVEGACIÓN SUAVE =====
    function initSmoothNavigation() {
        const navLinks = document.querySelectorAll('nav a[href^="#"], a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Navegación suave con offset para navegación fija
                        const navHeight = document.querySelector('nav').offsetHeight;
                        const targetPosition = targetElement.offsetTop - navHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Actualizar URL sin recargar página
                        history.pushState(null, null, href);
                        
                        // Anunciar cambio para lectores de pantalla
                        announceNavigation(targetElement.querySelector('h1, h2').textContent);
                    }
                }
            });
        });
    }

    // ===== SISTEMA DE FILTRADO DINÁMICO =====
    function initSearchFilters() {
        const form = document.querySelector('#buscador form');
        const resultContainer = document.querySelector('#buscador .profesional-results') || createResultContainer();
        
        if (form) {
            // Crear contenedor de resultados si no existe
            if (!document.querySelector('.profesional-results')) {
                const existingResults = document.querySelector('#buscador h2:last-of-type');
                if (existingResults) {
                    existingResults.insertAdjacentElement('afterend', resultContainer);
                }
            }
            
            // Evento de búsqueda
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                performSearch();
            });
            
            // Búsqueda en tiempo real al cambiar filtros
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('change', debounce(performSearch, config.searchDelay));
            });
        }
    }

    function createResultContainer() {
        const container = document.createElement('div');
        container.className = 'profesional-results';
        container.innerHTML = '<div class="loading">🔍 Buscando profesionales...</div>';
        return container;
    }

    function performSearch() {
        const form = document.querySelector('#buscador form');
        const resultContainer = document.querySelector('.profesional-results');
        
        if (!form || !resultContainer) return;
        
        // Mostrar loading
        resultContainer.innerHTML = '<div class="loading">🔍 Buscando profesionales...</div>';
        
        setTimeout(() => {
            const filters = getFormFilters(form);
            const filteredProfessionals = filterProfessionals(filters);
            displayResults(filteredProfessionals, resultContainer);
            
            // Anunciar resultados para accesibilidad
            const resultCount = filteredProfessionals.length;
            announceSearchResults(resultCount);
        }, 800);
    }

    function getFormFilters(form) {
        const formData = new FormData(form);
        const filters = {};
        
        // Especialidades (checkboxes múltiples)
        filters.especialidad = [];
        form.querySelectorAll('input[name="especialidad"]:checked').forEach(input => {
            filters.especialidad.push(input.value);
        });
        
        // Modalidad (radio)
        const modalidad = formData.get('modalidad');
        if (modalidad) filters.modalidad = modalidad;
        
        // Tipo de sesión (checkboxes múltiples)
        filters.tipoSesion = [];
        form.querySelectorAll('input[name="tipo-sesion"]:checked').forEach(input => {
            filters.tipoSesion.push(input.value);
        });
        
        // Comunicación (checkboxes múltiples)
        filters.comunicacion = [];
        form.querySelectorAll('input[name="comunicacion"]:checked').forEach(input => {
            filters.comunicacion.push(input.value);
        });
        
        // Zona
        const zona = formData.get('zona');
        if (zona) filters.zona = zona;
        
        // Horarios (checkboxes múltiples)
        filters.horarios = [];
        form.querySelectorAll('input[name="horarios"]:checked').forEach(input => {
            filters.horarios.push(input.value);
        });
        
        return filters;
    }

    function filterProfessionals(filters) {
        return profesionales.filter(prof => {
            // Filtro por especialidad
            if (filters.especialidad.length > 0) {
                const hasSpecialty = filters.especialidad.some(esp => 
                    prof.especialidad.includes(esp)
                );
                if (!hasSpecialty) return false;
            }
            
            // Filtro por modalidad
            if (filters.modalidad) {
                if (filters.modalidad !== 'ambas' && prof.modalidad !== 'ambas') {
                    if (prof.modalidad !== filters.modalidad) return false;
                }
            }
            
            // Filtro por tipo de sesión
            if (filters.tipoSesion.length > 0) {
                const hasSessionType = filters.tipoSesion.some(tipo => 
                    prof.tipoSesion.includes(tipo)
                );
                if (!hasSessionType) return false;
            }
            
            // Filtro por comunicación
            if (filters.comunicacion.length > 0) {
                const hasCommunication = filters.comunicacion.some(com => 
                    prof.comunicacion.includes(com)
                );
                if (!hasCommunication) return false;
            }
            
            // Filtro por zona
            if (filters.zona && prof.zona !== filters.zona) {
                return false;
            }
            
            // Filtro por horarios
            if (filters.horarios.length > 0) {
                const hasSchedule = filters.horarios.some(horario => 
                    prof.horarios.includes(horario)
                );
                if (!hasSchedule) return false;
            }
            
            return true;
        });
    }

    function displayResults(professionals, container) {
        if (professionals.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>😔 No se encontraron profesionales</h3>
                    <p>Probá ajustando los filtros o <a href="#ayuda">contacta con nuestro equipo</a> para ayuda personalizada.</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = professionals.map(prof => createProfessionalCard(prof)).join('');
        container.innerHTML = `
            <div class="results-header">
                <h3>✅ Se encontraron ${professionals.length} profesionales</h3>
                <p>Hacé clic en "ME INTERESA" para ver el perfil completo</p>
            </div>
            ${resultsHTML}
        `;
        
        // Agregar eventos a los botones de los profesionales
        container.querySelectorAll('.professional-card button').forEach(button => {
            button.addEventListener('click', function() {
                const profId = this.dataset.profId;
                showProfessionalProfile(profId);
            });
        });
    }

    function createProfessionalCard(prof) {
        const modalidadText = {
            'presencial': 'Presencial únicamente',
            'virtual': 'Virtual únicamente',
            'ambas': 'Presencial y virtual'
        };
        
        return `
            <div class="professional-card">
                <h3>${prof.nombre}</h3>
                <p><strong>📋 Matrícula:</strong> ${prof.matricula}</p>
                <p><strong>🏥 Especialidad:</strong> ${prof.descripcion}</p>
                <p><strong>💼 Estilo de trabajo:</strong> ${prof.estilo}</p>
                <p><strong>📍 Modalidad:</strong> ${modalidadText[prof.modalidad]}</p>
                <p><strong>📞 Contacto:</strong> Tel: ${prof.telefono} | Email: ${prof.email}</p>
                <p><strong>⭐ Valoración:</strong> ${prof.valoracion}/5 (${prof.opiniones} opiniones)</p>
                <button data-prof-id="${prof.id}">👀 ME INTERESA - Ver perfil completo</button>
            </div>
        `;
    }

    // ===== SISTEMA DE PERFILES PROFESIONALES =====
    function showProfessionalProfile(profId) {
        const professional = profesionales.find(p => p.id == profId);
        if (!professional) return;
        
        // Scroll suave al perfil existente o crear uno dinámico
        const existingProfile = document.getElementById('perfil-maria');
        if (existingProfile) {
            updateProfileContent(existingProfile, professional);
            scrollToElement(existingProfile);
        }
    }

    function updateProfileContent(profileElement, professional) {
        const title = profileElement.querySelector('h1');
        if (title) {
            title.textContent = `👨‍⚕️ Perfil Profesional - ${professional.nombre}`;
        }
        
        // Actualizar información de contacto
        const contactInfo = profileElement.querySelector('p:last-of-type');
        if (contactInfo) {
            contactInfo.innerHTML = `
                <strong>📞 Contacto directo:</strong><br>
                Tel: ${professional.telefono} | Email: ${professional.email}<br>
                Horarios de consulta: Lunes a viernes 9-18hs
            `;
        }
    }

    // ===== SISTEMA DE CONSULTA DE TRÁMITES =====
    function initTramiteSystem() {
        const tramiteForm = document.querySelector('#tramite form');
        if (tramiteForm) {
            tramiteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const numeroTramite = document.getElementById('numero-tramite').value;
                consultarEstadoTramite(numeroTramite);
            });
        }
    }

    function consultarEstadoTramite(numero) {
        if (!numero) {
            showNotification('⚠️ Por favor, ingresá un número de trámite', 'warning');
            return;
        }
        
        // Simular consulta
        showNotification('🔍 Consultando estado...', 'info');
        
        setTimeout(() => {
            const estados = [
                { estado: 'Documentación recibida', fecha: '10/06/2024', descripcion: 'Recibimos tu documentación y está siendo revisada.' },
                { estado: 'En gestión con obra social', fecha: '12/06/2024', descripcion: 'Enviamos la solicitud a tu obra social.' },
                { estado: 'Autorización aprobada', fecha: '15/06/2024', descripcion: '¡Excelente! Tu obra social autorizó el tratamiento.' }
            ];
            
            mostrarEstadoTramite(numero, estados);
        }, 1500);
    }

    function mostrarEstadoTramite(numero, estados) {
        const modal = createModal('Estado del Trámite');
        const content = `
            <div class="tramite-status">
                <h3>📋 Trámite: ${numero}</h3>
                <div class="status-timeline">
                    ${estados.map((estado, index) => `
                        <div class="status-item ${index === estados.length - 1 ? 'current' : 'completed'}">
                            <div class="status-icon">${index === estados.length - 1 ? '🔄' : '✅'}</div>
                            <div class="status-content">
                                <h4>${estado.estado}</h4>
                                <p class="status-date">${estado.fecha}</p>
                                <p>${estado.descripcion}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <p class="next-steps">
                    <strong>📱 Próximos pasos:</strong><br>
                    Te contactaremos por WhatsApp en las próximas 48hs para coordinar tu primera cita.
                </p>
            </div>
        `;
        
        modal.querySelector('.modal-body').innerHTML = content;
        document.body.appendChild(modal);
    }

    // ===== SISTEMA DE CHAT DE AYUDA =====
    function initChatSystem() {
        createChatWidget();
    }

    function createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-toggle" title="Abrir chat de ayuda">
                💬
            </div>
            <div class="chat-window hidden">
                <div class="chat-header">
                    <h4>🤖 Asistente NEURORED</h4>
                    <button class="chat-close">✕</button>
                </div>
                <div class="chat-messages">
                    <div class="message bot-message">
                        ¡Hola! 👋 Soy el asistente de NEURORED. ¿En qué puedo ayudarte?
                        <br><br>
                        Podés preguntarme sobre:
                        <ul>
                            <li>🔍 Cómo buscar profesionales</li>
                            <li>📋 Trámites y documentación</li>
                            <li>💰 Obras sociales</li>
                            <li>♿ Accesibilidad</li>
                        </ul>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Escribí tu pregunta..." maxlength="200">
                    <button type="submit">Enviar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatWidget);
        
        // Eventos del chat
        const toggle = chatWidget.querySelector('.chat-toggle');
        const window = chatWidget.querySelector('.chat-window');
        const close = chatWidget.querySelector('.chat-close');
        const input = chatWidget.querySelector('.chat-input input');
        const sendBtn = chatWidget.querySelector('.chat-input button');
        
        toggle.addEventListener('click', () => {
            window.classList.toggle('hidden');
            if (!window.classList.contains('hidden')) {
                input.focus();
            }
        });
        
        close.addEventListener('click', () => {
            window.classList.add('hidden');
        });
        
        const sendMessage = () => {
            const message = input.value.trim();
            if (message) {
                addChatMessage(message, 'user');
                input.value = '';
                setTimeout(() => respondToChat(message), config.chatResponseDelay);
            }
        };
        
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    function addChatMessage(message, sender) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function respondToChat(userMessage) {
        const responses = {
            'buscar': '🔍 Para buscar profesionales, usá los filtros en la sección "Buscador". Podés filtrar por especialidad, zona, modalidad y más.',
            'tramite': '📋 En la sección "Trámite Paso a Paso" encontrás toda la info sobre documentación necesaria y cómo iniciar el proceso.',
            'obra social': '💰 Trabajamos con la mayoría de obras sociales. En "Preguntas Frecuentes" tenés la lista completa.',
            'accesibilidad': '♿ Todos nuestros profesionales están capacitados en accesibilidad. Podés filtrar por estilo de comunicación.',
            'contacto': '📞 Podés contactarnos por teléfono 0800-NEURO-RED o email ayuda@neurored.org.ar',
            'default': '🤔 No estoy seguro de cómo ayudarte con eso. ¿Podrías ser más específico? También podés llamar al 0800-NEURO-RED para ayuda personalizada.'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        let response = responses.default;
        
        for (const [key, value] of Object.entries(responses)) {
            if (lowerMessage.includes(key) || lowerMessage.includes(key.replace(' ', ''))) {
                response = value;
                break;
            }
        }
        
        addChatMessage(response, 'bot');
    }

    // ===== SISTEMA DE NOTIFICACIONES =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                ${message}
                <button class="notification-close">✕</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 5000);
        
        // Cerrar manualmente
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    // ===== SISTEMA DE MODALES =====
    function createModal(title) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">✕</button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="btn-secondary modal-close">Cerrar</button>
                </div>
            </div>
        `;
        
        // Eventos de cerrado
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => modal.remove());
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        return modal;
    }

    // ===== FUNCIONES DE ACCESIBILIDAD =====
    function announceNavigation(sectionName) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Navegaste a la sección: ${sectionName}`;
        
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    function announceSearchResults(count) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Se encontraron ${count} profesionales que coinciden con tu búsqueda`;
        
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    // ===== FUNCIONES UTILITARIAS =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function scrollToElement(element) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = element.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
})