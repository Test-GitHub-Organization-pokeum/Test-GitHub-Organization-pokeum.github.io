// Button references
const btnExecute = document.getElementById("btnExecute");
const btnGetWebToken = document.getElementById("btnGetWebToken");
const btnGetJSONSchemaVersion = document.getElementById("btnGetJSONSchemaVersion");

// Input references
const nativeNameInput = document.getElementById("nativeName");
const typeInput = document.getElementById("typeInput");
const parameterInput = document.getElementById("parameterInput");

// Helper: Get the AirbridgeNative object
function getNativeObject() {
    const name = nativeNameInput.value.trim();
    if (!name) {
        customAlert("Please enter the object name.");
        return null;
    }

    const obj = window[name];
    if (!obj) {
        customAlert(`Could not find object "${name}".`);
        return null;
    }
    return obj;
}

// Execute button click
btnExecute.addEventListener("click", function () {
    const type = typeInput.value.trim();
    const parameterText = parameterInput.value.trim();

    if (!type) {
        customAlert("Please enter a type.");
        return;
    }

    let parameter = {};
    if (parameterText) {
        try {
            parameter = JSON.parse(parameterText);
        } catch (e) {
            customAlert("Invalid JSON in parameter: " + e.message);
            return;
        }
    }

    const obj = getNativeObject();
    if (!obj) return;

    const payload = {
        type: type,
        parameter: parameter
    };

    console.log("Executing:", payload);
    obj.execute(JSON.stringify(payload));
    customAlert("Command sent:\n" + JSON.stringify(payload, null, 2));
});

// getWebToken()
btnGetWebToken.addEventListener("click", function () {
    const obj = getNativeObject();
    if (!obj) return;
    const token = obj.getWebToken();
    customAlert("getWebToken(): " + token);
});

// getJSONSchemaVersion()
btnGetJSONSchemaVersion.addEventListener("click", function () {
    const obj = getNativeObject();
    if (!obj) return;
    const version = obj.getJSONSchemaVersion();
    customAlert("getJSONSchemaVersion(): " + version);
});