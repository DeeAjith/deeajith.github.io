console.clear();
var renderer,
    scene, mesh,
    camera,
    myCanvas = document.getElementById('myCanvas');
init();
animate();

function init() {

    //CAMERA
    camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 1000);
    var controls = new THREE.OrbitControls(camera);
    // //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 3.5, 0);
    controls.update();
    //SCENE
    scene = new THREE.Scene();

    //LIGHTS

    var skyColor = 0xB1E1FF; // light blue
    var groundColor = 0xB97A20; // brownish orange
    var intensity = 1;
    var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);


    var color = 0xFFFFFF;
    var intensity = 1;
    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);

    var mss = (window.innerWidth / window.innerHeight) * .5;
    console.log(mss);
    var loader = new THREE.GLTFLoader();
    loader.load('/dis.gltf', handle_load);

    function handle_load(gltf) {
        console.log(gltf);
        mesh = gltf.scene;
        console.log(mesh.children[0]);
        mesh.children[0].material = new THREE.MeshStandardMaterial({color:0x0000fc});
        scene.add(mesh);
        mesh.position.z = 0;
        mesh.scale.set(mss, mss, mss);

    }
    
    
    // //label
    // var labDIV = document.createElement('div');
    // labDIV.className = 'label';
    // labDIV.textContent = str_on;
    // labDIV.style.marginTop = '-1em';
    // var earthLabel = new THREE.CSS2DObject(labDIV);
    // earthLabel.position.set(0, mss*3, 0);
    // mesh.add(earthLabel);


    //RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialias: true
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput=true;
    document.body.appendChild(renderer.domElement);

    //label renderer
    labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = 0;
    document.body.appendChild(labelRenderer.domElement);

    //windows resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

}





function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}