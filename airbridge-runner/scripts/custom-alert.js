function customAlert(message) {
    const overlay = document.getElementById("customAlertOverlay");
    const msg = document.getElementById("customAlertMessage");

    msg.textContent = message;
    overlay.style.display = "flex";
}

function closeCustomAlert() {
    const overlay = document.getElementById("customAlertOverlay");
    overlay.style.display = "none";
}