const input = document.getElementById("urlInput");
const errorText = document.getElementById("errorText");
const anchorContainer = document.getElementById("anchorContainer");
const toast = document.getElementById("toast");
const urlText = document.getElementById("urlText");

function updateDisplaysOnInvalid(fullUrl, message) {
    urlText.textContent = fullUrl || "uewebbrowser://";
    anchorContainer.textContent = message || "Invalid URL. No link created.";
}

function buildUrl() {
    const raw = input.value.trim();
    const fullUrl = "uewebbrowser://" + raw;
    urlText.textContent = fullUrl;

    if (!raw) {
        errorText.textContent = "The remaining path cannot be empty.";
        errorText.style.display = "block";
        anchorContainer.textContent = "No link created.";
        return null;
    }

    if (/\s/.test(raw)) {
        errorText.textContent = "Invalid URI format (no spaces allowed).";
        errorText.style.display = "block";
        updateDisplaysOnInvalid(fullUrl, "Invalid URI. No link created.");
        return null;
    }

    try {
        new URL(fullUrl);
    } catch (e) {
        errorText.textContent = "Invalid URI format.";
        errorText.style.display = "block";
        updateDisplaysOnInvalid(fullUrl, "Invalid URI. No link created.");
        return null;
    }

    errorText.style.display = "none";
    return fullUrl;
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 1600);
}

function createAnchor(url) {
    const a = document.createElement("a");
    a.href = url;
    a.textContent = "Open uewebbrowser link";

    anchorContainer.innerHTML = "";
    anchorContainer.appendChild(a);
    urlText.textContent = url;
    showToast("Anchor created.");
}

function executeLocation(url) {
    try {
        window.location.href = url;
        urlText.textContent = url;
        anchorContainer.textContent = "window.location.href executed. (No anchor created)";
        showToast("window.location.href executed.");
    } catch (e) {
        updateDisplaysOnInvalid(url, "Error occurred. No link created.");
        showToast("Error occurred during execution.");
    }
}

document.getElementById("makeAnchorBtn").addEventListener("click", () => {
    const url = buildUrl();
    if (!url) return;
    createAnchor(url);
});

document.getElementById("makeLocationBtn").addEventListener("click", () => {
    const url = buildUrl();
    if (!url) return;
    executeLocation(url);
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const url = buildUrl();
        if (!url) return;
        createAnchor(url);
    }
});