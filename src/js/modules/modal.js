function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = "hidden";
   if (modalTimerId){
      clearInterval(modalTimerId); 
   }
}

function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.remove('show');
   modal.classList.add('hide');
   document.body.style.overflow = "";
}

     //-----------MODAL-------------

function modal(triggerSelector, modalSelector, modalTimerId){
     const modalOpenBtn = document.querySelectorAll(triggerSelector),
     modal = document.querySelector(modalSelector);

      modalOpenBtn.forEach(btn =>{
         btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
      });

      modal.addEventListener('click', (event) => {
         if (event.target == modal || event.target.classList == 'modal__close'){
            closeModal(modalSelector);
         }
      });




      document.addEventListener('keydown', (event) => {
         if (event.code === "Escape") {
            closeModal(modalSelector);
         }
      });

      function showModalByScroll() {
         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
         }
      }

      window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};