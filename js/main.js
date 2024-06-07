import { setupScene } from '../modules/sceneSetup.js';
import { setupControls } from '../modules/controls.js';
import { loadIFCFile } from '../modules/ifcLoader.js';
import { setupSelection } from '../modules/selection.js';
import { setupPropertiesPanel } from '../modules/properties.js';

const { scene, camera, renderer } = setupScene();
setupControls(camera, renderer);
setupSelection(scene, camera);
setupPropertiesPanel();

const fileInput = document.getElementById('file-input');
fileInput.addEventListener('change', async (event) => {
    await loadIFCFile(event, scene, camera);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
