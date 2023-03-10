/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((module) => {

function calc(){
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

elements.forEach(elem => {
    elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio');
            localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
            sex = e.target.getAttribute('id');
            localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
    });
    });
}

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

input.addEventListener('input', () => {
    if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
    } else {
        input.style.border = 'none';
    }
    switch(input.getAttribute('id')) {
        case "height":
            height = +input.value;
            break;
        case "weight":
            weight = +input.value;
            break;
        case "age":
            age = +input.value;
            break;
    }

    calcTotal();
    });
}

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((module) => {

function cards(){
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH(); 
    }

    changeToUAH() {
        this.price = this.price * this.transfer; 
    }

    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">????????:</div>
                <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
            </div>
        `;
        this.parent.append(element);
    }
}

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });

}
module.exports = cards;

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((module) => {

function modal(){
     //-----------MODAL-------------

     const modalOpenBtn = document.querySelectorAll('[data-modal]'),
     modal = document.querySelector('.modal');
   

function openModal(event) {
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = "hidden";
   clearInterval(modalTimerId); 
}
modalOpenBtn.forEach(btn =>{
    btn.addEventListener('click', openModal);
});

function closeModal() {
   modal.classList.remove('show');
   modal.classList.add('hide');
   document.body.style.overflow = "";
}

modal.addEventListener('click', (event) => {
   if (event.target == modal || event.target.classList == 'modal__close'){
       closeModal();
   }
});




document.addEventListener('keydown', (event) => {
   if (event.code === "Escape") {
       closeModal();
   }
});

const modalTimerId = setTimeout(openModal, 10000);

function showModalByScroll() {
   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
       openModal();
       window.removeEventListener('scroll', showModalByScroll);
   }
}

window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./src/js/modules/server.js":
/*!**********************************!*\
  !*** ./src/js/modules/server.js ***!
  \**********************************/
/***/ ((module) => {

function server(){
    //-----------SERVER-------------

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: '??????????????! ?????????? ???? ?? ???????? ????????????????',
        failure: '??????-???? ?????????? ???? ??????...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };


function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);
    
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>??</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

}

module.exports = server;

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((module) => {

function slider(){
     //-----------SLIDER-------------
     const pictures = document.querySelectorAll(".offer__slide"), //?????????? ?????????? (????????????????) ???? ????????????????
     prevArrow = document.querySelector(".offer__slider-prev"),
     nextArrow = document.querySelector(".offer__slider-next"),
     totalNum = document.querySelector("#total"),
     currentNum = document.querySelector("#current");
let pictureIndex = 1; //?????????????????? ???????????? ?????????????????? ????????????????

function showPicture(n){ //n - pictureIndex
   if( n > pictures.length){ //???????? ?? ?????? ???????????? ???????????? ?? ??-???????? ????????????????
       pictureIndex = 1; //???? ???? ?????????????? ???????? ?? ???????????????? 1
   }

   if (n < 1) {//???????? ?? ?????? ???????????? ?????????? ???? 1
       pictureIndex = pictures.length; //???? ???? ???????????? ?????????????? ???????????? ?? ????????????
   }

   pictures.forEach(picture => picture.style.display = 'none');//???????????? ?????? ????????????????
   pictures[pictureIndex - 1].style.display = 'block';//?????????????????? ?????????????????? ????????????????

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


//???????????????????? ???????? ???????????? ?????? pictureIndex(???????????????? ???????? ???????????? - ???????????????????? pictureIndex ???? 1, ?????????? - ??????????????????)
function indexChanging(n){
   showPicture(pictureIndex += n);//?????????????? ??-?????? showPicture ?? ?????????????????? pictureIndex ???????? ???????? ???????????????????? ???? ???????????????? n
}

prevArrow.addEventListener('click', () => {
   indexChanging(-1);//???????? ???? ?????????????????? ???? ?????????? ?????????????? ???? ?? ???????????????? N ?????????????????? -1
});

nextArrow.addEventListener('click', () => {
   indexChanging(+1);//???????? ???? ?????????????????? ???? ?????????????? ?????????????? ???? ?? ???????????????? N ?????????????????? +1
});
}

module.exports = slider;

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((module) => {

function tabs(){
    //-----------TABS-------------
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector('.tabheader__items');

function hideTabContent(){
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show'); 
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i){
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide'); 
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent(0);

tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")){
    tabs.forEach((item, i) => {
        if (target == item){
            hideTabContent();
            showTabContent(i);
        }
    });
    }
});
}
module.exports = tabs;

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((module) => {

function timer(){
    const deadLine = '2023-03-01';

function OffsetOfdeadLineAndCurrentTime(endOfTime) { // ?????????????????? ?????????????? ?????? deadLine ?? ?????????????? ?????????? 
 // ???????????? ??-?????? ???????????????? ?????????????? ?????? ????????????

        //Date.parse(deadline): 1)???????????? ?????????? ?? deadLine 2) ?????????????? ?? ??-?????? ???? ?? ?????????????????? ????????, ???? ?????????? ?????????? ???????????????????? (deadLine)
const t = Date.parse(endOfTime) - Date.parse(new Date()), // ???????? ???????? ???? ?????????? ?????????? ?????????????? - ???????????????? ???????????? ???????? ?? ????
    
??//?????????????? ?? ???? ???????????????????????? ?? ??-?????? ????????, ????????????, ????????????

        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / 1000 * 60 * 60) % 24),
        minutes = Math.floor((t / (1000 * 60)) % 60),
        seconds = Math.floor((t / 1000) % 60);

        //???????????????? ???? ???????????? ????????????

    return {
        'total': t,
        'days' : days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };

}

function getZero(number){
    if (number >= 0 && number < 10){
        return `0${number}`;
    } else {
        return number;
    }
}

//???????????????? ???????? ???????????????? ?? ??????????????, ???????? ???? ???????????? ?????????????????? ???????? ????????
function setClock(selector, endOfTime ){
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),

//?????????????????? ??-?????? updateClock ?????????? ??????????????
        timeInterval = setInterval(updateClock, 1000);

    updateClock();  

    function updateClock(){
        const t = OffsetOfdeadLineAndCurrentTime(endOfTime); //?? ???????????? t ???? ?????????????? ???????????????? ???????????? ?????????? ??-??????, ???????????? ????*?????? reutrn
        
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

//?????????????????? ??-?????? updateClock (clearnInterval) 
        if (t.total <= 0){
            clearInterval(timeInterval);
        }
    }
        
}

   setClock('.timer', deadLine);
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/

document.addEventListener("DOMContentLoaded", () => {
    const calc = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js"),
          server = __webpack_require__(/*! ./modules/server */ "./src/js/modules/server.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js"),
          tabs = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
    
    calc();
    cards();
    modal();
    server();
    slider();
    tabs();
    timer();      
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map