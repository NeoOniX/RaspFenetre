let device = {
    name: document.querySelector(".sensor .top h1"),
    value: document.querySelector(".informations .global .info h3"),
    battery: document.querySelector(".informations .global #battery"),
    type: document.querySelector(".informations #type"),
    room: document.querySelector(".informations #room")
}

let room = {
    name: document.querySelector(".room .top h1"),
    devices: document.querySelector(".sensors .devices_list")
}

function roomData(id) {
    fetch(`/api/room/${id}`).then((res) => {
        return res.json();
    }).then((data) => {
        room.name.innerHTML = data.name;

        let dev = `
        <li class="sensors_number">
            <p>${data.devicescount} Capteur${data.devicescount > 1 ? 's' : ''}</p>
        </li>
        `;

        for (let device of data.devices) {
            dev += `
            <li class="device_element">
                <p id="device_name">${device.name}</p>
                <p id="device_value">${device.value}</p>
                <button id="draggable">
                    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20 10.75C20 12.1307 18.8807 13.25 17.5 13.25C16.1193 13.25 15 12.1307 15 10.75C15 9.36929 16.1193 8.25 17.5 8.25C18.8807 8.25 20 9.36929 20 10.75ZM12.5 10.75C12.5 12.1307 11.3807 13.25 10 13.25C8.61929 13.25 7.5 12.1307 7.5 10.75C7.5 9.36929 8.61929 8.25 10 8.25C11.3807 8.25 12.5 9.36929 12.5 10.75ZM5 10.75C5 12.1307 3.88071 13.25 2.5 13.25C1.11929 13.25 0 12.1307 0 10.75C0 9.36929 1.11929 8.25 2.5 8.25C3.88071 8.25 5 9.36929 5 10.75ZM20 3.25C20 4.63071 18.8807 5.75 17.5 5.75C16.1193 5.75 15 4.63071 15 3.25C15 1.86929 16.1193 0.75 17.5 0.75C18.8807 0.75 20 1.86929 20 3.25ZM10 5.75C8.61929 5.75 7.5 4.63071 7.5 3.25C7.5 1.86929 8.61929 0.75 10 0.75C11.3807 0.75 12.5 1.86929 12.5 3.25C12.5 3.91304 12.2366 4.54893 11.7678 5.01777C11.2989 5.48661 10.663 5.75 10 5.75ZM5 3.25C5 4.63071 3.88071 5.75 2.5 5.75C1.11929 5.75 0 4.63071 0 3.25C0 1.86929 1.11929 0.75 2.5 0.75C3.88071 0.75 5 1.86929 5 3.25Z"
                        />
                    </svg>
                </button>
            </li>
            `;
        }

        room.devices.innerHTML = dev;
    });
}

function deviceData(id) {
    fetch(`/api/device/${id}`).then((res) => {
        return res.json();
    }).then((data) => {
        device.name.innerHTML = data.name;
        device.value.innerHTML = data.value;
        device.type.innerHTML = data.type;
        device.room.innerHTML = data.room;
        
        let battery = "";
        if (data.battery == "n/a") {
            battery = `<h3 class="no_battery">Aucune</h3>`;
        } else if (data.battery >= 60) {
            battery = `<h3 id="green">${data.battery}%</h3>`;
        } else if (data.battery >= 20) {
            battery = `<h3 id="orange">${data.battery}%</h3>`;
        } else if (data.battery) {
            battery = `<h3 id="red">${data.battery}%</h3>`;
        }

        device.battery.innerHTML = `
        <span><p>Batterie</p></span>
        ${battery}
        `;
    });
}