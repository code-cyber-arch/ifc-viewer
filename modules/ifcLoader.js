import { IFCLoader } from 'web-ifc-viewer';

const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setWasmPath('https://unpkg.com/web-ifc-viewer@latest/dist/');

export async function loadIFCFile(event, scene, camera) {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const model = await ifcLoader.loadAsync(url);
        scene.add(model);
        camera.position.z = 5;
    }
}
