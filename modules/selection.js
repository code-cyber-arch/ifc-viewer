import { displayProperties } from './properties.js';
import { IFCLoader } from 'web-ifc-viewer';

const ifcLoader = new IFCLoader();

export function setupSelection(scene, camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }, false);

    window.addEventListener('click', async (event) => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            const intersect = intersects[0];
            const properties = await ifcLoader.ifcManager.getItemProperties(0, intersect.object.modelID, true);
            displayProperties(properties);
        }
    }, false);
}
