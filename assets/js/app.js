// ------------- Clases globales
class FuncionesGlobales {
    // ------------- Campos de clase
    // 
    // ------------- Campos globales
    static #listaPersonas = {};

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
                    FuncionesGlobales.#leerEstudiantes(persona);
                break;
            case 'Profesor':
                    FuncionesGlobales.#leerProfesores(persona);
                break;
            }
        });

        FuncionesGlobales.#seccionEstudiantes.appendChild(FuncionesGlobales.#fragmentEstudiantes);
        FuncionesGlobales.#seccionProfesores.appendChild(FuncionesGlobales.#fragmentProfesores);
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

        FuncionesGlobales.#fragmentEstudiantes.appendChild(clonTemplate);
    }

    // ------------- Renderiza la sección de profesores
    static #leerProfesores(profesor) {
        const clonTemplate = FuncionesGlobales.#templateProfesores.cloneNode(true);

        clonTemplate.querySelector('.card-body .card-title').textContent = profesor.getNombre;
        clonTemplate.querySelector('.card-body h6.card-text').textContent = profesor.getOcupacion;
        clonTemplate.querySelector('.card-body p.card-text.lead span').textContent = profesor.getEdad;

        FuncionesGlobales.#fragmentProfesores.appendChild(clonTemplate);
    }

    // ------------- Procesa el formulario y registra un nuevo usuario
    static procesarIngreso(formulario) {
        const data = new FormData(formulario);
        let persona = null;

        // ------------- Destructory del iterator
        const [nombre, edad, ocupacion] = [...data.values()];

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
}

// ------------- Clase padre
class Persona {
    // ------------- Campos de clase
    #nombre;
    #edad;
    #ocupacion;

    // ------------- Métodos
    //
    // ------------- Constructor
    constructor(nombre, edad, ocupacion) {
        this.#nombre = nombre;
        this.#edad = edad;
        this.#ocupacion = ocupacion;
    }

    // ------------- Getters
    //
    // ------------- Getter del nombre
    get getNombre() {
        return this.#nombre;
    }

    // ------------- Getter de la edad
    get getEdad() {
        return this.#edad;
    }

    // ------------- Getter de la ocupación
    get getOcupacion() {
        return this.#ocupacion;
    }

    // ------------- Setters
    //
    // ------------- Setter del nombre
    set setNombre(nombre) {
        this.#nombre = nombre;
    }

    // ------------- Setter de la edad
    set setEdad(edad) {
        this.#edad = edad;
    }

    // ------------- Setter de la ocupación
    set setOcupacion(ocupacion) {
        this.#ocupacion = ocupacion;
    }
}

// ------------- Clases hijo
// 
// ------------- Clase de estudiantes
class Estudiante extends Persona {
    // ------------- Campos de clase
    #id;
    #status;

    // ------------- Métodos
    //
    // ------------- Constructor
    constructor(nombre, edad, ocupacion, id = '', status = 'Aprobado') {
        super(nombre, edad, ocupacion);

        this.#id = id;
        this.#status = status;
    }

    // ------------- Getter del id
    get getID() {
        return this.#id;
    }

    // ------------- Getter del status
    get getStatus() {
        return this.#status;
    }

    // ------------- Setter del id
    set setID(id) {
        this.#id = id;
    }

    // ------------- Setter del status
    set setStatus(status) {
        this.#status = status;
    }
}

// ------------- Clase de profesores
class Profesor extends Persona {
    // ------------- Campos de clase
    #id;
    
    // ------------- Métodos
    //
    // ------------- Constructor
    constructor(nombre, edad, ocupacion, id = '') {
        super(nombre, edad, ocupacion);

        this.#id = id;
    }

    // ------------- Getter del id
    get getID() {
        return this.#id;
    }

    // ------------- Setter del id
    set setID(id) {
        this.#id = id;
    }
}

// ------------- Delegación de eventos
//
// ------------- Al hacer click
FuncionesGlobales.getSeccionPersonas.addEventListener('click', (e) => {
    e.stopPropagation();

    const fuenteEvento = e.target;

    if(fuenteEvento.matches('.btn.btn-success') || fuenteEvento.matches('.btn.btn-danger')) {
        FuncionesGlobales.aprobarReprobar(e.target);
    }
});

// ------------- Al hacer submit
FuncionesGlobales.getFormularioIngreso.addEventListener('submit', (e) => {
    e.preventDefault();
    FuncionesGlobales.procesarIngreso(e.target);
});
