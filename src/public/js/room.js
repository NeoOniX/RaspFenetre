// Show users :
const loginModal = document.querySelector('section#login');
const openLoginBtn = document.querySelector('header .right .logo #headerlogo');
const closeLoginBtn = document.querySelector('section#login .top button#closelogin');

openLoginBtn.addEventListener('click', () => loginModal.classList.add('active'));
closeLoginBtn.addEventListener('click', () => loginModal.classList.remove('active'));

// Change Toggle On / Off buttons :
const roomToggleBtn = document.querySelector('.top .buttons button#onoff');

roomToggleBtn.addEventListener('click', () => {
    roomToggleBtn.classList.toggle('down');
});