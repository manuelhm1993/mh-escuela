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
class Estudiante extends Persona {
    // ------------- Campos de clase
    #seccionEstudiantes = document.querySelector('#estudiantes');
    #templateEstudiantes = document.querySelector('#estudiantes-template');
    #fragmentEstudiantes = new DocumentFragment();

    // ------------- Métodos
    //
    // ------------- Constructor
    constructor(nombre, edad, ocupacion) {
        super(nombre, edad, ocupacion);

        this.#seccionEstudiantes = document.querySelector('#estudiantes');
        this.#templateEstudiantes = document.querySelector('#estudiantes-template');
        this.#fragmentEstudiantes = new DocumentFragment();
    }
}

class Profesor extends Persona {
    // ------------- Campos de clase
    #seccionProfesores;
    #templateProfesores;
    #fragmentProfesores;

    // ------------- Métodos
    //
    // ------------- Constructor
    constructor(nombre, edad, ocupacion) {
        super(nombre, edad, ocupacion);
        
        this.#seccionProfesores = document.querySelector('#profesores');
        this.#templateProfesores = document.querySelector('#profesores-template');
        this.#fragmentProfesores = new DocumentFragment();
    }
}
