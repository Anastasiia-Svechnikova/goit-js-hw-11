export default function renderImages(arr) {
  return arr
    .map(
      ({
        webformatURL,
        views,
        downloads,
        comments,
        likes,
        tags,
        largeImageURL,
      }) => `<div class="photo-card">
      <a class="gallery__link" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>&#128420;<span>${likes}</span></b>
    </p>
    <p class="info-item">
      <b> 	
&#128065; <span>${views}</span></b>
    </p>
    <p class="info-item">
      <b>&#128488<span>${comments}</span></b>
    </p>
    <p class="info-item">
      <b>&#10549<span>${downloads}</span></b>
    </p>
  </div>
</div>`
    )
    .join('');
}
