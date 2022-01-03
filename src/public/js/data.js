const history = {
    values: document.querySelector(".historique_lists .historique_list#values"),
    errors: document.querySelector(".historique_lists .historique_list#errors"),
    values_count: document.querySelector(".historique_choices #values #logs_number p"),
    errors_count: document.querySelector(".historique_choices #errors #logs_number p"),
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

        let values = [];
        let errors = [];

        for (let device of data.devices) {
            for (let log of device.logs.filter((log) => log.type == "data")) {
                values.push({ device, log });
            }
            for (let log of device.logs.filter((log) => log.type == "error")) {
                errors.push({ device, log });
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

        values.sort((a,b) => a.log.time - b.log.time);
        errors.sort((a,b) => a.log.time - b.log.time);

        for (let val of values) {
            let d = new Date();
            d.setTime(val.log.time);
            histval += `
                <li>
                    <p>${val.device.name} : ${val.log.value}</p>
                    <span>${d.toTimeString().split(" ")[0]}</span>
                </li>
            `;
        }

        for (let err of errors) {
            let d = new Date();
            d.setTime(err.log.time);
            histerr += `
                <li>
                    <p>${err.device.name} : ${err.log.value}</p>
                    <span>${d.toTimeString().split(" ")[0]}</span>
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

        for (let log of data.logs.filter((log) => log.type == "data")) {
            let d = new Date();
            d.setTime(log.time);
            histval += `
                <li>
                    <p>${log.value}</p>
                    <span>${d.toTimeString().split(" ")[0]}</span>
                </li>
            `;
        }
        for (let log of data.logs.filter((log) => log.type == "error")) {
            let d = new Date();
            d.setTime(log.time);
            histerr += `
                <li>
                    <p>${log.value}</p>
                    <span>${d.toTimeString().split(" ")[0]}</span>
                </li>
            `;
        }
        
        history.values.innerHTML = histval;
        history.errors.innerHTML = histerr;
        history.values_count.innerHTML = data.logs.filter((log) => log.type == "data").length;
        history.errors_count.innerHTML = data.logs.filter((log) => log.type == "error").length;
        
        device.name.innerHTML = data.name;
        device.value.innerHTML = data.value;
        device.type.innerHTML = `
            <span><p>Type</p></span>
            <h3>${data.type}</h3>
        `;
        if (device.room) {
            device.room.innerHTML = `
                <span><p>Salle</p></span>
                <h3>${data.room}</h3>
            `;
        }
        
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