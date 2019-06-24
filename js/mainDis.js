"use strict";
var renderer, renderer2,
    scene, scene2, bog, element, intersects,point,camera,
    myCanvas = document.getElementById("myCanvas");
var frameip,oilip,supto,wheelaxleip,brakelever,bearing,airbrake;
var divFrame;
var SHADOW_MAP_WIDTH = 2048,
    SHADOW_MAP_HEIGHT = 2048;

{

    //RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialias: true,
    });
    //renderer 1
    renderer.info.reset();
    renderer.setClearColor(0x4a4a4a);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; //Shadow
    renderer.shadowMapSoft = true; // Shadow
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2;
    renderer.physicallyCorrectLights = true;
    document.body.appendChild(renderer.domElement);

    //CSS3D Renderer
    //renderer 2
    renderer2 = new THREE.CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild(renderer2.domElement);
    //CAMERA
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    var controls = new THREE.OrbitControls(camera);
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.LEFT,
        MIDDLE: THREE.MOUSE.MIDDLE,
        RIGHT: THREE.MOUSE.RIGHT
    }
    controls.enableRotate = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.autoRotateSpeed = 0.5;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.05;
    controls.maxPolarAngle = Math.PI / 2.2;
    camera.position.set(0, 4, 0);

    var raycaster = new THREE.Raycaster(); // Needed for object intersection
    var mouse = new THREE.Vector3(); //Needed for mouse coordinates
    //SCENE
    scene = new THREE.Scene();
    // //cubemap
    // var path = 'hdr/';
    // var format = '.jpg';
    // var urls = [
    //     path + 'posx' + format, path + 'negx' + format,
    //     path + 'posy' + format, path + 'negy' + format,
    //     path + 'posz' + format, path + 'negz' + format
    // ];
    // var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    // reflectionCube.format = THREE.RGBAFormat;

    // scene.background = reflectionCube;
    // scene.background = 0x5a5a5a;
    //Scene2
    scene2 = new THREE.Scene();
    //LIGHTS
    var skyColor = 0xB1E1FF; // light blue
    var groundColor = 0xB97A20; // brownish orange
    var intensity = 1;
    var light1 = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light1);
    var color = 0x4a4a4a;
    var intensity = 2;
    var light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(5, 10, 2);
    light2.shadow.mapSize.width = 2048; // default
    light2.shadow.mapSize.height = 2048; // default
    light2.shadow.camera.near = 0.5; // default
    light2.shadow.camera.far = 500 // default
    light2.castShadow = true;
    light2.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000));
    light2.shadow.bias = -0.0001;
    light2.shadow.mapSize.width = SHADOW_MAP_WIDTH;
    light2.shadow.mapSize.height = SHADOW_MAP_HEIGHT;
    scene.add(light2);

    var loader = new THREE.RGBELoader();
    loader.load('hdr/hdri.hdr', function (texture) {
        texture.encoding = THREE.RGBEEncoding;
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        texture.flipY = true;
        var cubeGenerator = new THREE.EquirectangularToCubeGenerator(texture, {
            resolution: 1024
        });
        cubeGenerator.update(renderer);
        var pmremGenerator = new THREE.PMREMGenerator(cubeGenerator.renderTarget.texture);
        pmremGenerator.update(renderer);
        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);
        var envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
        // model
        var loader = new THREE.GLTFLoader();
        loader.load('dis/frame.gltf', function (gltf) {
           frameip = gltf.scene;
           frameip.traverse(function (child) {
                if (child.isMesh) {
                    // child.material.envMap = envMap;
                    child.castShadow = true;
                }
            });

            scene.add(frameip);
        });
        loader.load('dis/wheel.gltf', function (gltf) {
            wheelaxleip = gltf.scene;
            wheelaxleip.traverse(function (child) {
                 if (child.isMesh) {
                     child.material.envMap = envMap;
                     child.castShadow = true;
                 }
             });
 
             scene.add(wheelaxleip);
         });
         loader.load('dis/bolster.gltf', function (gltf) {
            supto = gltf.scene;
            supto.traverse(function (child) {
                 if (child.isMesh) {
                     child.material.envMap = envMap;
                     child.castShadow = true;
                 }
             });
 
             scene.add(supto);
         });
         loader.load('dis/brakelever.gltf', function (gltf) {
            brakelever = gltf.scene;
            brakelever.traverse(function (child) {
                 if (child.isMesh) {
                     child.material.envMap = envMap;
                     child.castShadow = true;
                 }
             });
 
             scene.add(brakelever);
         });
         loader.load('dis/oil.gltf', function (gltf) {
            oilip = gltf.scene;
            oilip.traverse(function (child) {
                 if (child.isMesh) {
                     child.material.envMap = envMap;
                     child.castShadow = true;
                 }
             });
 
             scene.add(oilip);
         });
         loader.load('dis/bearing.gltf', function (gltf) {
            bearing = gltf.scene;
            bearing.traverse(function (child) {
                 if (child.isMesh) {
                     child.material.envMap = envMap;
                     child.castShadow = true;
                 }
             });
 
             scene.add(bearing);
         });
         loader.load('dis/airbrake.gltf', function (gltf) {
            airbrake = gltf.scene;
            airbrake.traverse(function (child) {
                 if (child.isMesh) {
                     child.material.envMap = envMap;
                     child.castShadow = true;
                 }
             });
 
             scene.add(airbrake);
         });
        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();
        scene.background = cubeGenerator.renderTarget;

    });

    
    
    var geom = new THREE.PlaneGeometry(2000, 2000, .01);
    var mat = new THREE.ShadowMaterial({
        // color: 0x4a4a4a,
        side: THREE.DoubleSide
    });
    var shadowPlane = new THREE.Mesh(geom, mat);
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);
    shadowPlane.rotateX(-Math.PI / 2);
    
    
    //RayCaster
    // Onclick on bogie to add label
    document.addEventListener('click', onClickadd, true);
    //remove
    document.addEventListener('mouseup', onClickrem, true);
    
    //resize window event
    window.addEventListener('resize', onWindowResize, false);
}

