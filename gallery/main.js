const photos = document.querySelectorAll("li img");
const mainPhoto = document.querySelector(".main-photo img");

photos.forEach(photo => {
  photo.addEventListener("click", () =>  mainPhoto.src = photo.src);
});
