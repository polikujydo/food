"use strict";
import calc from "./modules/calc";
import cards from "./modules/cards";
import modal from "./modules/modal";
import server from "./modules/server";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

document.addEventListener("DOMContentLoaded", () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 10000);

    calc();
    cards();
    modal('[data-modal]', '.modal', modalTimerId);
    server('form', modalTimerId);
    slider();
    tabs('.tabheader__item', ".tabcontent", '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-08-11');      
});
