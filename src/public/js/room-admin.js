const roomSelect = document.querySelector('#room-admin select');

function init (id) {
    roomSelect.addEventListener("change", () => {
        fetch(`/api/device/${id}`, { headers: { 'Content-Type': "application/json" }, body: JSON.stringify({roomid: roomSelect.value}), method: "POST" });
        console.log(roomSelect.value);
    });
}