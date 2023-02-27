"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const calc = require("./modules/calc"),
          cards = require("./modules/cards"),
          modal = require("./modules/modal"),
          server = require("./modules/server"),
          slider = require("./modules/slider"),
          tabs = require("./modules/tabs"),
          timer = require("./modules/timer");
    
    calc();
    cards();
    modal();
    server();
    slider();
    tabs();
    timer();      
});
