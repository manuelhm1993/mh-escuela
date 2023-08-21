// ------------- Clases globales
class FuncionesGlobales {
    // ------------- Campos de clase
    // 
    // ------------- Campos globales
    static #formularioIngreso = document.querySelector('#formulario-ingreso');
    static #seccionPersonas = document.querySelector('.container main + section.row');
    static #fragment = new DocumentFragment();
    static #listaPersonas = {};

    // ------------- Sección de estudiantes
    static #seccionEstudiantes = document.querySelector('#estudiantes');
    static #templateEstudiantes = document.querySelector('#estudiantes-template');

    // ------------- Sección de profesores
    static #seccionProfesores = document.querySelector('#profesores');
    static #templateProfesores = document.querySelector('#profesores-template');

    // ------------- Métodos
    //
    // ------------- Renderiza las cards
    static leerListaPersonas() {
        FuncionesGlobales.#seccionPersonas.textContent = '';
    }

    // ------------- Procesa el formulario y registra un nuevo usuario
    static procesarIngreso(formulario) {
        const data = new FormData(formulario);
        let persona = null;

        switch(data.get('ocupacion')) {
            case 'Estudiante':
                persona = new Estudiante(
                    data.get('nombre'),
                    data.get('edad'),
                    data.get('ocupacion'),
                    FuncionesGlobales.generarID()
                );
                break;
            case 'Profesor':
                persona = new Profesor(
                    data.get('nombre'),
                    data.get('edad'),
                    data.get('ocupacion'),
                    FuncionesGlobales.generarID()
                );
                break;
        }

        FuncionesGlobales.#listaPersonas[persona.getID] = persona;

        formulario.reset();
    }

    // ------------- Crea un nuevo ID alphanumérico con el instante de creación
    static generarID() {
        return Math.random().toString(36).substring(2) + Date.now();
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

    // ------------- Getter del fragment
    static get getFragment() {
        return FuncionesGlobales.#fragment;
    }

    // ------------- Getters estudiantes
    //
    // ------------- Getter de la sección
    static get getSeccionEstudiantes() {
        return FuncionesGlobales.#seccionEstudiantes;
    }

    // ------------- Getter de la sección
    static get getTemplateEstudiantes() {
        return FuncionesGlobales.#templateEstudiantes;
    }

    // ------------- Getters profesores
    //
    // ------------- Getter de la sección
    static get getSeccionProfesores() {
        return FuncionesGlobales.#seccionProfesores;
    }

    // ------------- Getter de la sección
    static get getTemplateProfesores() {
        return FuncionesGlobales.#templateProfesores;
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

    // ------------- Métodos
    //
    // ------------- Constructor
    constructor(nombre, edad, ocupacion, id = null) {
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

// ------------- Clase de profesores
class Profesor extends Persona {
    // ------------- Campos de clase
    #id;
    
    // ------------- Métodos
    //
    // ------------- Constructor
    constructor(nombre, edad, ocupacion, id = null) {
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
    console.log(e.target);
});

// ------------- Al hacer submit
FuncionesGlobales.getFormularioIngreso.addEventListener('submit', (e) => {
    e.preventDefault();
    FuncionesGlobales.procesarIngreso(e.target);
});
