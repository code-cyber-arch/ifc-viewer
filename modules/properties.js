export function setupPropertiesPanel() {
    const propertyPanel = document.getElementById('property-panel');
    const propertiesPanel = document.getElementById('properties');
}

export function displayProperties(properties) {
    const propertiesPanel = document.getElementById('properties');
    propertiesPanel.innerHTML = '';
    for (const key in properties) {
        if (properties.hasOwnProperty(key)) {
            const li = document.createElement('li');
            li.textContent = `${key}: ${properties[key]}`;
            propertiesPanel.appendChild(li);
        }
    }
}
