const fs = require('fs')
const axios = require('axios');


class Busquedas {
  historial = [];
  dbPath = './db/database.json';

  constructor() {
    this.leerDB()
  }

  get historialCapitalizado() {
    return this.historial.map(h => {// Documentar
      
      let palabras = h.split(' ');
      palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
      return palabras.join(' ')
    })
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language':'es'
    }
  }

  get paramsClima() {
    return {
      'units': 'metric',
      'lang': 'es',
      'appid': process.env.OPENWEATHER_KEY
    }
  }

  async searchCiudad( lugar = '' ) {
    try {
      const instance = axios.default.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox
      });
      const {data} = await instance.get();
      return data.features.map(lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1] 
      }));
    } catch (error) {
      console.log('No se pudo optener la informacion');
    }
  }

  async climaCiudad(lat, lon) {
    try {
      const instance = axios.default.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsClima, lat, lon} 
      })
      const { data: {main, weather} } = await instance.get();
      return {
        temperatura: main.temp,
        tMax: main.temp_max,
        tMin: main.temp_min,
        desc: weather[0].description
      }
    } catch (error) {
      console.log('No se encontro la ciudad');
    }
  }

  agregarHistorial(lugar = '') {
    
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(0,5);

    this.historial.unshift(lugar.toLocaleLowerCase());
    // Grabar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) return null;
    // Debe de existir...
    const historial = fs.readFileSync(this.dbPath, {encoding:'utf-8'})
    const data = JSON.parse(historial);
    this.historial = data.historial
  }
  
}

module.exports = Busquedas