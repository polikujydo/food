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