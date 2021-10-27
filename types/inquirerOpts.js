require('colors');

const menuOpt = [
  {
    type: 'list',
    name: 'option',
    message: 'Buscar ciudad: ',
    choices: [
      {
        value: 1,
        name: `${'1'.green}. Buscar ciudad`
      },
      {
        value: 2,
        name: `${'2'.green}. Historial`
      },
      {
        value: 0,
        name: `${'0'.green}. Salir`
      }
    ]
  }
]


const pausaOpt = [
  {
    type: 'input',
    name: 'pressKey',
    message: `Presione ${'Enter'.green} para continuar`
  }
]

const questions = [
  {
    type: 'input',
    name: 'desc',
    message: '',
    validate(value) {
      if (value.length === 0){
        return 'por favor ingrese un valor'
      }
      return true
    }
  }
]

const optListLugares = [
  {
    type: 'list',
    name: 'id',
    message: 'Seleccione',
    choices: []
  }
]

const optCompletedTasks = [
  {
    type: 'checkbox',
    name: 'ids',
    message: 'Seleccione ->',
    choices: []
  }
]

const confirmOpts = [
  {
    type: 'confirm',
    name: 'ok',
    message: ''
  }
]




module.exports = {
  menuOpt,
  pausaOpt,
  questions,
  optListLugares,
  confirmOpts,
  optCompletedTasks
}
