// Add Member :
const addMemberOpenBtn = document.querySelector("section.settings #settings_element .header button#member");
const addMemberCloseBtn = document.querySelector("section.settings_add_update#member button#close");
const addMemberSection = document.querySelector("section.settings_add_update#member");

addMemberOpenBtn.addEventListener("click", () => {
    addMemberSection.classList.add("active");
});

addMemberCloseBtn.addEventListener("click", () => {
    addMemberSection.classList.remove("active");
});

// Add Room :
const addRoomOpenBtn = document.querySelector("section.settings #settings_element .header button#room");
const addRoomCloseBtn = document.querySelector("section.settings_add_update#room button#close");
const addRoomSection = document.querySelector("section.settings_add_update#room");

addRoomOpenBtn.addEventListener("click", () => {
    addRoomSection.classList.add("active");
});

addRoomCloseBtn.addEventListener("click", () => {
    addRoomSection.classList.remove("active");
});
