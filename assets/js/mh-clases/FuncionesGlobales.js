import Estudiante from "./Estudiante.js";
import Profesor from "./Profesor.js";

class FuncionesGlobales {
    // ------------- Campos de clase
    // 
    // ------------- Campos globales
    static #listaPersonas = {};

    static #feedbackError = document.querySelector('.container main .alert.alert-danger');
    static #formularioIngreso = document.querySelector('#formulario-ingreso');
    static #seccionPersonas = document.querySelector('.container main + section.row');

    // ------------- Sección de estudiantes
    static #seccionEstudiantes = document.querySelector('#estudiantes');
    static #templateEstudiantes = document.querySelector('#estudiantes-template').content;
    static #fragmentEstudiantes = new DocumentFragment();

    // ------------- Sección de profesores
    static #seccionProfesores = document.querySelector('#profesores');
    static #templateProfesores = document.querySelector('#profesores-template').content;
    static #fragmentProfesores = new DocumentFragment();

    // ------------- Métodos
    //
    // ------------- Renderiza las cards
    static leerListaPersonas() {
        FuncionesGlobales.#seccionEstudiantes.textContent = '';
        FuncionesGlobales.#seccionProfesores.textContent = '';

        Object.values(FuncionesGlobales.#listaPersonas).forEach(persona => {
            switch(persona.getOcupacion) {
                case 'Estudiante':
                    const clonTemplateEstudiante = FuncionesGlobales.#leerEstudiantes(persona);

                    FuncionesGlobales.#fragmentEstudiantes.appendChild(clonTemplateEstudiante);
                break;
                case 'Profesor':
                    const clonTemplateProfesor = FuncionesGlobales.#leerProfesores(persona);

                    FuncionesGlobales.#fragmentProfesores.appendChild(clonTemplateProfesor);
                break;
            }
        });

        FuncionesGlobales.#seccionEstudiantes.appendChild(FuncionesGlobales.#fragmentEstudiantes);
        FuncionesGlobales.#seccionProfesores.appendChild(FuncionesGlobales.#fragmentProfesores);

        // ------------- Resetear los fragments
        FuncionesGlobales.#fragmentEstudiantes = new DocumentFragment();
        FuncionesGlobales.#fragmentProfesores = new DocumentFragment();
    }

    // ------------- Renderiza la sección de estudiantes
    static #leerEstudiantes(estudiante) {
        const clonTemplate = FuncionesGlobales.#templateEstudiantes.cloneNode(true);

        clonTemplate.querySelector('.card-body .card-title span.text-primary').textContent = estudiante.getNombre;
        clonTemplate.querySelector('.card-body h6.card-text').textContent = estudiante.getOcupacion;
        clonTemplate.querySelector('.card-body p.card-text.lead span').textContent = estudiante.getEdad;

        const statusActual = estudiante.getStatus;
        const statusEstudiante = clonTemplate.querySelector('.card-body .card-title span.badge');
        const botonesAccion = clonTemplate.querySelectorAll('.card-body .btn');

        statusEstudiante.textContent = statusActual;

        switch(statusActual) {
            case 'Aprobado':
                botonesAccion[0].disabled = true;
                botonesAccion[1].disabled = false;
                statusEstudiante.classList.replace('bg-danger', 'bg-success');
                break;
            case 'Reprobado':
                botonesAccion[0].disabled = false;
                botonesAccion[1].disabled = true;
                statusEstudiante.classList.replace('bg-success', 'bg-danger');
                break;
        }

        botonesAccion.forEach(boton => {
            boton.dataset.idEstudiante = estudiante.getID;
        });

        return clonTemplate;
    }

    // ------------- Renderiza la sección de profesores
    static #leerProfesores(profesor) {
        const clonTemplate = FuncionesGlobales.#templateProfesores.cloneNode(true);

        clonTemplate.querySelector('.card-body .card-title').textContent = profesor.getNombre;
        clonTemplate.querySelector('.card-body h6.card-text').textContent = profesor.getOcupacion;
        clonTemplate.querySelector('.card-body p.card-text.lead span').textContent = profesor.getEdad;

        return clonTemplate;
    }

    // ------------- Procesa el formulario y registra un nuevo usuario
    static procesarIngreso(formulario) {
        const data = new FormData(formulario);
        let persona = null;

        // ------------- Destructory del iterator
        const [nombre, edad, ocupacion] = [...data.values()];

        if(nombre.trim().length < 1) {
            FuncionesGlobales.#feedbackError.classList.remove('d-none');

            formulario['nombre'].value = '';
            formulario['nombre'].focus();

            return;
        }

        switch(data.get('ocupacion')) {
            case 'Estudiante':
                persona = new Estudiante(nombre, edad, ocupacion);
                break;
            case 'Profesor':
                persona = new Profesor(nombre, edad, ocupacion);
                break;
        }

        persona.setID = FuncionesGlobales.generarID();

        FuncionesGlobales.#listaPersonas[persona.getID] = persona;
        FuncionesGlobales.leerListaPersonas();

        formulario.reset();

        if(!FuncionesGlobales.#feedbackError.classList.contains('d-none')) {
            FuncionesGlobales.#feedbackError.classList.add('d-none');
        }
    }

    // ------------- Crea un nuevo ID alphanumérico con el instante de creación
    static generarID() {
        return Math.random().toString(36).substring(2) + Date.now();
    }

    // ------------- Cambia el status del estudiante a aprobado o reprobado
    static aprobarReprobar(botonAccion) {
        const statusEstudiante = (botonAccion.textContent === 'Aprobar') ? 'Aprobado' : 'Reprobado';

        FuncionesGlobales.#listaPersonas[botonAccion.dataset.idEstudiante].setStatus = statusEstudiante;
        FuncionesGlobales.leerListaPersonas();
    }

    // ------------- Getters globales
    //
    // ------------- Getter del formulario de ingreso
    static get getFormularioIngreso() {
        return FuncionesGlobales.#formularioIngreso;
    }

    // ------------- Getter del formulario de ingreso
    static get getSeccionPersonas() {
        return FuncionesGlobales.#seccionPersonas;
    }

    // ------------- Getter del alert error
    static get getFeedbackError() {
        return FuncionesGlobales.#feedbackError;
    }
}

// export default FuncionesGlobales;

// ------------- Alternativamente
export {
    FuncionesGlobales as default
}
