const fs = require('fs');
const colors = require('colors');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = (completado) => {
    cargarDB();
    switch (completado) {
        case 'true':
            let listadoCompleto = listadoPorHacer.filter(tarea => tarea.completado === true);
            return listadoCompleto;
            break;
        case 'false':
            let listadoPorCompletar = listadoPorHacer.filter(tarea => tarea.completado === false);
            return listadoPorCompletar;
            break;
        default:
            return listadoPorHacer;
            break;
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    if (completado === "true") {
        completado = true;
    } else if (completado === "false") {
        completado = false;
    }
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}