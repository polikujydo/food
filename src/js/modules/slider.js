function slider(){
     //-----------SLIDER-------------
     const pictures = document.querySelectorAll(".offer__slide"), //кожен слайд (картинка) на сторінці
     prevArrow = document.querySelector(".offer__slider-prev"),
     nextArrow = document.querySelector(".offer__slider-next"),
     totalNum = document.querySelector("#total"),
     currentNum = document.querySelector("#current");
let pictureIndex = 1; //оприділяє текуще положення картинок

function showPicture(n){ //n - pictureIndex
   if( n > pictures.length){ //якшо в нас індекс більше а к-ксть картинок
       pictureIndex = 1; //то ми ставимо його в значення 1
   }

   if (n < 1) {//якшо в нас індекс менше за 1
       pictureIndex = pictures.length; //то ми індекс ставимо просто в кінець
   }

   pictures.forEach(picture => picture.style.display = 'none');//скрили всі картинки
   pictures[pictureIndex - 1].style.display = 'block';//показуємо портрібну картинку

   if (pictures.length < 10){
       currentNum.textContent = `0${pictureIndex}`;
   } else {
       currentNum.textContent = pictureIndex;
   }

} 

if (pictures.length < 10){
   totalNum.textContent = `0${pictureIndex}`;
} else {
   totalNum.textContent = pictureIndex;
}

showPicture(pictureIndex);


//Функціонал який змінює наш pictureIndex(листаємо фото вперед - збільшуємо pictureIndex на 1, назад - зменшуємо)
function indexChanging(n){
   showPicture(pictureIndex += n);//визиває ф-цію showPicture і поміщаємо pictureIndex який буде збільшений на значення n
}

prevArrow.addEventListener('click', () => {
   indexChanging(-1);//коли ми наживаємо на задню стрелку ми в значення N передаємо -1
});

nextArrow.addEventListener('click', () => {
   indexChanging(+1);//коли ми наживаємо на передню стрелку ми в значення N передаємо +1
});
}

export default slider;