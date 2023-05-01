function mediaFactory(media) {
  //
  const { id, photographerId, title, image, likes, date, price} = media
  const mediaRepo = `assets/sample/${media.photographer_id}`;
  const mediaContainer = document.createElement("article");

  let mediaPicture = document.createElement("img");
  mediaPicture.setAttribute("src", id);
  console.log("source" + media.id);

  let mediaVideo = document.createElement('video');
  mediaVideo.setAttribute("src", id);
  console.log("source" + media.id);

  mediaContainer.appendChild("mediaPicture");
  mediaContainer.appendChild("mediaVideo");

  return mediaContainer;
}
