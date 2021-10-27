const roomSensors = document.querySelectorAll("section.room .sensors ul.devices_list li.device_element");
const roomSensorsDraggableBtns = document.querySelectorAll("section.room .sensors ul.devices_list li button#draggable");

// Hide Draggable buttons :
if (roomSensors.length <= 1) {
    roomSensorsDraggableBtns.forEach((roomSensorsDraggableBtn) => {
        roomSensorsDraggableBtn.style.display = "none";
    });
}

// Show users :
const loginModal = document.querySelector("section#login");
const openLoginBtn = document.querySelector("header .right .logo #headerlogo");
const closeLoginBtn = document.querySelector("section#login .top button#closelogin");

openLoginBtn.addEventListener("click", () => loginModal.classList.add("active"));
closeLoginBtn.addEventListener("click", () => loginModal.classList.remove("active"));
