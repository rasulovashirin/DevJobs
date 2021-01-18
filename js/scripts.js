
// DOM ==========================================================================================================
var elModalForm = document.querySelector('.js-modal-form');
var elTitleInput = elModalForm.querySelector('.js-title-input');
var elCompanyInput = elModalForm.querySelector('.js-company-input');
var elTechsInput = elModalForm.querySelector('.js-techs-input');
var elTelegramInput = elModalForm.querySelector('.js-telegram-input');
var elNumberInput = elModalForm.querySelector('.js-number-input');
var elEmployerInput = elModalForm.querySelector('.js-employer-input');
var elSalaryInput = elModalForm.querySelector('.js-salary-input');
var elLocationSelect =elModalForm.querySelector('.js-location-select');
var elWorktimeSelect =elModalForm.querySelector('.js-worktime-select');
var elTextarea =elModalForm.querySelector('.js-modal-textarae');

var elList =document.querySelector('.js-announcement-list')

var elFragment = document.createDocumentFragment();
var elTemplate = document.querySelector('.js-template').content;

// MODAL ======================================================================================================

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




//Arrays ==========================================================================================================
var announcements = [];
var counter = [];

elModalForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  counter++;
  localStorage.setItem('counter', JSON.stringify(counter))
  console.log(counter)
  var title = elTitleInput.value;
  var company = elCompanyInput.value;
  var techs = elTechsInput.value;
  var telegram = elTelegramInput.value;
  var number = elNumberInput.value;
  var employer = elEmployerInput.value;
  var salary = elSalaryInput.value;

  var location = elLocationSelect.value;
  var worktime = elWorktimeSelect.value;
  var textarae = elTextarea.value;

  announcements.unshift({
    id : counter,
    title: title,
    company: company,
    technologies : techs,
    telegram: telegram,
    number: number,
    employer: employer,
    salary: salary,
    location: location,
    worktime: worktime,
    moreinfo : textarae
  })
  localStorage.setItem('announcements', JSON.stringify(announcements))

  elList.innerHTML = '';
  announcements.forEach(function(announcement){
    elCard = elTemplate.cloneNode(true);
    elCard.querySelector('.js-jobtime').textContent = announcement.worktime;
    elCard.querySelector('.js-job-link').textContent = announcement.title;
    elCard.querySelector('.js-job-link').dataset.id = announcement.id;
    elCard.querySelector('.js-employer').textContent = announcement.company;
    elCard.querySelector('.js-address').textContent = announcement.location;

    elFragment.appendChild(elCard);
  })
  elList.appendChild(elFragment);


  elTitleInput.value = '';
  elCompanyInput.value= '';
  elTechsInput.value= '';
  elTelegramInput.value= '';
  elNumberInput.value= '';
  elEmployerInput.value= '';
  elSalaryInput.value= '';
  elLocationSelect.value= 'All';
  elWorktimeSelect.value= 'All';
  elTextarea.value = '';

 (`E'lon qo'shildi!`)
 localStorage.setItem('announcements', JSON.stringify(announcements));
})

/// LINK BOSILGANDA OCHILADIGAN MODALNI ICHIDAGI MALUMOTLAR UCHUN
elList.addEventListener('click', function(evt){
  if(evt.target.matches('.js-job-link')){
    elNewModal.classList.add('new-modal--open');
    var elCardInfo = announcements.find(announcement => {
      return Number(evt.target.dataset.id) === announcement.id;
    })
    console.log(elCardInfo)
    document.querySelector('.js-new-title').textContent = elCardInfo.title;
    document.querySelector('.js-new-company').textContent = elCardInfo.company;
    document.querySelector('.js-new-location').textContent = elCardInfo.location;
    document.querySelector('.js-new-techs').textContent = elCardInfo.technologies;
    document.querySelector('.js-new-telegram').textContent = elCardInfo.telegram;
    document.querySelector('.js-new-number').textContent = elCardInfo.number;
    document.querySelector('.js-new-employer').textContent = elCardInfo.employer;
    document.querySelector('.js-new-worktime').textContent = elCardInfo.worktime;
    document.querySelector('.js-new-salary').textContent = elCardInfo.salary;
    document.querySelector('.js-new-moreinfo').textContent = elCardInfo.moreinfo;

  }
})
elNewModalClose.addEventListener('click', function () {
  elNewModal.classList.remove('new-modal--open');
});




//FILTRLASH UCHUN FORM
var elFilterForm = document.querySelector('.js-header-form');
var elTitleFilterInput = elFilterForm.querySelector('.js-header-title-input');
var elTechsFilterInput = elFilterForm.querySelector('.js-header-techs-input');
var elSalaryFilterInput = elFilterForm.querySelector('.js-header-salary-input');
var elLocationFilterSelect = elFilterForm.querySelector('.js-header-location-select');
var elWorktimeFilterSelect = elFilterForm.querySelector('.js-header-worktime-select');

