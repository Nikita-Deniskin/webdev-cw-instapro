import { uploadImage } from "../api.js";

export function renderUploadImageComponent({ element, onImageUrlChange }) {
  let imageUrl = "";

  const render = () => {
    element.innerHTML = `
  <div class="upload=image">
      ${
        imageUrl
          ? `
          <div class="file-upload-image-conrainer">
            <img class="file-upload-image" src="${imageUrl}">
            <button class="file-upload-remove-button button">Заменить фото</button>
          </div>
          `
          : `
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>
          
      `
      }
  </div>
`;

    const fileInputElement = element.querySelector(".file-upload-input");

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      if (file) {
        const lableEl = document.querySelector(".file-upload-label");
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Загружаю файл...";
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          onImageUrlChange(imageUrl);
          render();
        });
      }
    });

    element
      .querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        imageUrl = "";
        onImageUrlChange(imageUrl);
        render();
      });
  };

  render();
}
// опубликовано назад 
// не нравится серый цвет вокруг фото
// при нажатии на пользователя рядом с его именем непонятное андефайнт
// хувер на фото выглядит как в магазине или уменить разницу скейл или убрать вообще
//при переходе в профиль человека неравное расстояние от хэдера до автврки и от фото до аватарки
// при добавлении фотки вертится какая-то свастика
// нельзя перейти на свой профиль
// гигантская кнопка поделиться
// добавить хувер на поделиться
// расстояние между серым фоном фотки и лайком
// пусть сердечко становится красным при наведении
// на страничке профиля можно добавить текст,когда меньше 3х фоток, что можно завершить оформление профиля и добавить еще фото, чтобы было больше 2х
// выделять жирным шрифтом выйти при наведении