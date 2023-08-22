import { Persona } from "./Persona.js";

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

export { Profesor };