elFilterForm.addEventListener('submit', function(evt){
  evt.preventDefault();

  var filterTitle = elTitleFilterInput.value;   //var filterTitle = new RegExp (elTitleFilterInput.value, 'gi);
  var filterTechs = elTechsFilterInput.value;   //  qisa ishlamayapti
  var filterSalary = elSalaryFilterInput.value;
  var filterLocation = elLocationFilterSelect.value;
  var filterWorktime = elWorktimeFilterSelect.value;

  var filteredAnnouncements = announcements.filter(function(announcement){
    return announcement.title === filterTitle || announcement.technologies === filterTechs || announcement.salary === filterSalary || announcement.location === filterLocation || announcement.worktime === filterWorktime;
  })

  console.log(filteredAnnouncements);

  elList.innerHTML = '';
  filteredAnnouncements.forEach(function(announcement){
    elCard = elTemplate.cloneNode(true);
    elCard.querySelector('.js-jobtime').textContent = announcement.worktime;
    elCard.querySelector('.js-job-link').textContent = announcement.title;
    elCard.querySelector('.js-employer').textContent = announcement.company;
    elCard.querySelector('.js-address').textContent = announcement.location;

    elFragment.appendChild(elCard);
  })
  elList.appendChild(elFragment);

  elLocationFilterSelect.value = 'All';
  elWorktimeFilterSelect.value = 'All';

})

 // LOCAL STORAGE
var announcementsLocal = JSON.parse(localStorage.getItem('announcements')) || [];
var counterLocal = Number(localStorage.getItem('counter')) || 0;
elList.innerHTML = '';
  announcementsLocal.forEach(function(announcement){
    elCard = elTemplate.cloneNode(true);
    elCard.querySelector('.js-jobtime').textContent = announcement.worktime;
    elCard.querySelector('.js-job-link').textContent = announcement.title;
    elCard.querySelector('.js-job-link').dataset.id = announcement.id;
    elCard.querySelector('.js-employer').textContent = announcement.company;
    elCard.querySelector('.js-address').textContent = announcement.location;

    elFragment.appendChild(elCard);
  })
  elList.appendChild(elFragment);

// LOCAL STORAGEDA LINK BOSILGANDA OCHILADIGAN MODALNI ICHIDAGI MALUMOTLAR UCHUN
  elList.addEventListener('click', function(evt){
    if(evt.target.matches('.js-job-link')){
      elNewModal.classList.add('new-modal--open');
      var elCardInfo = announcementsLocal.find(announcement => {
        return Number(evt.target.dataset.id) === announcement.id;
      })
      console.log(elCardInfo)
      document.querySelector('.js-new-title').textContent = elCardInfo.title;
      document.querySelector('.js-new-company').textContent = elCardInfo.company;
      document.querySelector('.js-new-location').textContent = elCardInfo.location;
      document.querySelector('.js-new-techs').textContent = elCardInfo.technologies;
      document.querySelector('.js-new-telegram').textContent = elCardInfo.telegram;
      document.querySelector('.js-new-number').textContent = elCardInfo.number;
      document.querySelector('.js-new-employer').textContent = elCardInfo.employer;
      document.querySelector('.js-new-worktime').textContent = elCardInfo.worktime;
      document.querySelector('.js-new-salary').textContent = elCardInfo.salary;
      document.querySelector('.js-new-moreinfo').textContent = elCardInfo.moreinfo;

    }
  })
  elNewModalClose.addEventListener('click', function () {
    elNewModal.classList.remove('new-modal--open');
  });

  // LOCAL STORAGEDA FILTRLASH
  elFilterForm.addEventListener('submit', function(evt){
    evt.preventDefault();

    var filterTitle = elTitleFilterInput.value;   //var filterTitle = new RegExp (elTitleFilterInput.value, 'gi);
    var filterTechs = elTechsFilterInput.value;   //  qisa ishlamayapti
    var filterSalary = elSalaryFilterInput.value;
    var filterLocation = elLocationFilterSelect.value;
    var filterWorktime = elWorktimeFilterSelect.value;

    var filteredAnnouncements = announcementsLocal.filter(function(announcement){
      return announcement.title === filterTitle || announcement.technologies === filterTechs || announcement.salary === filterSalary || announcement.location === filterLocation || announcement.worktime === filterWorktime;
    })

    console.log(filteredAnnouncements);

    elList.innerHTML = '';
    filteredAnnouncements.forEach(function(announcement){
      elCard = elTemplate.cloneNode(true);
      elCard.querySelector('.js-jobtime').textContent = announcement.worktime;
      elCard.querySelector('.js-job-link').textContent = announcement.title;
      elCard.querySelector('.js-employer').textContent = announcement.company;
      elCard.querySelector('.js-address').textContent = announcement.location;

      elFragment.appendChild(elCard);
    })
    elList.appendChild(elFragment);

    elLocationFilterSelect.value = 'All';
    elWorktimeFilterSelect.value = 'All';

  })