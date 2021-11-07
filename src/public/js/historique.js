const historiqueModal = document.querySelector('section.historique');
const showHistoriqueBtn = document.querySelector('.top .buttons button#historique');
const closeHistoriqueBtn = document.querySelector('button#close');

// Show Historique :
showHistoriqueBtn.addEventListener('click', () => historiqueModal.classList.add('active'));

// Hide Historique :
closeHistoriqueBtn.addEventListener('click', () => historiqueModal.classList.remove('active'));

// View historiques :
const historiqueValuesBtn = document.querySelector('.historique_choices button#values');
const historiqueValuesLogs = document.querySelector('.historique_lists ul#values');

const historiqueErrorsBtn = document.querySelector('.historique_choices button#errors');
const historiqueErrorsLogs = document.querySelector('.historique_lists ul#errors');

historiqueValuesBtn.addEventListener('click', () => {
    historiqueValuesBtn.classList.add('active');
    historiqueErrorsBtn.classList.remove('active');

    historiqueValuesLogs.classList.add('active');
    historiqueErrorsLogs.classList.remove('active');
});

historiqueErrorsBtn.addEventListener('click', () => {
    historiqueErrorsBtn.classList.add('active');
    historiqueValuesBtn.classList.remove('active');

    historiqueErrorsLogs.classList.add('active');
    historiqueValuesLogs.classList.remove('active');
});
