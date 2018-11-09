const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente una tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea por realizar', { descripcion })
    .command('actualizar', 'Cambia el estado completado de una tarea', { descripcion, completado })
    .command('borrar', 'Elimina una tarea', { descripcion })
    .command('listar', 'Enlista actividades por realizar o pendientes', { completado })
    .help()
    .argv;

module.exports = {
    argv
}