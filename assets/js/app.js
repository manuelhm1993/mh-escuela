import FuncionesGlobales from "./mh-clases/FuncionesGlobales.js";

// ------------- Delegación de eventos
//
// ------------- Al hacer click
FuncionesGlobales.getSeccionPersonas.addEventListener('click', (e) => {
    e.stopPropagation();

    const fuenteEvento = e.target;

    if(fuenteEvento.matches('.btn.btn-success') || fuenteEvento.matches('.btn.btn-danger')) {
        FuncionesGlobales.aprobarReprobar(fuenteEvento);
    }
});

// ------------- Al hacer submit
FuncionesGlobales.getFormularioIngreso.addEventListener('submit', (e) => {
    e.preventDefault();
    FuncionesGlobales.procesarIngreso(e.target);
});
