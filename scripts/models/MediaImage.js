class MediaImage {
  constructor(title, image, likes, date, price) {
    this._title = title
    this._image = image
    this._likes = likes
    this._date = date
    this._price = price
  }
  get title() {
    return this._title
  }

  get image() {
    return this._image
  }

  get likes() {
    return this._likes
  }

  get date() {
    return this._date
  }

  get price() {
    return this._price
  }

  set price(newPrice) {
    this._price = newPrice;
  }
}
