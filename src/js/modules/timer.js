function timer(){
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
}

module.exports = timer;