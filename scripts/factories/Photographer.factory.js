class PhotographerFactory {
  // constructor(data) {
  //     return new Photographer(data)
  // }
  constructor(name, id, city, country, tagline, price, portrait) {
    if(name){
      return new Photographer(name, id, city, country, tagline, price, portrait)
    }else {
      throw 'Unknown type format'
    }
  }
}
