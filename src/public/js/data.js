const history = {
    values: document.querySelector(".historique_lists .historique_list#values"),
    errors: document.querySelector(".historique_lists .historique_list#errors")
}

const device = {
    name: document.querySelector(".sensor .top h1"),
    value: document.querySelector(".informations .global .info h3"),
    battery: document.querySelector(".informations .global #battery"),
    type: document.querySelector(".informations #type"),
    room: document.querySelector(".informations #room")
}

const room = {
    name: document.querySelector(".room .top h1"),
    devices: document.querySelector(".sensors .devices_list")
}

function roomData(id) {
    fetch(`/api/room/${id}`).then((res) => {
        return res.json();
    }).then((data) => {
        room.name.innerHTML = data.name;

        let histval = "";
        let histerr = "";

        let dev = `
        <li class="sensors_number">
            <p>${data.devicescount} Capteur${data.devicescount > 1 ? 's' : ''}</p>
        </li>
        `;

        for (let device of data.devices) {
            for (let log of device.logs.filter((log) => log.type == "data")) {
                histval += `
                    <li>
                        <p>${device.name} : ${log.value}°C</p>
                        <span>16:09:34</span>
                    </li>
                `;
            }
            for (let log of device.logs.filter((log) => log.type == "error")) {
                histerr += `
                    <li>
                        <p>${device.name} : ${log.error}°C</p>
                        <span>16:09:34</span>
                    </li>
                `;
            }
            dev += `
            <li class="device_element">
                <a href="/device/${device.id}">
                    <p id="device_name">${device.name}</p>
                    <p id="device_value">${device.value}</p>
                </a>
            </li>
            `;
        }

        history.values.innerHTML = histval;
        history.errors.innerHTML = histerr;
        room.devices.innerHTML = dev;
    });
}

function deviceData(id) {
    fetch(`/api/device/${id}`).then((res) => {
        return res.json();
    }).then((data) => {
        let histval = "";
        let histerr = "";

        for (let log of device.logs.filter((log) => log.type == "data")) {
            histval += `
                <li>
                    <p>${device.name} : ${log.value}°C</p>
                    <span>16:09:34</span>
                </li>
            `;
        }
        for (let log of device.logs.filter((log) => log.type == "error")) {
            histerr += `
                <li>
                    <p>${device.name} : ${log.error}°C</p>
                    <span>16:09:34</span>
                </li>
            `;
        }
        
        history.values.innerHTML = histval;
        history.errors.innerHTML = histerr;
        
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