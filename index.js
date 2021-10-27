require('dotenv').config()

const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares
} = require('./helpers/inquirer');

const Busquedas = require('./models/buquedas');

const main = async () => {
  const busquedas = new Busquedas
  let opt = '';

  do {
    opt = await inquirerMenu()
    switch(opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput('Ciudad: ');
        // Search places
        const lugares = await busquedas.searchCiudad(termino);
        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        const {nombre, lng, lat} = lugares.find(l => l.id === id);

        // Clima

        // Mostrar resultados
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad:', nombre.cyan);
        console.log('Lat:', lat);
        console.log('Lng:', lng);
        console.log('Temperatura:', );
        console.log('Minima:', );
        console.log('Maxima:', );
        break;
      
    }


    if(opt !== 0) await pausa()
  } while (opt !== 0);
  
}


main();
