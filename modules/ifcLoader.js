import { IFCLoader } from 'web-ifc-viewer';

const fileInput = document.getElementById('file-input');
const loadButton = document.getElementById('load-button');
const scene = new THREE.Scene();  // Assume you've already created a scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

let selectedFile = null; // To store the selected file

fileInput.addEventListener('change', function(event) {
    selectedFile = event.target.files[0]; // Store the file
    loadButton.disabled = !selectedFile;  // Enable button if a file is selected
});

loadButton.addEventListener('click', function() {
    if (selectedFile) {
        loadIFCFile(selectedFile, scene);
    }
});

async function loadIFCFile(file, scene) {
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

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