render();
animate();


function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
}

// var frameip,oilip,supto,wheelaxleip,brakelever,bearing,airbrake;
function onClickadd(event) {
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObject(frameip, true);
    
    //here comes event
    if (intersects.length > 0) {
        //controls
        controls.enableRotate=true;
        controls.enableZoom = true;
        controls.enablePan = true;
        frameip.position.set(2.8,1.2,1);
       
        // camera.rotation.set(0,0,0);
        scene.remove(oilip,supto,wheelaxleip,brakelever,bearing,airbrake);
        element = document.createElement('iframe');
        element.setAttribute("src", "/asse-info.html");
        // element.innerHTML = '';
        element.className = 'three-div';
        //CSS Object
        divFrame = new THREE.CSS3DObject(element);
        divFrame.rotation.x=Math.PI/-2;//-90deg;
        divFrame.position.set(-1,1.5,0);
        divFrame.scale.x = .009;
        divFrame.scale.y = .008;
        console.log(camera);
        scene2.add(divFrame);
        rotateAnimate().duration=0.5;
    }
    
}
function onClickrem(event) {
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObject(frameip, true);
    if (intersects.length > 0) {
        //here comes event
        controls.enableRotate=false;
        controls.enableZoom = false;
        controls.enablePan = false;
        frameip.position.set(0,0,0);
        scene2.remove(divFrame);//removing div tag
        scene.add(oilip,supto,wheelaxleip,brakelever,bearing,airbrake);
        camera.rotation.set(0,0,0);
        camera.position.set(0,4,0);
    }
}

function render() {
    renderer.render(scene, camera);
}
console.log(controls);
function rotateAnimate(){
    requestAnimationFrame(rotateAnimate);
    frameip.rotation.y+=.005;
    frameip.rotation.x+=.005;
    frameip.rotation.z+=.005;
    renderer.render(scene, camera);
}
function animate() {
    // console.log("Mouse-X:"+mouse.x+"Mouse-Y:"+mouse.y);
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    // console.log(camera);
    renderer2.render(scene2, camera);
}