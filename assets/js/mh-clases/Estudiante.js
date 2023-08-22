import { Persona } from "./Persona.js";

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

export { Estudiante };