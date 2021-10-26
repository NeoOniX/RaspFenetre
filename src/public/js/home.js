const roomCards = document.querySelectorAll(".roomlist article.roomcard");
const roomCardsDraggableBtns = document.querySelectorAll(".roomlist article.roomcard .head button#draggable");
const roomCardsToggleBtns = document.querySelectorAll(".roomlist article.roomcard .head button#onoff");

// Hide Draggable buttons :
if (roomCards.length <= 1) {
    roomCardsDraggableBtns.forEach((roomCardsDraggableBtn) => {
        roomCardsDraggableBtn.style.display = "none";
    });
}

// Change Toggle On / Off buttons :
roomCardsToggleBtns.forEach((roomCardsToggleBtn) =>
    roomCardsToggleBtn.addEventListener("click", () => {
        roomCardsToggleBtn.classList.toggle("down");
    })
);
