const axios = require('axios');


class Busquedas {
  historial = [];

  constructor() {
    // TODO: Leer mi base de datos if exist
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language':'es'
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

    return []; // retornar all places that match with argument
  }

}


module.exports = Busquedas