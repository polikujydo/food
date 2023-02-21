"use strict";
document.addEventListener("DOMContentLoaded", () => {
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
        //-----------TIMER-------------

    const deadLine = '2023-03-01';

function OffsetOfdeadLineAndCurrentTime(endOfTime) { // оприділяє різницю між deadLine і текущим часом 
 // задача ф-ції получити різницю між датами

        //Date.parse(deadline): 1)робить число з deadLine 2) парсить в к-сть мс в кінцевому часі, до якого треба дорахувати (deadLine)
    const t = Date.parse(endOfTime) - Date.parse(new Date()), // ізза того шо треба найти різницю - віднімаю текущу дату в мс
        
     //різницю в мс перетворюємо в к-сть днів, хвилин, секунд

            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / 1000 * 60 * 60) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

            //вертаємо ці змінні наружу

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

//виймаємо наші значення з верстки, куда ми будемо вставляти наші часи
   function setClock(selector, endOfTime ){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),

//запускаєм ф-цію updateClock кожну секунду
          timeInterval = setInterval(updateClock, 1000);

        updateClock();  

        function updateClock(){
            const t = OffsetOfdeadLineAndCurrentTime(endOfTime); //В змінну t ми кладемо резултат роботи даної ф-ції, тоесть об*єкт reutrn
            
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

    //зупиняємо ф-цію updateClock (clearnInterval) 
            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
          
   }

   setClock('.timer', deadLine);

        //-----------MODAL-------------

    const modalOpenBtn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
        

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
   modalCloseBtn.addEventListener('click', closeModal);

   modal.addEventListener('click', (event) => {
        if (event.target == modal){
            closeModal();
        }
    });


    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape") {
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 10000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

        //-----------CLASS-------------

        class MenuCard {
           constructor(src, alt, subtitle, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);// в властивості his.parent лежить DOМ element
            this.classes = classes;
            this.convert = 40; // курс по якому буде долар конвертиртись в гривні 
            this.convertToUAH(); // коли всі властивості виконаються по порядку, виконається метод
           } 

           convertToUAH(){
            this.price *= this.convert; 
           }

           redner(){
            const divElement = document.createElement("div");
            if (this.classes.length === 0){
                this.divElement = 'menu__item';
                divElement.classList.add(divElement);
            }

            this.classes.forEach(className => divElement.classList.add(className));
            divElement.innerHTML = 
                `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                    `;
                this.parent.append(divElement);
           }
        }


        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy", 
            'Меню "Фитнес" ',
            "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
            6.5,
            ".menu .container",
            "menu__item"
        ).redner(); 

        new MenuCard(
            "img/tabs/elite.jpg",
            "elite", 
            ' Меню "Премиум" ',
            "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
            10,
            ".menu .container",
            "menu__item"
        ).redner(); 

        new MenuCard(
            "img/tabs/post.jpg",
            "post", 
            ' Меню "Постное" ',
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков',
            5,
            ".menu .container",
            "menu__item"
        ).redner(); 


    
    });