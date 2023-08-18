class MediaFactory {
  constructor(title, image, video, likes, date, price) {
    if(video ){
      return new MediaVideo(title, video, likes, date, price)
    } else if(image) {
      return new MediaImage(title, image, likes, date, price)
    }else {
      throw 'Unknown type format'
    }
  }
}
