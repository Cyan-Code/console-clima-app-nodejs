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
        if (id === '0') continue;

        // Guardar en DB
        const {nombre, lng, lat} = lugares.find(l => l.id === id);
        busquedas.agregarHistorial(nombre)
        // Clima
        const obj = await busquedas.climaCiudad(lat, lng);

        // Mostrar resultados
        //console.clear();
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad:', nombre.cyan);
        console.log('Lat:', lat);
        console.log('Lng:', lng);
        console.log('Temperatura:', `${obj.temperatura}`.yellow + ' grados'.cyan);
        console.log('Minima:', `${obj.tMax}`.yellow + ' grados'.cyan);
        console.log('Maxima:', `${obj.tMin}`.yellow + ' grados'.cyan);
        console.log('¿Como esta el clima?:', `${obj.desc}`.cyan);
        break;
      
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i+=1}.`.green;
          console.log(`${idx} ${lugar}`);
        })
        break;
    }


    if(opt !== 0) await pausa()
  } while (opt !== 0);
  
}


main();
