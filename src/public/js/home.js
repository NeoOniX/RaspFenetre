function prepareRoomCards () {
    let roomCardsToggleBtns = document.querySelectorAll(".roomlist article.roomcard .head button#onoff");

    // Change Toggle On / Off buttons :
    roomCardsToggleBtns.forEach((roomCardsToggleBtn) =>
        roomCardsToggleBtn.addEventListener("click", () => {
            roomCardsToggleBtn.classList.toggle("down");
        })
    );
}

// Show users :
const loginModal = document.querySelector("section#login");
const openLoginBtn = document.querySelector("header .right .logo #headerlogo");
const closeLoginBtn = document.querySelector("section#login .top button#closelogin");

openLoginBtn.addEventListener("click", () => loginModal.classList.add("active"));
closeLoginBtn.addEventListener("click", () => loginModal.classList.remove("active"));


setInterval(() => {
    prepareRoomCards();
}, 5000);