// Update Member :
if (document.querySelector("section.settings_lists#member")) {
    const updateMemberEditBtns = document.querySelectorAll("section.settings_lists#member .userstype ul.userslist #listelement .buttons button#edit");
    const updateMemberCloseBtn = document.querySelector("section.settings_add_update#member button#close");
    const updateMemberSection = document.querySelector("section.settings_add_update#member");

    // Pop-up Inputs :
    let updateMemberSectionName = document.querySelector("section.settings_add_update#member form input[name='name']");
    let updateMemberSectionIcon = document.querySelector("section.settings_add_update#member form .logo img");
    let updateMemberSectionPerms = document.querySelector("section.settings_add_update#member form .perms #permissions input[name='admin']");
    let updateMemberSectionId = document.querySelector("section.settings_add_update#member form input[name='id']");

    updateMemberEditBtns.forEach((updateMemberEditBtn) =>
        updateMemberEditBtn.addEventListener("click", () => {
            let userIcon = updateMemberEditBtn.parentElement.parentElement.querySelector(".global .logo #logo").src;
            let userName = updateMemberEditBtn.parentElement.parentElement.querySelector(".global input#pseudo").value;
            let userId = updateMemberEditBtn.parentElement.parentElement.querySelector(".global input[name='id']").value;
            let userPerms = updateMemberEditBtn.parentElement.parentElement.querySelector(".global input[name='perms']").value;

            // Attribute values :
            [updateMemberSectionName.value, updateMemberSectionIcon.src, updateMemberSectionId.value] = [userName, userIcon, userId];
            updateMemberSectionPerms.checked = (userPerms === "administrator");

            updateMemberSection.classList.add("active");
        })
    );

    updateMemberCloseBtn.addEventListener("click", () => {
        updateMemberSection.classList.remove("active");
    })
}

// Update Room :
if (document.querySelector("section.settings_lists#room")) {
    const updateRoomEditBtns = document.querySelectorAll("section.settings_lists#room ul.roomslist #listelement .buttons button#edit");
    const updateRoomCloseBtn = document.querySelector("section.settings_add_update#room button#close");
    const updateRoomSection = document.querySelector("section.settings_add_update#room");

    // Pop-up Inputs :
    let updateRoomSectionName = document.querySelector("section.settings_add_update#room form input[name='room']");
    let updateRoomSectionId = document.querySelector("section.settings_add_update#room form input[name='id']");

    updateRoomEditBtns.forEach((updateRoomEditBtn) =>
        updateRoomEditBtn.addEventListener("click", () => {
            let roomName = updateRoomEditBtn.parentElement.parentElement.querySelector(".global input#pseudo").value;
            let roomId = updateRoomEditBtn.parentElement.parentElement.querySelector(".global input[name='id']").value;

            // Attribute values :
            [updateRoomSectionName.value, updateRoomSectionId.value] = [roomName, roomId];

            updateRoomSection.classList.add("active");
        })
    );

    updateRoomCloseBtn.addEventListener("click", () => {
        updateRoomSection.classList.remove("active");
    })
}