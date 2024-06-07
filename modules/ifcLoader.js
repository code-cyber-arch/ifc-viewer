import { IFCLoader } from 'web-ifc-viewer';

const fileInput = document.getElementById('file-input');
const loadButton = document.getElementById('load-button');
const scene = new THREE.Scene();  // Assume you've already created a scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const loadButton = document.getElementById('load-button');

    // Event listener for file selection
    fileInput.addEventListener('change', function(event) {
        if (event.target.files.length > 0) {
            console.log("File selected: ", event.target.files[0].name); // Debug: log selected file name
            loadButton.disabled = false;  // Enable the load button
        }
    });

    // Event listener for the load button click
    loadButton.addEventListener('click', function() {
        if (fileInput.files[0]) {  // Check if there is a file selected
            loadIFCFile(fileInput.files[0]);
        } else {
            console.error("No file selected.");
        }
    });

    async function loadIFCFile(file) {
        const url = URL.createObjectURL(file);
        const ifcLoader = new IFCLoader();
        ifcLoader.ifcManager.setWasmPath('https://unpkg.com/web-ifc-viewer@latest/dist/');
        try {
            const model = await ifcLoader.loadAsync(url);
            // Assuming your scene setup code is correct
            scene.add(model);
            camera.position.set(0, 5, 15); // Update camera position
            camera.lookAt(new THREE.Vector3());
            console.log("Model loaded successfully!");
        } catch (error) {
            console.error('Error loading IFC:', error);
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
});

// let selectedFile = null; // To store the selected file

// fileInput.addEventListener('change', function(event) {
//     selectedFile = event.target.files[0]; // Store the file
//     loadButton.disabled = !selectedFile;  // Enable button if a file is selected
// });

// loadButton.addEventListener('click', function() {
//     if (selectedFile) {
//         loadIFCFile(selectedFile, scene);
//     }
// });

// async function loadIFCFile(file, scene) {
//     const url = URL.createObjectURL(file);
//     const ifcLoader = new IFCLoader();
//     ifcLoader.ifcManager.setWasmPath('https://unpkg.com/web-ifc-viewer@latest/dist/');
//     try {
//         const model = await ifcLoader.loadAsync(url);
//         scene.add(model);
//         // Adjust the camera and controls as needed
//         camera.position.set(0, 5, 15); // Set a reasonable starting position
//         camera.lookAt(new THREE.Vector3());
//     } catch (error) {
//         console.error('Error loading IFC:', error);
//     }
// }

// function animate() {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
// }

// animate();
