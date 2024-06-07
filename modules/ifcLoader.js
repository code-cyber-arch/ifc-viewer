// import { IFCLoader } from 'web-ifc-viewer';

// const ifcLoader = new IFCLoader();
// ifcLoader.ifcManager.setWasmPath('https://unpkg.com/web-ifc-viewer@latest/dist/');

// export async function loadIFCFile(event, scene, camera) {
//     const file = event.target.files[0];
//     if (file) {
//         const url = URL.createObjectURL(file);
//         const model = await ifcLoader.loadAsync(url);
//         scene.add(model);
//         camera.position.z = 5;
//     }
// }


import { IFCLoader } from 'web-ifc-viewer';

const fileInput = document.getElementById('file-input');
const scene = new THREE.Scene();  // Assume you've already created a scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Assuming setupControls and other initializations are done elsewhere
fileInput.addEventListener('change', function(event) {
    loadIFCFile(event, scene);
});

async function loadIFCFile(event, scene) {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        const ifcLoader = new IFCLoader();
        ifcLoader.ifcManager.setWasmPath('https://unpkg.com/web-ifc-viewer@latest/dist/');
        try {
            const model = await ifcLoader.loadAsync(url);
            scene.add(model);
            // Adjust the camera and controls as needed
            camera.position.set(0, 5, 15); // Set a reasonable starting position
            camera.lookAt(new THREE.Vector3());
        } catch (error) {
            console.error('Error loading IFC:', error);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
