var elModal = document.querySelector('.js-modal');
var elModalOpenButton = document.querySelector('.js-announcement-button');
var elModalCloseButton = document.querySelector('.js-modal-close-button');

var elNewModal = document.querySelector('.js-new-modal');
var elNewModalOpen = document.querySelector('.js-job-link');
var elNewModalClose = document.querySelector('.js-new-modal-close-button');


elModalOpenButton.addEventListener('click', function () {
  elModal.classList.add('modal--open');
});
elModalCloseButton.addEventListener('click', function () {
  elModal.classList.remove('modal--open');
});

elNewModalOpen.addEventListener('click', function () {
  elNewModal.classList.add('new-modal--open');
});
elNewModalClose.addEventListener('click', function () {
  elNewModal.classList.remove('new-modal--open');
});
