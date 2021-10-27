const inquirer = require('inquirer');
require('colors');
const {
  pausaOpt,
  menuOpt,
  questions,
  optListLugares,
  confirmOpts,
  optCompletedTasks
} = require('../types/inquirerOpts')

const inquirerMenu = async () => {
  console.clear();
  console.log('========================'.green)
  console.log(' Selecciona una opacion '.green)
  console.log('========================\n'.green)

  const { option } = await inquirer.prompt(menuOpt);
  return option;
}

const pausa = async () => {
  console.log('\n')
  await inquirer.prompt(pausaOpt);
}

const leerInput = async (mensaje) => {
  questions[0].message = mensaje;
  const {desc} = await inquirer.prompt(questions);
  return desc;
}

const listarLugares = async (lugares = []) => {
  const choices = lugares.map( (lugar, i) => {
    const idx = `${i+=1}`.green;
    return {
      value: lugar.id,
      name: `${idx}. ${lugar.nombre}`
    }
  })
  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })
  optListLugares[0].choices = choices;
  const { id } = await inquirer.prompt(optListLugares);
  return id;
}

const confirmar = async (message) => {
  confirmOpts[0].message = message
  const { ok } = await inquirer.prompt(confirmOpts);
  return ok
}

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map( (tarea, i) => {
    const idx = `${i+=1}`.green;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }
  })
  optCompletedTasks[0].choices = choices;
  const { ids } = await inquirer.prompt(optCompletedTasks);
  return ids;
}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoCheckList
}
