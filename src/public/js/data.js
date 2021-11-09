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
                <a href="/device/${device.id}">
                    <p id="device_name">${device.name}</p>
                    <p id="device_value">${device.value}</p>
                </a>
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