const urlInput = document.getElementById("urlInput");
const urlError = document.getElementById("urlError");
const anchorContainer = document.getElementById("anchorContainer");
const createAnchorButton = document.getElementById("createAnchorButton");
const createLocationButton = document.getElementById("createLocationButton");

const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessageButton");

const toastMessage = document.getElementById("toastMessage");
const toastDismiss = document.getElementById("toastDismiss");

function buildUrl() {
    // reset anchor container
    anchorContainer.textContent = "";

    const urlString = "uewebbrowser://" + urlInput.value;
    try {
        const url = new URL(urlString);

        urlError.style.display = "none";
        return url.href;
    } catch (e) {
        urlError.textContent = e.message;
        urlError.style.display = "block";
        urlInput.value = ""
        return null;
    }
}

function createAnchor(url) {
    const a = document.createElement("a");
    a.href = url;
    a.textContent = "Click Link Address";

    anchorContainer.innerHTML = "";
    anchorContainer.appendChild(a);
    showToast(url);

    // reset url input
    urlInput.value = ""
}

function executeLocation(url) {
    try {
        window.location.href = url;
        anchorContainer.textContent = "";
        showToast(`window.location.href = ${url}`);

        // reset url input
        urlInput.value = ""
    } catch (e) {
        showToast(e.message);
    }
}

createAnchorButton.addEventListener("click", () => {
    const url = buildUrl();
    if (!url) return;
    createAnchor(url);
});

createLocationButton.addEventListener("click", () => {
    const url = buildUrl();
    if (!url) return;
    executeLocation(url);
});

sendMessageButton.addEventListener("click", () => {
    try {
        const message = messageInput.value;
        window.ue.uewebbrowser.sendmessage(message);
        showToast(`window.ue.uewebbrowser.sendmessage(${message})`);
    } catch (e) {
        showToast(e.message);
    } finally {
        // reset message input
        messageInput.value = "";
    }
});

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");
}

toastDismiss.addEventListener("click", () => {
    toast.classList.remove("show");
});